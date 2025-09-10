import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    console.log(`Processing badge awards for user: ${user_id}`)

    // Get all badges and criteria
    const { data: badges, error: badgesError } = await supabaseClient
      .from('badges')
      .select('*')

    if (badgesError) {
      console.error('Error fetching badges:', badgesError)
      throw badgesError
    }

    // Get user's current badges
    const { data: userBadges, error: userBadgesError } = await supabaseClient
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', user_id)

    if (userBadgesError) {
      console.error('Error fetching user badges:', userBadgesError)
      throw userBadgesError
    }

    const earnedBadgeIds = new Set(userBadges?.map(ub => ub.badge_id) || [])

    // Get user stats and recent data
    const { data: userStats, error: statsError } = await supabaseClient
      .from('user_stats')
      .select('*')
      .eq('user_id', user_id)
      .single()

    if (statsError && statsError.code !== 'PGRST116') {
      console.error('Error fetching user stats:', statsError)
      throw statsError
    }

    // Get mood entries count
    const { count: totalEntries, error: entriesError } = await supabaseClient
      .from('mood_entries')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user_id)

    if (entriesError) {
      console.error('Error counting mood entries:', entriesError)
      throw entriesError
    }

    // Get sleep data for sleep guardian badge
    const { data: sleepData, error: sleepError } = await supabaseClient
      .from('mood_entries')
      .select('hours_slept, date')
      .eq('user_id', user_id)
      .gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .not('hours_slept', 'is', null)
      .order('date', { ascending: false })

    if (sleepError) {
      console.error('Error fetching sleep data:', sleepError)
      throw sleepError
    }

    // Get stress data for stress tamer badge
    const { data: stressData, error: stressDataError } = await supabaseClient
      .from('mood_entries')
      .select('stress_level, date')
      .eq('user_id', user_id)
      .gte('date', new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .not('stress_level', 'is', null)
      .order('date', { ascending: false })

    if (stressDataError) {
      console.error('Error fetching stress data:', stressDataError)
      throw stressDataError
    }

    const newBadges = []

    // Check each badge criteria
    for (const badge of badges) {
      if (earnedBadgeIds.has(badge.id)) {
        continue // Already earned
      }

      const criteria = badge.criteria_json
      let shouldAward = false

      switch (criteria.type) {
        case 'first_entry':
          shouldAward = (totalEntries || 0) >= 1
          break

        case 'streak':
          shouldAward = (userStats?.current_streak || 0) >= criteria.days
          break

        case 'sleep_average':
          const goodSleepDays = sleepData?.filter(entry => 
            entry.hours_slept >= criteria.hours
          ).length || 0
          shouldAward = goodSleepDays >= criteria.days
          break

        case 'stress_average':
          const lowStressDays = stressData?.filter(entry => 
            entry.stress_level <= criteria.max_level
          ).length || 0
          shouldAward = lowStressDays >= criteria.days
          break

        case 'mood_stability':
          // Check for consistent mood over the period
          const { data: moodData } = await supabaseClient
            .from('mood_entries')
            .select('mood, date')
            .eq('user_id', user_id)
            .gte('date', new Date(Date.now() - criteria.days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
            .order('date', { ascending: false })

          if (moodData && moodData.length >= criteria.days) {
            const moodTypes = new Set(moodData.slice(0, criteria.days).map(m => m.mood))
            shouldAward = moodTypes.size <= 2 // Relatively stable mood
          }
          break

        case 'voice_usage':
          // This would need to be tracked separately in a voice_sessions table
          // For now, we'll skip this badge
          break
      }

      if (shouldAward) {
        console.log(`Awarding badge: ${badge.name} to user: ${user_id}`)
        newBadges.push({
          user_id,
          badge_id: badge.id,
          earned_at: new Date().toISOString()
        })
      }
    }

    // Award new badges
    if (newBadges.length > 0) {
      const { error: insertError } = await supabaseClient
        .from('user_badges')
        .insert(newBadges)

      if (insertError) {
        console.error('Error inserting new badges:', insertError)
        throw insertError
      }

      console.log(`Awarded ${newBadges.length} new badges to user ${user_id}`)
    }

    return new Response(
      JSON.stringify({
        success: true,
        badges_awarded: newBadges.length,
        new_badges: newBadges
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in award-badges function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})