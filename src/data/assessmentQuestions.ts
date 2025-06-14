
export interface AssessmentQuestion {
  id: string;
  type: 'multiple_choice' | 'yes_no' | 'scale' | 'open_ended' | 'breathing_exercise';
  question: string;
  options?: string[];
  conditional?: {
    dependsOn: string;
    condition: string | string[];
  };
  scoring: {
    emotional: Record<string, number>;
    physical: Record<string, number>;
    work: Record<string, number>;
    lifestyle: Record<string, number>;
  };
  scaleRange?: { min: number; max: number };
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'q1',
    type: 'multiple_choice',
    question: "How have you been feeling about work and life this week?",
    options: ['Very good', 'Good', 'Neutral', 'Stressed', 'Very stressed'],
    scoring: {
      emotional: { 'Very good': 0, 'Good': 0, 'Neutral': 1, 'Stressed': 3, 'Very stressed': 3 },
      physical: { 'Very good': 0, 'Good': 0, 'Neutral': 0, 'Stressed': 0, 'Very stressed': 0 },
      work: { 'Very good': 0, 'Good': 0, 'Neutral': 0, 'Stressed': 2, 'Very stressed': 3 },
      lifestyle: { 'Very good': 0, 'Good': 0, 'Neutral': 0, 'Stressed': 0, 'Very stressed': 0 }
    }
  },
  {
    id: 'q2',
    type: 'yes_no',
    question: "Would you like to try a quick breathing exercise to relax?",
    options: ['Yes', 'No'],
    scoring: {
      emotional: { 'Yes': -1, 'No': 0 },
      physical: { 'Yes': 0, 'No': 0 },
      work: { 'Yes': 0, 'No': 0 },
      lifestyle: { 'Yes': 0, 'No': 0 }
    }
  },
  {
    id: 'q3',
    type: 'breathing_exercise',
    question: "Let's do three slow breaths together. [After breathing] How do you feel now?",
    options: ['Much more relaxed', 'A bit more relaxed', 'About the same', 'More stressed'],
    conditional: {
      dependsOn: 'q2',
      condition: 'Yes'
    },
    scoring: {
      emotional: { 'Much more relaxed': -1, 'A bit more relaxed': -1, 'About the same': 0, 'More stressed': 2 },
      physical: { 'Much more relaxed': 0, 'A bit more relaxed': 0, 'About the same': 0, 'More stressed': 0 },
      work: { 'Much more relaxed': 0, 'A bit more relaxed': 0, 'About the same': 0, 'More stressed': 0 },
      lifestyle: { 'Much more relaxed': 0, 'A bit more relaxed': 0, 'About the same': 0, 'More stressed': 0 }
    }
  },
  {
    id: 'q4',
    type: 'multiple_choice',
    question: "How would you describe your overall mood or stress level at work these days?",
    options: ['Very calm/positive', 'Mostly okay', 'A bit stressed', 'Very stressed'],
    scoring: {
      emotional: { 'Very calm/positive': 0, 'Mostly okay': 1, 'A bit stressed': 2, 'Very stressed': 3 },
      physical: { 'Very calm/positive': 0, 'Mostly okay': 0, 'A bit stressed': 0, 'Very stressed': 0 },
      work: { 'Very calm/positive': 0, 'Mostly okay': 0, 'A bit stressed': 1, 'Very stressed': 2 },
      lifestyle: { 'Very calm/positive': 0, 'Mostly okay': 0, 'A bit stressed': 0, 'Very stressed': 0 }
    }
  },
  {
    id: 'q5',
    type: 'open_ended',
    question: "What specifically at work has been causing you stress?",
    scoring: {
      emotional: {},
      physical: {},
      work: {},
      lifestyle: {}
    }
  },
  {
    id: 'q6',
    type: 'scale',
    question: "On a scale of 1 (not at all) to 10 (extremely), how stressed do you feel right now?",
    scaleRange: { min: 1, max: 10 },
    scoring: {
      emotional: { '1': 0, '2': 0, '3': 0, '4': 1, '5': 2, '6': 2, '7': 2, '8': 3, '9': 3, '10': 3 },
      physical: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0 },
      work: { '1': 0, '2': 0, '3': 0, '4': 1, '5': 2, '6': 2, '7': 2, '8': 3, '9': 3, '10': 3 },
      lifestyle: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0 }
    }
  },
  {
    id: 'q7',
    type: 'open_ended',
    question: "What typically makes that number go up or down during your day?",
    scoring: {
      emotional: {},
      physical: {},
      work: {},
      lifestyle: {}
    }
  },
  {
    id: 'q8',
    type: 'multiple_choice',
    question: "How do you feel at the end of your workday – energized, neutral, or exhausted?",
    options: ['Energized', 'Neutral', 'Exhausted'],
    scoring: {
      emotional: { 'Energized': 0, 'Neutral': 0, 'Exhausted': 1 },
      physical: { 'Energized': 0, 'Neutral': 1, 'Exhausted': 3 },
      work: { 'Energized': 0, 'Neutral': 0, 'Exhausted': 1 },
      lifestyle: { 'Energized': 0, 'Neutral': 0, 'Exhausted': 0 }
    }
  },
  {
    id: 'q9',
    type: 'yes_no',
    question: "Do you often feel this way (exhausted or detached)?",
    options: ['Yes', 'No'],
    conditional: {
      dependsOn: 'q8',
      condition: 'Exhausted'
    },
    scoring: {
      emotional: { 'Yes': 2, 'No': 0 },
      physical: { 'Yes': 0, 'No': 0 },
      work: { 'Yes': 1, 'No': 0 },
      lifestyle: { 'Yes': 0, 'No': 0 }
    }
  },
  {
    id: 'q10',
    type: 'yes_no',
    question: "Has this affected how you work or interact with colleagues?",
    options: ['Yes', 'No'],
    conditional: {
      dependsOn: 'q8',
      condition: 'Exhausted'
    },
    scoring: {
      emotional: { 'Yes': 1, 'No': 0 },
      physical: { 'Yes': 0, 'No': 0 },
      work: { 'Yes': 2, 'No': 0 },
      lifestyle: { 'Yes': 0, 'No': 0 }
    }
  },
  {
    id: 'q11',
    type: 'yes_no',
    question: "Do you find yourself feeling anxious or worrying even when there's no immediate problem?",
    options: ['Yes', 'No'],
    scoring: {
      emotional: { 'Yes': 3, 'No': 0 },
      physical: { 'Yes': 1, 'No': 0 },
      work: { 'Yes': 0, 'No': 0 },
      lifestyle: { 'Yes': 0, 'No': 0 }
    }
  },
  {
    id: 'q12',
    type: 'yes_no',
    question: "Have you felt like this before, maybe on a big project? How did it go?",
    options: ['Yes', 'No'],
    conditional: {
      dependsOn: 'q11',
      condition: 'Yes'
    },
    scoring: {
      emotional: { 'Yes': 1, 'No': 0 },
      physical: { 'Yes': 0, 'No': 0 },
      work: { 'Yes': 0, 'No': 0 },
      lifestyle: { 'Yes': 0, 'No': 0 }
    }
  },
  {
    id: 'q13',
    type: 'open_ended',
    question: "What thoughts run through your mind when you feel anxious?",
    conditional: {
      dependsOn: 'q12',
      condition: 'Yes'
    },
    scoring: {
      emotional: {},
      physical: {},
      work: {},
      lifestyle: {}
    }
  },
  {
    id: 'q14',
    type: 'yes_no',
    question: "Any physical symptoms when you worry? (e.g., fast heart, sweating)",
    options: ['Yes', 'No'],
    conditional: {
      dependsOn: 'q12',
      condition: 'Yes'
    },
    scoring: {
      emotional: { 'Yes': 1, 'No': 0 },
      physical: { 'Yes': 2, 'No': 0 },
      work: { 'Yes': 0, 'No': 0 },
      lifestyle: { 'Yes': 0, 'No': 0 }
    }
  },
  {
    id: 'q15',
    type: 'open_ended',
    question: "When you felt better back then, what helped?",
    conditional: {
      dependsOn: 'q12',
      condition: 'Yes'
    },
    scoring: {
      emotional: {},
      physical: {},
      work: {},
      lifestyle: {}
    }
  },
  {
    id: 'q16',
    type: 'multiple_choice',
    question: "How have you been sleeping lately? Falling asleep okay and sleeping through the night?",
    options: [
      'Falling asleep easily and sleeping through the night',
      'Some difficulty falling or staying asleep',
      'Often wake up during the night',
      'Hard to fall asleep/don\'t feel rested'
    ],
    scoring: {
      emotional: { 
        'Falling asleep easily and sleeping through the night': 0,
        'Some difficulty falling or staying asleep': 1,
        'Often wake up during the night': 2,
        'Hard to fall asleep/don\'t feel rested': 2
      },
      physical: { 
        'Falling asleep easily and sleeping through the night': 0,
        'Some difficulty falling or staying asleep': 2,
        'Often wake up during the night': 3,
        'Hard to fall asleep/don\'t feel rested': 3
      },
      work: { 
        'Falling asleep easily and sleeping through the night': 0,
        'Some difficulty falling or staying asleep': 0,
        'Often wake up during the night': 0,
        'Hard to fall asleep/don\'t feel rested': 0
      },
      lifestyle: { 
        'Falling asleep easily and sleeping through the night': 0,
        'Some difficulty falling or staying asleep': 0,
        'Often wake up during the night': 0,
        'Hard to fall asleep/don\'t feel rested': 0
      }
    }
  },
  {
    id: 'q17',
    type: 'multiple_choice',
    question: "How many hours do you usually sleep? Do you feel rested?",
    options: ['6+ hours and feel rested', '6+ hours but don\'t feel rested', 'Less than 6 hours', 'Very irregular sleep'],
    scoring: {
      emotional: { 
        '6+ hours and feel rested': 0,
        '6+ hours but don\'t feel rested': 1,
        'Less than 6 hours': 1,
        'Very irregular sleep': 2
      },
      physical: { 
        '6+ hours and feel rested': 0,
        '6+ hours but don\'t feel rested': 2,
        'Less than 6 hours': 3,
        'Very irregular sleep': 3
      },
      work: { 
        '6+ hours and feel rested': 0,
        '6+ hours but don\'t feel rested': 0,
        'Less than 6 hours': 0,
        'Very irregular sleep': 0
      },
      lifestyle: { 
        '6+ hours and feel rested': 0,
        '6+ hours but don\'t feel rested': 1,
        'Less than 6 hours': 1,
        'Very irregular sleep': 2
      }
    }
  },
  {
    id: 'q18',
    type: 'yes_no',
    question: "During your workday, do you take breaks for lunch or short rests?",
    options: ['Yes', 'No'],
    scoring: {
      emotional: { 'Yes': 0, 'No': 0 },
      physical: { 'Yes': 0, 'No': 1 },
      work: { 'Yes': 0, 'No': 0 },
      lifestyle: { 'Yes': 0, 'No': 2 }
    }
  },
  {
    id: 'q19',
    type: 'yes_no',
    question: "Do you do any regular exercise or physical activity?",
    options: ['Yes', 'No'],
    scoring: {
      emotional: { 'Yes': 0, 'No': 0 },
      physical: { 'Yes': 0, 'No': 2 },
      work: { 'Yes': 0, 'No': 0 },
      lifestyle: { 'Yes': 0, 'No': 1 }
    }
  },
  {
    id: 'q20',
    type: 'yes_no',
    question: "Outside work, do you have hobbies or activities you enjoy?",
    options: ['Yes', 'No'],
    scoring: {
      emotional: { 'Yes': 0, 'No': 0 },
      physical: { 'Yes': 0, 'No': 0 },
      work: { 'Yes': 0, 'No': 0 },
      lifestyle: { 'Yes': 0, 'No': 2 }
    }
  },
  {
    id: 'q21',
    type: 'multiple_choice',
    question: "Who do you talk to about work stress? Friends, family, colleagues, or no one?",
    options: ['Friends', 'Family', 'Colleagues', 'No one'],
    scoring: {
      emotional: { 'Friends': 1, 'Family': 1, 'Colleagues': 1, 'No one': 3 },
      physical: { 'Friends': 0, 'Family': 0, 'Colleagues': 0, 'No one': 0 },
      work: { 'Friends': 0, 'Family': 0, 'Colleagues': 0, 'No one': 0 },
      lifestyle: { 'Friends': 0, 'Family': 0, 'Colleagues': 0, 'No one': 0 }
    }
  },
  {
    id: 'q22',
    type: 'multiple_choice',
    question: "Would you find it easier to write in a journal about work or talk to a supportive community?",
    options: ['Write (mandala/art)', 'Talk (community support)', 'Either', 'Unsure'],
    scoring: {
      emotional: { 'Write (mandala/art)': 0, 'Talk (community support)': 1, 'Either': 0, 'Unsure': 0 },
      physical: { 'Write (mandala/art)': 0, 'Talk (community support)': 0, 'Either': 0, 'Unsure': 0 },
      work: { 'Write (mandala/art)': 0, 'Talk (community support)': 0, 'Either': 0, 'Unsure': 0 },
      lifestyle: { 'Write (mandala/art)': 1, 'Talk (community support)': 0, 'Either': 0, 'Unsure': 0 }
    }
  },
  {
    id: 'q23',
    type: 'multiple_choice',
    question: "Have you tried any stress-relief techniques before (meditation, yoga, therapy, etc.)? What helped or didn't?",
    options: ['Meditation', 'Yoga', 'Therapy', 'Nothing yet', 'Other techniques'],
    scoring: {
      emotional: {},
      physical: {},
      work: {},
      lifestyle: {}
    }
  },
  {
    id: 'q24',
    type: 'open_ended',
    question: "What personal strengths help you handle stress?",
    scoring: {
      emotional: {},
      physical: {},
      work: {},
      lifestyle: {}
    }
  },
  {
    id: 'q25',
    type: 'yes_no',
    question: "Have you ever tried therapy, counseling, or similar support?",
    options: ['Yes', 'No'],
    scoring: {
      emotional: { 'Yes': 0, 'No': 0 },
      physical: { 'Yes': 0, 'No': 0 },
      work: { 'Yes': 0, 'No': 0 },
      lifestyle: { 'Yes': 0, 'No': 1 }
    }
  },
  {
    id: 'q26',
    type: 'multiple_choice',
    question: "What are your main goals? (Select the most important one)",
    options: ['Feeling less anxious', 'Sleeping better', 'More balance', 'Improve relationships', 'Better work performance'],
    scoring: {
      emotional: { 'Feeling less anxious': 3, 'Sleeping better': 0, 'More balance': 0, 'Improve relationships': 1, 'Better work performance': 0 },
      physical: { 'Feeling less anxious': 0, 'Sleeping better': 2, 'More balance': 0, 'Improve relationships': 0, 'Better work performance': 0 },
      work: { 'Feeling less anxious': 0, 'Sleeping better': 0, 'More balance': 1, 'Improve relationships': 0, 'Better work performance': 2 },
      lifestyle: { 'Feeling less anxious': 0, 'Sleeping better': 0, 'More balance': 2, 'Improve relationships': 1, 'Better work performance': 0 }
    }
  }
];
