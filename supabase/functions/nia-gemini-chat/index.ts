import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Crisis keywords for safety monitoring
const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'want to die', 'end it all', 'self harm', 'hurt myself',
  'no point living', 'better off dead', 'cant go on', 'hopeless', 'worthless'
];

const DISTRESS_KEYWORDS = [
  'depressed', 'anxious', 'panic', 'overwhelming', 'cant cope', 'breaking down',
  'falling apart', 'desperate', 'scared', 'alone', 'lost'
];

function analyzeSafetyLevel(message: string): { level: number; keywords: string[] } {
  const lowerMessage = message.toLowerCase();
  const foundCrisisWords = CRISIS_KEYWORDS.filter(word => lowerMessage.includes(word));
  const foundDistressWords = DISTRESS_KEYWORDS.filter(word => lowerMessage.includes(word));
  
  if (foundCrisisWords.length > 0) {
    return { level: 3, keywords: foundCrisisWords }; // Crisis
  } else if (foundDistressWords.length > 0) {
    return { level: 2, keywords: foundDistressWords }; // Moderate distress
  } else {
    return { level: 1, keywords: [] }; // Normal
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();
    
    if (!message) {
      throw new Error('Message is required');
    }

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    // Analyze safety level
    const safetyAnalysis = analyzeSafetyLevel(message);
    
    // Prepare conversation context for Gemini
    const systemPrompt = `You are Nia, a compassionate AI wellness companion and therapeutic assistant. Your role is to:

1. Provide empathetic, supportive responses to users' mental health concerns
2. Use evidence-based therapeutic techniques (CBT, mindfulness, etc.)
3. Encourage healthy coping strategies and self-care
4. Be warm, understanding, and non-judgmental
5. Keep responses concise but meaningful (1-3 sentences typically)
6. If users express severe distress or crisis, acknowledge their pain and gently suggest professional help

Guidelines:
- Always validate emotions before offering suggestions
- Use "I" statements to show empathy ("I can hear that you're struggling")
- Ask follow-up questions to understand better
- Suggest practical coping techniques when appropriate
- Never diagnose or replace professional therapy
- Be hopeful but realistic

Current safety level: ${safetyAnalysis.level === 3 ? 'CRISIS - immediate support needed' : 
                     safetyAnalysis.level === 2 ? 'DISTRESSED - needs extra care' : 'NORMAL'}`;

    // Build conversation for Gemini
    const messages = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }]
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })),
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages.slice(1), // Remove system prompt from actual API call
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini response:', data);

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    // Return response with safety analysis
    return new Response(JSON.stringify({
      message: aiResponse,
      safety: {
        level: safetyAnalysis.level,
        keywords: safetyAnalysis.keywords,
        needsAttention: safetyAnalysis.level >= 2
      },
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in nia-gemini-chat function:', error);
    
    // Fallback response for errors
    const fallbackResponse = "I'm having trouble connecting right now, but I want you to know that I'm here for you. If you're in crisis, please reach out to a mental health professional or crisis helpline immediately.";
    
    return new Response(JSON.stringify({
      message: fallbackResponse,
      safety: { level: 1, keywords: [], needsAttention: false },
      error: true,
      timestamp: new Date().toISOString()
    }), {
      status: 200, // Return 200 so frontend gets the fallback message
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});