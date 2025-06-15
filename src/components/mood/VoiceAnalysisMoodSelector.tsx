import { useState, useRef } from "react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Play, Square, Loader2, Pause, AlertCircle, Waves, ExternalLink } from "lucide-react";
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
  const [isPaused, setIsPaused] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [detectedMood, setDetectedMood] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analysisDetails, setAnalysisDetails] = useState<any>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { character } = useCharacter();

  const startRecording = async () => {
    try {
      setError(null);
      console.log('Starting recording...');
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });
      const options = { mimeType: 'audio/wav' };
      if (!MediaRecorder.isTypeSupported('audio/wav')) {
        console.log('WAV not supported, using webm');
        options.mimeType = 'audio/webm';
      }
      const mediaRecorder = new MediaRecorder(stream, options);
      console.log('MediaRecorder created with type:', options.mimeType);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        console.log('Data available:', event.data.size, 'bytes');
        audioChunksRef.current.push(event.data);
      };
      mediaRecorder.onstop = () => {
        console.log('Recording stopped, processing audio...');
        const audioBlob = new Blob(audioChunksRef.current, { type: options.mimeType });
        console.log('Audio blob created:', audioBlob.size, 'bytes');
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setHasRecorded(true);

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1];
          console.log('Base64 audio length:', base64.length);
          analyzeVoice(base64);
        };
        reader.readAsDataURL(audioBlob);
      };
      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      startTimer();
    } catch (error) {
      console.error('Recording error:', error);
      const errorMessage = error instanceof Error ? error.message : "Could not access microphone";
      setError(errorMessage);
      toast.error("Could not access microphone. Please check permissions.");
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      startTimer();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsPaused(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 30) {
          stopRecording();
          return 30;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const analyzeVoice = async (audioBase64: string) => {
    setIsProcessing(true);
    setError(null);
    try {
      console.log('Sending audio for local AI analysis...');
      const { data, error } = await supabase.functions.invoke('analyze-voice-mood', {
        body: { audioData: audioBase64 }
      });
      console.log('Analysis response:', { data, error });
      if (error) {
        console.error('Analysis function error:', error);
        throw new Error(error.message || 'Failed to analyze voice');
      }
      if (data?.error) {
        console.error('Voice analysis error:', data.error);
        throw new Error(data.error);
      }
      if (!data?.mood) {
        throw new Error('No mood data received from analysis');
      }
      console.log('Analysis successful:', data);
      setDetectedMood(data.mood);
      setConfidence(data.confidence);
      setAnalysisDetails(data.raw_analysis);
      onMoodDetected(data.mood, data.confidence);
      toast.success(`Mood detected: ${data.mood.replace('_', ' ')} (${Math.round(data.confidence * 100)}% confidence)`);
    } catch (error) {
      console.error('Voice analysis failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      toast.error("Failed to analyze voice. Please try recording again or use manual selection.");
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
    setIsPaused(false);
    setError(null);
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
          <h3 className="text-xl font-bold heading-gradient mb-2">AI Voice Mood Analysis</h3>
          <p className="text-misty-rosewood-500">
            Record your voice and let our AI analyze your mood from speech patterns
          </p>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-emerald-splash-600">
            <Waves className="w-4 h-4" />
            <span>Local AI Processing • Privacy Protected</span>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <LiquidGlass variant="crystal" className="p-4 bg-red-50 border border-red-200">
            <div className="flex items-center gap-3 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Analysis Failed</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </LiquidGlass>
        )}

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
            <div className="space-y-4">
              <Button
                onClick={startRecording}
                className="liquid-glass-button w-32 h-32 rounded-full"
                size="lg"
              >
                <Mic className="w-8 h-8" />
              </Button>
              <p className="text-sm text-misty-rosewood-500">
                Speak naturally for 15-30 seconds for best results
              </p>
            </div>
          )}

          {isRecording && (
            <div className="space-y-4">
              <div className="relative w-32 h-32 mx-auto">
                <div className={`absolute inset-0 rounded-full border-4 ${isPaused ? 'border-yellow-500' : 'border-red-500'} ${!isPaused ? 'animate-pulse' : ''}`} />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                  {isPaused ? <Pause className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-white animate-pulse" />}
                </div>
              </div>
              
              <div className="flex gap-4 justify-center">
                {!isPaused ? (
                  <Button
                    onClick={pauseRecording}
                    className="liquid-glass-button rounded-full w-16 h-16"
                  >
                    <Pause className="w-6 h-6" />
                  </Button>
                ) : (
                  <Button
                    onClick={resumeRecording}
                    className="liquid-glass-button rounded-full w-16 h-16"
                  >
                    <Play className="w-6 h-6" />
                  </Button>
                )}
                
                <Button
                  onClick={stopRecording}
                  className="liquid-glass-button rounded-full w-16 h-16 bg-red-500 hover:bg-red-600"
                >
                  <Square className="w-6 h-6" />
                </Button>
              </div>
              
              <div className="text-2xl font-bold text-crimson-wine-600">
                {recordingTime}s / 30s {isPaused && "(Paused)"}
              </div>
              <div className="w-full bg-soft-blush-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isPaused ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gradient-to-r from-emerald-splash-500 to-deep-teal-500'
                  }`}
                  style={{ width: `${(recordingTime / 30) * 100}%` }}
                />
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <Loader2 className="w-12 h-12 animate-spin text-emerald-splash-500" />
                  <Waves className="w-6 h-6 absolute top-3 left-3 text-deep-teal-500 animate-pulse" />
                </div>
              </div>
              <div>
                <p className="text-misty-rosewood-500 font-medium">Analyzing your voice...</p>
                <p className="text-sm text-misty-rosewood-400">Processing speech patterns and emotional cues</p>
              </div>
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
                <LiquidGlass variant="crystal" className="p-4 space-y-3">
                  <div>
                    <p className="font-semibold text-emerald-splash-600 text-lg">
                      Detected Mood: {detectedMood.replace('_', ' ')}
                    </p>
                    <p className="text-sm text-misty-rosewood-500">
                      Confidence: {Math.round(confidence * 100)}%
                    </p>
                  </div>
                  
                  {analysisDetails && (
                    <div className="text-xs text-misty-rosewood-400 space-y-1">
                      <p>Analysis type: {analysisDetails.analysis_type}</p>
                      <p>Quality score: {Math.round(analysisDetails.quality_score * 100)}%</p>
                      <p>Processing time: {analysisDetails.processing_time}</p>
                    </div>
                  )}
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
        {(!hasRecorded && !isRecording) || error && (
          <div className="pt-4 border-t border-soft-blush-200">
            <p className="text-sm text-misty-rosewood-500 mb-3">
              {error ? "Having trouble? Try manual selection:" : "Prefer to select manually?"}
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
