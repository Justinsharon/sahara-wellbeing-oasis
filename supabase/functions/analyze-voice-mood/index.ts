
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { audioData } = await req.json()
    
    // Get Kintsugi API key from secrets
    const kintsugiApiKey = Deno.env.get('KINTSUGI_API_KEY')
    if (!kintsugiApiKey) {
      throw new Error('Kintsugi API key not configured')
    }

    // Convert base64 audio to blob for Kintsugi API
    const audioBlob = Uint8Array.from(atob(audioData), c => c.charCodeAt(0))
    
    // Create FormData for Kintsugi API
    const formData = new FormData()
    formData.append('audio', new Blob([audioBlob], { type: 'audio/wav' }))
    formData.append('duration', '30') // 30 seconds as specified
    
    // Call Kintsugi API
    const response = await fetch('https://api.kintsugi-platform.com/v1/analyze', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${kintsugiApiKey}`,
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Kintsugi API error: ${response.statusText}`)
    }

    const analysis = await response.json()
    
    // Map Kintsugi results to our mood system
    const moodMapping = {
      'joy': 'very_happy',
      'happiness': 'happy',
      'neutral': 'neutral',
      'sadness': 'sad',
      'depression': 'very_sad',
      'anxiety': 'sad',
      'stress': 'neutral'
    }
    
    const detectedMood = moodMapping[analysis.primary_emotion] || 'neutral'
    
    return new Response(
      JSON.stringify({
        mood: detectedMood,
        confidence: analysis.confidence,
        raw_analysis: analysis
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
