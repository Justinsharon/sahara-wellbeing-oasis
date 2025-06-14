
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
    console.log('Received voice analysis request')
    
    const { audioData } = await req.json()
    console.log('Audio data length:', audioData?.length)
    
    if (!audioData) {
      throw new Error('No audio data provided')
    }
    
    // Get Kintsugi API key from secrets
    const kintsugiApiKey = Deno.env.get('KINTSUGI_API_KEY')
    console.log('Kintsugi API key exists:', !!kintsugiApiKey)
    
    if (!kintsugiApiKey) {
      throw new Error('Kintsugi API key not configured in Supabase secrets')
    }

    // Convert base64 audio to blob for Kintsugi API
    console.log('Converting audio data...')
    const audioBlob = Uint8Array.from(atob(audioData), c => c.charCodeAt(0))
    console.log('Audio blob size:', audioBlob.length)
    
    // Create FormData for Kintsugi API
    const formData = new FormData()
    formData.append('audio', new Blob([audioBlob], { type: 'audio/wav' }), 'recording.wav')
    formData.append('duration', '30')
    
    console.log('Calling Kintsugi API...')
    
    // Call Kintsugi API
    const response = await fetch('https://api.kintsugi-platform.com/v1/analyze', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${kintsugiApiKey}`,
      },
      body: formData
    })

    console.log('Kintsugi API response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Kintsugi API error:', response.status, errorText)
      throw new Error(`Kintsugi API error: ${response.status} - ${errorText}`)
    }

    const analysis = await response.json()
    console.log('Kintsugi analysis result:', JSON.stringify(analysis))
    
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
    const confidence = analysis.confidence || 0.5
    
    console.log('Mapped mood:', detectedMood, 'confidence:', confidence)
    
    return new Response(
      JSON.stringify({
        mood: detectedMood,
        confidence: confidence,
        raw_analysis: analysis
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Voice analysis error:', error.message)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Check the console logs for more information'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
