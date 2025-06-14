
export interface TherapyRecommendation {
  type: string;
  title: string;
  description: string;
  confidence: number;
  reasoning: string;
}

export interface AssessmentScores {
  emotional: number;
  physical: number;
  work: number;
  lifestyle: number;
}

export interface UserResponses {
  [questionId: string]: string;
}

export function generateTherapyRecommendations(
  scores: AssessmentScores,
  responses: UserResponses
): TherapyRecommendation[] {
  const recommendations: TherapyRecommendation[] = [];

  // CBT - High emotional scores or anxiety
  if (scores.emotional >= 8 || responses.q11 === 'Yes') {
    recommendations.push({
      type: 'CBT',
      title: 'Cognitive Behavioral Therapy (CBT)',
      description: 'A structured approach to identify and change negative thought patterns that contribute to anxiety and stress.',
      confidence: scores.emotional >= 8 ? 90 : 85,
      reasoning: scores.emotional >= 8 
        ? 'Your high emotional stress score indicates CBT could help manage overwhelming thoughts and feelings.'
        : 'You mentioned experiencing anxiety, which CBT is particularly effective at addressing.'
    });
  }

  // DBT - High emotional with emotion regulation issues
  if (scores.emotional >= 8 && (responses.q6 && parseInt(responses.q6) >= 8)) {
    recommendations.push({
      type: 'DBT',
      title: 'Dialectical Behavior Therapy (DBT)',
      description: 'Focuses on emotion regulation skills and mindfulness to help manage intense emotions and stress.',
      confidence: 80,
      reasoning: 'Your high stress levels combined with emotional intensity suggest DBT skills could help with emotion regulation.'
    });
  }

  // Mindfulness - High stress/anxiety or goals include stress reduction
  if (scores.emotional >= 7 || responses.q26 === 'Feeling less anxious' || responses.q26 === 'More balance') {
    recommendations.push({
      type: 'Mindfulness',
      title: 'Mindfulness-Based Stress Reduction',
      description: 'Meditation and mindfulness practices to reduce stress, improve focus, and enhance emotional well-being.',
      confidence: 85,
      reasoning: scores.emotional >= 7 
        ? 'Your stress levels indicate mindfulness practices could provide significant relief.'
        : 'Your goals align well with what mindfulness practices can help achieve.'
    });
  }

  // Yoga - High physical scores with stress
  if (scores.physical >= 6 && scores.emotional >= 5) {
    recommendations.push({
      type: 'Yoga',
      title: 'Yoga Therapy',
      description: 'Mind-body practices combining physical movement, breathing, and meditation to reduce stress and improve wellness.',
      confidence: 75,
      reasoning: 'Your physical symptoms combined with stress suggest yoga could address both mental and physical aspects of your well-being.'
    });
  }

  // ACT - Moderate scores with acceptance/balance struggles
  if (scores.emotional >= 4 && scores.emotional < 8 && responses.q26 === 'More balance') {
    recommendations.push({
      type: 'ACT',
      title: 'Acceptance and Commitment Therapy (ACT)',
      description: 'Helps develop psychological flexibility and acceptance while working toward valued life goals.',
      confidence: 70,
      reasoning: 'Your goal of achieving more balance aligns with ACT\'s focus on acceptance and living according to your values.'
    });
  }

  // Mandala Art - Creative preference or high emotional with resistance to traditional therapy
  if (responses.q22 === 'Write (mandala/art)' || (scores.emotional >= 6 && responses.q25 === 'No')) {
    recommendations.push({
      type: 'Mandala Art',
      title: 'Mandala Art Therapy',
      description: 'Creative expression through mandala drawing and coloring to reduce anxiety and promote relaxation.',
      confidence: 65,
      reasoning: responses.q22 === 'Write (mandala/art)' 
        ? 'You expressed preference for creative/artistic approaches to stress relief.'
        : 'Creative therapies can be a gentle introduction to stress relief and emotional expression.'
    });
  }

  // Humanistic - Always consider, especially with low support or emotional overwhelm
  if (responses.q21 === 'No one' || scores.emotional >= 6) {
    recommendations.push({
      type: 'Humanistic',
      title: 'Humanistic/Person-Centered Therapy',
      description: 'A supportive, empathetic approach that validates your feelings and helps you develop self-awareness.',
      confidence: 75,
      reasoning: responses.q21 === 'No one' 
        ? 'Having limited support systems makes a therapeutic relationship particularly valuable for emotional processing.'
        : 'A supportive therapeutic relationship can provide validation and help process overwhelming emotions.'
    });
  }

  // Sort by confidence and return top recommendations
  return recommendations
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3); // Return top 3 recommendations
}
