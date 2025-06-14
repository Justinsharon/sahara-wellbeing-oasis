
import { AssessmentQuestion } from '@/types/assessment';

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'q1_welcome',
    type: 'multiple_choice',
    question: "How have you been feeling about work and life this week?",
    description: "Let's start with a gentle check-in about your overall mood.",
    options: ['Very good', 'Good', 'Neutral', 'Stressed', 'Very stressed'],
    scoring: {
      emotional: { 'Very good': 0, 'Good': 0, 'Neutral': 1, 'Stressed': 3, 'Very stressed': 3 },
      physical: { 'Very good': 0, 'Good': 0, 'Neutral': 0, 'Stressed': 1, 'Very stressed': 2 },
      work: { 'Very good': 0, 'Good': 0, 'Neutral': 0, 'Stressed': 2, 'Very stressed': 3 },
      lifestyle: { 'Very good': 0, 'Good': 0, 'Neutral': 0, 'Stressed': 1, 'Very stressed': 1 }
    },
    characterResponse: {
      positive: "That's wonderful to hear! Let's explore what's been working well for you.",
      neutral: "I appreciate your honesty. Let's dive deeper into how you've been feeling.",
      concerned: "I can sense this has been challenging. You're not alone, and we'll work through this together."
    }
  },
  {
    id: 'q2_breathing',
    type: 'yes_no',
    question: "Would you like to try a quick breathing exercise to relax?",
    description: "Sometimes a moment of calm can help us reflect more clearly.",
    options: ['Yes', 'No'],
    scoring: {
      emotional: { 'Yes': -1, 'No': 0 },
      physical: { 'Yes': 0, 'No': 0 },
      work: { 'Yes': 0, 'No': 0 },
      lifestyle: { 'Yes': 0, 'No': 0 }
    },
    characterResponse: {
      positive: "Great! Let's take a moment to breathe together.",
      neutral: "No problem at all. We can continue with our conversation.",
      concerned: "That's perfectly fine. We can focus on talking through things instead."
    }
  },
  {
    id: 'q3_breathing_followup',
    type: 'multiple_choice',
    question: "How do you feel now after the breathing exercise?",
    description: "Take a moment to notice any changes in how you're feeling.",
    options: ['Much more relaxed', 'A bit more relaxed', 'About the same', 'More stressed'],
    conditionalLogic: {
      showIf: { questionId: 'q2_breathing', answerValue: 'Yes' }
    },
    scoring: {
      emotional: { 'Much more relaxed': -1, 'A bit more relaxed': -1, 'About the same': 0, 'More stressed': 2 },
      physical: { 'Much more relaxed': 0, 'A bit more relaxed': 0, 'About the same': 0, 'More stressed': 1 },
      work: { 'Much more relaxed': 0, 'A bit more relaxed': 0, 'About the same': 0, 'More stressed': 0 },
      lifestyle: { 'Much more relaxed': 0, 'A bit more relaxed': 0, 'About the same': 0, 'More stressed': 0 }
    },
    characterResponse: {
      positive: "I'm so glad that helped! Breathing exercises can be really powerful.",
      neutral: "That's okay! Different techniques work for different people.",
      concerned: "No worries - sometimes when we're very stressed, it takes time to feel the benefits."
    }
  },
  {
    id: 'q4_overall_mood',
    type: 'multiple_choice',
    question: "How would you describe your overall mood or stress level at work these days?",
    options: ['Very calm/positive', 'Mostly okay', 'A bit stressed', 'Very stressed'],
    scoring: {
      emotional: { 'Very calm/positive': 0, 'Mostly okay': 1, 'A bit stressed': 2, 'Very stressed': 3 },
      physical: { 'Very calm/positive': 0, 'Mostly okay': 0, 'A bit stressed': 1, 'Very stressed': 2 },
      work: { 'Very calm/positive': 0, 'Mostly okay': 0, 'A bit stressed': 1, 'Very stressed': 2 },
      lifestyle: { 'Very calm/positive': 0, 'Mostly okay': 0, 'A bit stressed': 0, 'Very stressed': 1 }
    },
    characterResponse: {
      positive: "It sounds like you've found a good balance at work!",
      neutral: "Work can definitely have its ups and downs.",
      concerned: "Work stress can really take a toll. Let's explore what might be contributing to this."
    }
  },
  {
    id: 'q5_work_stressors',
    type: 'open_ended',
    question: "What specifically at work has been causing you stress?",
    description: "Feel free to share as much or as little as you'd like.",
    scoring: {
      emotional: {},
      physical: {},
      work: {},
      lifestyle: {}
    },
    characterResponse: {
      positive: "Thank you for sharing that with me.",
      neutral: "I understand. Work challenges can be complex.",
      concerned: "That sounds really difficult to deal with."
    }
  },
  {
    id: 'q6_stress_scale',
    type: 'scale',
    question: "On a scale of 1 to 10, how stressed do you feel right now?",
    description: "1 being not at all stressed, 10 being extremely stressed.",
    scaleMin: 1,
    scaleMax: 10,
    scoring: {
      emotional: { '1': 0, '2': 0, '3': 0, '4': 1, '5': 1, '6': 2, '7': 2, '8': 3, '9': 3, '10': 3 },
      physical: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 1, '6': 1, '7': 2, '8': 2, '9': 3, '10': 3 },
      work: { '1': 0, '2': 0, '3': 0, '4': 1, '5': 1, '6': 2, '7': 2, '8': 3, '9': 3, '10': 3 },
      lifestyle: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 1, '7': 1, '8': 2, '9': 2, '10': 2 }
    },
    characterResponse: {
      positive: "That's a manageable level. You're doing well!",
      neutral: "I can see you're feeling some pressure.",
      concerned: "That's a high stress level. Thank you for being honest with me about how you're feeling."
    }
  },
  {
    id: 'q7_stress_triggers',
    type: 'open_ended',
    question: "What typically makes that stress level go up or down during your day?",
    scoring: {
      emotional: {},
      physical: {},
      work: {},
      lifestyle: {}
    },
    characterResponse: {
      positive: "Understanding your triggers is really insightful.",
      neutral: "Those patterns can tell us a lot about what affects you.",
      concerned: "Recognizing these patterns is the first step to managing them better."
    }
  },
  {
    id: 'q8_end_of_day',
    type: 'multiple_choice',
    question: "How do you feel at the end of your workday?",
    options: ['Energized', 'Neutral', 'Exhausted'],
    scoring: {
      emotional: { 'Energized': 0, 'Neutral': 1, 'Exhausted': 1 },
      physical: { 'Energized': 0, 'Neutral': 1, 'Exhausted': 3 },
      work: { 'Energized': 0, 'Neutral': 0, 'Exhausted': 1 },
      lifestyle: { 'Energized': 0, 'Neutral': 0, 'Exhausted': 1 }
    },
    characterResponse: {
      positive: "That's wonderful! Having energy after work is such a gift.",
      neutral: "Ending the day feeling exhausted can be really draining.",
      concerned: "That exhaustion sounds overwhelming. Let's explore what might be contributing to this."
    }
  },
  {
    id: 'q9_exhaustion_frequency',
    type: 'yes_no',
    question: "Do you often feel this way (exhausted or detached)?",
    options: ['Yes', 'No'],
    conditionalLogic: {
      showIf: { questionId: 'q8_end_of_day', answerValue: 'Exhausted' }
    },
    scoring: {
      emotional: { 'Yes': 2, 'No': 0 },
      physical: { 'Yes': 1, 'No': 0 },
      work: { 'Yes': 1, 'No': 0 },
      lifestyle: { 'Yes': 1, 'No': 0 }
    },
    characterResponse: {
      positive: "I'm glad this isn't a constant feeling for you.",
      neutral: "Occasional exhaustion is normal, but let's keep an eye on it.",
      concerned: "Frequent exhaustion can really impact your well-being. You deserve to feel energized."
    }
  },
  {
    id: 'q10_work_impact',
    type: 'yes_no',
    question: "Has this exhaustion affected how you work or interact with colleagues?",
    options: ['Yes', 'No'],
    conditionalLogic: {
      showIf: { questionId: 'q8_end_of_day', answerValue: 'Exhausted' }
    },
    scoring: {
      emotional: { 'Yes': 1, 'No': 0 },
      physical: { 'Yes': 0, 'No': 0 },
      work: { 'Yes': 2, 'No': 0 },
      lifestyle: { 'Yes': 1, 'No': 0 }
    },
    characterResponse: {
      positive: "It's good that your work relationships aren't being affected.",
      neutral: "It sounds like the exhaustion is starting to impact other areas.",
      concerned: "When exhaustion affects our relationships and work, it's definitely worth addressing."
    }
  },
  {
    id: 'q11_anxiety',
    type: 'yes_no',
    question: "Do you find yourself feeling anxious or worrying even when there's no immediate problem?",
    options: ['Yes', 'No'],
    scoring: {
      emotional: { 'Yes': 3, 'No': 0 },
      physical: { 'Yes': 1, 'No': 0 },
      work: { 'Yes': 1, 'No': 0 },
      lifestyle: { 'Yes': 1, 'No': 0 }
    },
    characterResponse: {
      positive: "I'm glad anxiety isn't something you're struggling with right now.",
      neutral: "Anxiety can be challenging to deal with.",
      concerned: "That kind of persistent worry can be exhausting. You're not alone in feeling this way."
    }
  },
  {
    id: 'q12_past_anxiety',
    type: 'yes_no',
    question: "Have you felt like this before, maybe during a big project or stressful period?",
    options: ['Yes', 'No'],
    conditionalLogic: {
      showIf: { questionId: 'q11_anxiety', answerValue: 'Yes' }
    },
    scoring: {
      emotional: { 'Yes': 1, 'No': 0 },
      physical: { 'Yes': 0, 'No': 0 },
      work: { 'Yes': 0, 'No': 0 },
      lifestyle: { 'Yes': 0, 'No': 0 }
    },
    characterResponse: {
      positive: "It's helpful to recognize these patterns from past experiences.",
      neutral: "Understanding when anxiety tends to show up can be really useful.",
      concerned: "Recognizing these patterns is important for managing anxiety better."
    }
  },
  {
    id: 'q13_anxiety_thoughts',
    type: 'open_ended',
    question: "What thoughts typically run through your mind when you feel anxious?",
    conditionalLogic: {
      showIf: { questionId: 'q11_anxiety', answerValue: 'Yes' }
    },
    scoring: {
      emotional: {},
      physical: {},
      work: {},
      lifestyle: {}
    },
    characterResponse: {
      positive: "Thank you for sharing those thoughts with me.",
      neutral: "Those kinds of thoughts are very common with anxiety.",
      concerned: "Those anxious thoughts can feel so overwhelming. I appreciate you sharing them."
    }
  },
  {
    id: 'q14_physical_anxiety',
    type: 'yes_no',
    question: "Do you experience any physical symptoms when you worry? (like fast heartbeat, sweating, tension)",
    options: ['Yes', 'No'],
    conditionalLogic: {
      showIf: { questionId: 'q11_anxiety', answerValue: 'Yes' }
    },
    scoring: {
      emotional: { 'Yes': 1, 'No': 0 },
      physical: { 'Yes': 2, 'No': 0 },
      work: { 'Yes': 0, 'No': 0 },
      lifestyle: { 'Yes': 0, 'No': 0 }
    },
    characterResponse: {
      positive: "It's good that anxiety isn't affecting you physically.",
      neutral: "Physical symptoms of anxiety are very common.",
      concerned: "Those physical symptoms can make anxiety feel even more intense."
    }
  },
  {
    id: 'q15_past_coping',
    type: 'open_ended',
    question: "When you felt better in the past, what helped you the most?",
    conditionalLogic: {
      showIf: { questionId: 'q12_past_anxiety', answerValue: 'Yes' }
    },
    scoring: {
      emotional: {},
      physical: {},
      work: {},
      lifestyle: {}
    },
    characterResponse: {
      positive: "Those are wonderful coping strategies!",
      neutral: "It's great that you've found things that help.",
      concerned: "Building on what's worked before is a smart approach."
    }
  },
  {
    id: 'q16_sleep_quality',
    type: 'multiple_choice',
    question: "How have you been sleeping lately?",
    options: [
      'Falling asleep easily and sleeping through the night',
      'Some difficulty falling or staying asleep',
      'Often wake up during the night',
      'Hard to fall asleep and don\'t feel rested'
    ],
    scoring: {
      emotional: { 
        'Falling asleep easily and sleeping through the night': 0,
        'Some difficulty falling or staying asleep': 1,
        'Often wake up during the night': 2,
        'Hard to fall asleep and don\'t feel rested': 2
      },
      physical: {
        'Falling asleep easily and sleeping through the night': 0,
        'Some difficulty falling or staying asleep': 2,
        'Often wake up during the night': 3,
        'Hard to fall asleep and don\'t feel rested': 3
      },
      work: {
        'Falling asleep easily and sleeping through the night': 0,
        'Some difficulty falling or staying asleep': 1,
        'Often wake up during the night': 1,
        'Hard to fall asleep and don\'t feel rested': 2
      },
      lifestyle: {
        'Falling asleep easily and sleeping through the night': 0,
        'Some difficulty falling or staying asleep': 1,
        'Often wake up during the night': 1,
        'Hard to fall asleep and don\'t feel rested': 2
      }
    },
    characterResponse: {
      positive: "Good sleep is so important for everything else in life!",
      neutral: "Sleep difficulties can really affect how we feel during the day.",
      concerned: "Poor sleep can make everything else feel more challenging. Let's talk about this more."
    }
  },
  {
    id: 'q17_sleep_duration',
    type: 'multiple_choice',
    question: "How many hours do you usually sleep, and do you feel rested when you wake up?",
    options: [
      '7-9 hours and feel rested',
      '6-7 hours and feel somewhat rested',
      '5-6 hours and feel tired',
      'Less than 5 hours and feel exhausted'
    ],
    scoring: {
      emotional: {
        '7-9 hours and feel rested': 0,
        '6-7 hours and feel somewhat rested': 0,
        '5-6 hours and feel tired': 1,
        'Less than 5 hours and feel exhausted': 1
      },
      physical: {
        '7-9 hours and feel rested': 0,
        '6-7 hours and feel somewhat rested': 1,
        '5-6 hours and feel tired': 2,
        'Less than 5 hours and feel exhausted': 3
      },
      work: {
        '7-9 hours and feel rested': 0,
        '6-7 hours and feel somewhat rested': 0,
        '5-6 hours and feel tired': 1,
        'Less than 5 hours and feel exhausted': 2
      },
      lifestyle: {
        '7-9 hours and feel rested': 0,
        '6-7 hours and feel somewhat rested': 0,
        '5-6 hours and feel tired': 1,
        'Less than 5 hours and feel exhausted': 2
      }
    },
    characterResponse: {
      positive: "That sounds like you're getting quality rest!",
      neutral: "Sleep is so important for how we feel and function.",
      concerned: "Not getting enough quality sleep can really impact everything else in your life."
    }
  },
  {
    id: 'q18_breaks',
    type: 'yes_no',
    question: "During your workday, do you take breaks for lunch or short rests?",
    options: ['Yes', 'No'],
    scoring: {
      emotional: { 'Yes': 0, 'No': 1 },
      physical: { 'Yes': 0, 'No': 1 },
      work: { 'Yes': 0, 'No': 1 },
      lifestyle: { 'Yes': 0, 'No': 2 }
    },
    characterResponse: {
      positive: "Taking breaks is so important for maintaining energy and focus!",
      neutral: "Breaks can really help with productivity and well-being.",
      concerned: "Not taking breaks can lead to burnout. Your well-being matters too."
    }
  },
  {
    id: 'q19_exercise',
    type: 'yes_no',
    question: "Do you do any regular exercise or physical activity?",
    options: ['Yes', 'No'],
    scoring: {
      emotional: { 'Yes': 0, 'No': 1 },
      physical: { 'Yes': 0, 'No': 2 },
      work: { 'Yes': 0, 'No': 0 },
      lifestyle: { 'Yes': 0, 'No': 1 }
    },
    characterResponse: {
      positive: "Physical activity is such a great way to manage stress and stay healthy!",
      neutral: "Exercise can be really beneficial for both physical and mental health.",
      concerned: "Physical activity can be a powerful tool for managing stress and improving mood."
    }
  },
  {
    id: 'q20_hobbies',
    type: 'yes_no',
    question: "Outside of work, do you have hobbies or activities you enjoy?",
    options: ['Yes', 'No'],
    scoring: {
      emotional: { 'Yes': 0, 'No': 1 },
      physical: { 'Yes': 0, 'No': 0 },
      work: { 'Yes': 0, 'No': 1 },
      lifestyle: { 'Yes': 0, 'No': 2 }
    },
    characterResponse: {
      positive: "Having activities you enjoy is so important for a balanced life!",
      neutral: "Hobbies and interests can be great for relaxation and personal fulfillment.",
      concerned: "Finding activities you enjoy outside of work can really help with stress and life balance."
    }
  },
  {
    id: 'q21_social_support',
    type: 'multiple_choice',
    question: "Who do you talk to about work stress?",
    options: ['Friends', 'Family', 'Colleagues', 'No one'],
    scoring: {
      emotional: { 'Friends': 1, 'Family': 1, 'Colleagues': 1, 'No one': 3 },
      physical: { 'Friends': 0, 'Family': 0, 'Colleagues': 0, 'No one': 1 },
      work: { 'Friends': 0, 'Family': 0, 'Colleagues': 0, 'No one': 1 },
      lifestyle: { 'Friends': 0, 'Family': 0, 'Colleagues': 0, 'No one': 2 }
    },
    characterResponse: {
      positive: "Having people to talk to about stress is so valuable!",
      neutral: "Social support can be really helpful for managing stress.",
      concerned: "It can feel isolating to deal with stress alone. You don't have to go through this by yourself."
    }
  },
  {
    id: 'q22_coping_preference',
    type: 'multiple_choice',
    question: "Would you find it easier to write about your feelings or talk to a supportive community?",
    options: ['Write (journaling/art)', 'Talk (community support)', 'Either sounds good', 'Not sure'],
    scoring: {
      emotional: { 'Write (journaling/art)': 0, 'Talk (community support)': 0, 'Either sounds good': 0, 'Not sure': 1 },
      physical: { 'Write (journaling/art)': 0, 'Talk (community support)': 0, 'Either sounds good': 0, 'Not sure': 0 },
      work: { 'Write (journaling/art)': 0, 'Talk (community support)': 0, 'Either sounds good': 0, 'Not sure': 0 },
      lifestyle: { 'Write (journaling/art)': 1, 'Talk (community support)': 0, 'Either sounds good': 0, 'Not sure': 0 }
    },
    characterResponse: {
      positive: "It's great that you have a sense of what might work for you!",
      neutral: "Different approaches work for different people - that's perfectly normal.",
      concerned: "We can explore different options together to find what feels right for you."
    }
  },
  {
    id: 'q23_past_techniques',
    type: 'multiple_choice',
    question: "Have you tried any stress-relief techniques before?",
    options: ['Meditation', 'Yoga', 'Therapy/Counseling', 'Exercise', 'Art/Creative activities', 'None of these'],
    scoring: {
      emotional: { 'Meditation': 0, 'Yoga': 0, 'Therapy/Counseling': 0, 'Exercise': 0, 'Art/Creative activities': 0, 'None of these': 1 },
      physical: { 'Meditation': 0, 'Yoga': 0, 'Therapy/Counseling': 0, 'Exercise': 0, 'Art/Creative activities': 0, 'None of these': 0 },
      work: { 'Meditation': 0, 'Yoga': 0, 'Therapy/Counseling': 0, 'Exercise': 0, 'Art/Creative activities': 0, 'None of these': 0 },
      lifestyle: { 'Meditation': 0, 'Yoga': 0, 'Therapy/Counseling': 0, 'Exercise': 0, 'Art/Creative activities': 0, 'None of these': 1 }
    },
    characterResponse: {
      positive: "It's wonderful that you've explored different ways to manage stress!",
      neutral: "There are so many different techniques available - it's about finding what works for you.",
      concerned: "There are many gentle, effective ways to manage stress that we can explore together."
    }
  },
  {
    id: 'q24_strengths',
    type: 'open_ended',
    question: "What personal strengths help you handle stress?",
    scoring: {
      emotional: {},
      physical: {},
      work: {},
      lifestyle: {}
    },
    characterResponse: {
      positive: "Those are wonderful strengths to have!",
      neutral: "It's important to recognize and build on your existing strengths.",
      concerned: "Everyone has strengths, even when we're going through difficult times."
    }
  },
  {
    id: 'q25_therapy_history',
    type: 'yes_no',
    question: "Have you ever tried therapy, counseling, or similar support before?",
    options: ['Yes', 'No'],
    scoring: {
      emotional: { 'Yes': 0, 'No': 0 },
      physical: { 'Yes': 0, 'No': 0 },
      work: { 'Yes': 0, 'No': 0 },
      lifestyle: { 'Yes': 0, 'No': 1 }
    },
    characterResponse: {
      positive: "Previous therapy experience can be really helpful in knowing what to expect.",
      neutral: "Whether you've tried therapy before or not, this is a new journey we're taking together.",
      concerned: "Therapy can be a wonderful support, whether it's your first time or you're returning to it."
    }
  },
  {
    id: 'q26_goals',
    type: 'multiple_choice',
    question: "What are your main goals for feeling better?",
    options: [
      'Feeling less anxious',
      'Sleeping better',
      'More work-life balance',
      'Better relationships',
      'Managing stress better',
      'All of the above'
    ],
    scoring: {
      emotional: { 
        'Feeling less anxious': 3, 
        'Sleeping better': 1, 
        'More work-life balance': 1, 
        'Better relationships': 2, 
        'Managing stress better': 2,
        'All of the above': 3
      },
      physical: { 
        'Feeling less anxious': 1, 
        'Sleeping better': 3, 
        'More work-life balance': 1, 
        'Better relationships': 0, 
        'Managing stress better': 1,
        'All of the above': 2
      },
      work: { 
        'Feeling less anxious': 1, 
        'Sleeping better': 1, 
        'More work-life balance': 3, 
        'Better relationships': 1, 
        'Managing stress better': 2,
        'All of the above': 2
      },
      lifestyle: { 
        'Feeling less anxious': 1, 
        'Sleeping better': 2, 
        'More work-life balance': 2, 
        'Better relationships': 1, 
        'Managing stress better': 1,
        'All of the above': 2
      }
    },
    characterResponse: {
      positive: "Those are wonderful, achievable goals!",
      neutral: "Having clear goals helps us create a path forward together.",
      concerned: "These goals show real insight into what you need. We can absolutely work toward these together."
    }
  }
];
