
import { useState, useRef } from "react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Play, Square, Loader2 } from "lucide-react";
import { CharacterAvatar } from "@/components/character/CharacterAvatar";
import { useCharacter } from "@/hooks/useCharacter";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface VoiceAnalysisMoodSelectorProps {
  onMoodDetected: (mood: string, confidence: number) => void;
  onManualFallback: () => void;
}

export function VoiceAnalysisMoodSelector({ onMoodDetected, onManualFallback }: VoiceAnalysisMoodSelectorProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [detectedMood, setDetectedMood] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { character } = useCharacter();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setHasRecorded(true);
        
        // Convert to base64 and analyze
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1];
          analyzeVoice(base64);
        };
        reader.readAsDataURL(audioBlob);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 30) {
            stopRecording();
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
      
    } catch (error) {
      toast.error("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const analyzeVoice = async (audioBase64: string) => {
    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-voice-mood', {
        body: { audioData: audioBase64 }
      });
      
      if (error) throw error;
      
      setDetectedMood(data.mood);
      setConfidence(data.confidence);
      onMoodDetected(data.mood, data.confidence);
      toast.success(`Mood detected: ${data.mood} (${Math.round(data.confidence * 100)}% confidence)`);
      
    } catch (error) {
      toast.error("Failed to analyze voice. Please try manual selection.");
      onManualFallback();
    } finally {
      setIsProcessing(false);
    }
  };

  const getMoodExpression = (mood: string) => {
    switch (mood) {
      case "very_happy":
        return { type: 'excited' as const, intensity: 'high' as const };
      case "happy":
        return { type: 'happy' as const, intensity: 'medium' as const };
      case "neutral":
        return { type: 'neutral' as const, intensity: 'medium' as const };
      case "sad":
        return { type: 'sad' as const, intensity: 'medium' as const };
      case "very_sad":
        return { type: 'sad' as const, intensity: 'high' as const };
      default:
        return { type: 'thinking' as const, intensity: 'medium' as const };
    }
  };

  const reset = () => {
    setHasRecorded(false);
    setAudioUrl(null);
    setDetectedMood(null);
    setConfidence(null);
    setRecordingTime(0);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
  };

  if (!character) {
    return (
      <LiquidGlass variant="card" className="p-6 text-center">
        <p className="text-misty-rosewood-500">Create your character companion to use voice analysis!</p>
        <Button onClick={onManualFallback} className="mt-4 liquid-glass-button">
          Use Manual Selection
        </Button>
      </LiquidGlass>
    );
  }

  return (
    <LiquidGlass variant="card" floating bubbles className="p-8">
      <div className="text-center space-y-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold heading-gradient mb-2">Voice Mood Analysis</h3>
          <p className="text-misty-rosewood-500">
            Record 30 seconds of your voice and let AI detect your mood
          </p>
        </div>

        {/* Character Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-soft-blush-200">
            <CharacterAvatar
              character={character}
              expression={detectedMood ? getMoodExpression(detectedMood) : { type: 'thinking', intensity: 'medium' }}
              size="xl"
              animated={isRecording || isProcessing}
            />
          </div>
        </div>

        {/* Recording Controls */}
        <div className="space-y-4">
          {!hasRecorded && !isRecording && (
            <Button
              onClick={startRecording}
              className="liquid-glass-button w-32 h-32 rounded-full"
              size="lg"
            >
              <Mic className="w-8 h-8" />
            </Button>
          )}

          {isRecording && (
            <div className="space-y-4">
              <div className="relative w-32 h-32 mx-auto">
                <Button
                  onClick={stopRecording}
                  className="liquid-glass-button w-full h-full rounded-full bg-red-500 hover:bg-red-600"
                >
                  <Square className="w-8 h-8" />
                </Button>
                <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-pulse" />
              </div>
              <div className="text-2xl font-bold text-crimson-wine-600">
                {recordingTime}s / 30s
              </div>
              <div className="w-full bg-soft-blush-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-emerald-splash-500 to-deep-teal-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(recordingTime / 30) * 100}%` }}
                />
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="space-y-4">
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-emerald-splash-500" />
              <p className="text-misty-rosewood-500">Analyzing your voice...</p>
            </div>
          )}

          {hasRecorded && !isProcessing && (
            <div className="space-y-4">
              {audioUrl && (
                <LiquidGlass variant="crystal" className="p-4">
                  <audio controls className="w-full">
                    <source src={audioUrl} type="audio/wav" />
                  </audio>
                </LiquidGlass>
              )}
              
              {detectedMood && confidence && (
                <LiquidGlass variant="crystal" className="p-4">
                  <p className="font-semibold text-emerald-splash-600">
                    Detected Mood: {detectedMood.replace('_', ' ')}
                  </p>
                  <p className="text-sm text-misty-rosewood-500">
                    Confidence: {Math.round(confidence * 100)}%
                  </p>
                </LiquidGlass>
              )}
              
              <div className="flex gap-3 justify-center">
                <Button onClick={reset} variant="outline" className="liquid-glass-button">
                  Record Again
                </Button>
                <Button onClick={onManualFallback} variant="outline" className="liquid-glass-button">
                  Manual Selection
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Fallback Option */}
        {!hasRecorded && !isRecording && (
          <div className="pt-4 border-t border-soft-blush-200">
            <p className="text-sm text-misty-rosewood-500 mb-3">
              Prefer to select manually?
            </p>
            <Button onClick={onManualFallback} variant="outline" className="liquid-glass-button">
              <MicOff className="w-4 h-4 mr-2" />
              Manual Selection
            </Button>
          </div>
        )}
      </div>
    </LiquidGlass>
  );
}
