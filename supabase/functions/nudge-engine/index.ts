import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface NudgeTemplate {
  type: 'micro_checkin' | 'suggestion' | 'celebration';
  message: string;
  severity: 'low' | 'normal' | 'high';
  metadata?: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { user_id } = await req.json()
    
    if (!user_id) {
      return new Response(
        JSON.stringify({ error: 'user_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Processing nudges for user: ${user_id}`)

    // Get user's recent data
    const today = new Date().toISOString().split('T')[0]
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    // Check if user logged mood today
    const { data: todayEntry } = await supabaseClient
      .from('mood_entries')
      .select('*')
      .eq('user_id', user_id)
      .eq('date', today)
      .single()

    // Get recent entries for trend analysis
    const { data: recentEntries } = await supabaseClient
      .from('mood_entries')
      .select('*')
      .eq('user_id', user_id)
      .gte('date', threeDaysAgo)
      .order('date', { ascending: false })

    // Get user stats
    const { data: userStats } = await supabaseClient
      .from('user_stats')
      .select('*')
      .eq('user_id', user_id)
      .single()

    // Get recent badges
    const { data: recentBadges } = await supabaseClient
      .from('user_badges')
      .select('*, badge:badges(*)')
      .eq('user_id', user_id)
      .gte('earned_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours

    const nudges: NudgeTemplate[] = []
    const currentHour = new Date().getHours()

    // 1. Daily Check-in Nudge (if no entry today and it's evening)
    if (!todayEntry && currentHour >= 18) {
      nudges.push({
        type: 'micro_checkin',
        message: "How are you feeling today? Take a moment for a quick 60-second check-in to reflect on your day.",
        severity: 'normal',
        metadata: { suggestion: "Track your mood, stress level, and sleep quality to maintain your wellness streak." }
      })
    }

    // 2. Sleep Quality Suggestions
    if (recentEntries && recentEntries.length >= 3) {
      const sleepEntries = recentEntries.filter(e => e.hours_slept !== null)
      if (sleepEntries.length >= 2) {
        const avgSleep = sleepEntries.reduce((sum, e) => sum + e.hours_slept, 0) / sleepEntries.length
        const variance = sleepEntries.reduce((sum, e) => sum + Math.pow(e.hours_slept - avgSleep, 2), 0) / sleepEntries.length
        
        if (avgSleep < 6) {
          nudges.push({
            type: 'suggestion',
            message: "Your sleep has been under 6 hours lately. Quality rest is essential for mental wellness.",
            severity: 'high',
            metadata: { suggestion: "Try a 3-minute breathing exercise before bed to help you wind down." }
          })
        } else if (variance > 2) {
          nudges.push({
            type: 'suggestion',
            message: "Your sleep schedule seems irregular. Consistent sleep patterns can improve your mood and energy.",
            severity: 'normal',
            metadata: { suggestion: "Set a regular bedtime routine to stabilize your sleep cycle." }
          })
        }
      }
    }

    // 3. Stress Level Trends
    if (recentEntries && recentEntries.length >= 3) {
      const stressEntries = recentEntries.filter(e => e.stress_level !== null)
      if (stressEntries.length >= 2) {
        const highStressDays = stressEntries.filter(e => e.stress_level >= 4).length
        
        if (highStressDays >= 2) {
          nudges.push({
            type: 'suggestion',
            message: "You've been experiencing elevated stress levels. Let's take a moment to reset and recharge.",
            severity: 'high',
            metadata: { suggestion: "Try a 60-second grounding exercise: name 5 things you can see, 4 you can touch, 3 you can hear." }
          })
        }
      }
    }

    // 4. Positive Reinforcement
    if (recentEntries && recentEntries.length >= 2) {
      const lastEntry = recentEntries[0]
      const previousEntry = recentEntries[1]
      
      if (previousEntry.stress_level >= 4 && lastEntry.stress_level <= 2) {
        nudges.push({
          type: 'celebration',
          message: "Great job managing your stress! You've shown real progress from yesterday to today. 🌟",
          severity: 'normal',
          metadata: { achievement: 'stress_improvement' }
        })
      }
    }

    // 5. Streak Celebration
    if (userStats?.current_streak && [3, 7, 14, 30].includes(userStats.current_streak)) {
      nudges.push({
        type: 'celebration',
        message: `Amazing! You've maintained a ${userStats.current_streak}-day check-in streak. Your commitment to wellness is inspiring! 🔥`,
        severity: 'normal',
        metadata: { streak: userStats.current_streak }
      })
    }

    // 6. New Badge Celebrations
    if (recentBadges && recentBadges.length > 0) {
      for (const userBadge of recentBadges) {
        nudges.push({
          type: 'celebration',
          message: `Congratulations! You've earned the "${userBadge.badge.name}" badge! ${userBadge.badge.icon}`,
          severity: 'normal',
          metadata: { badge: userBadge.badge.key }
        })
      }
    }

    // 7. Motivation for Consistency (if streak broken)
    if (userStats?.current_streak === 0 && userStats?.longest_streak > 0) {
      nudges.push({
        type: 'suggestion',
        message: "Every journey has its ups and downs. You've built a strong streak before - you can do it again!",
        severity: 'low',
        metadata: { suggestion: "Start fresh with today's check-in and rebuild your wellness momentum." }
      })
    }

    // Insert nudges into database
    if (nudges.length > 0) {
      const nudgeRecords = nudges.map(nudge => ({
        user_id,
        type: nudge.type,
        message: nudge.message,
        severity: nudge.severity,
        metadata_json: nudge.metadata || {},
        scheduled_at: new Date().toISOString(),
        status: 'pending'
      }))

      const { error: insertError } = await supabaseClient
        .from('nudges')
        .insert(nudgeRecords)

      if (insertError) {
        console.error('Error inserting nudges:', insertError)
        throw insertError
      }

      console.log(`Created ${nudges.length} nudges for user ${user_id}`)
    }

    return new Response(
      JSON.stringify({
        success: true,
        nudges_created: nudges.length,
        nudges: nudges
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in nudge-engine function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})