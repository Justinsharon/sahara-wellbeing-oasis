import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Union for content types
type ContentType = "video" | "audio" | "article" | "activity" | "journal";

interface MediaContentModalProps {
  open: boolean;
  onClose: () => void;
  type: ContentType;
  title: string;
  url?: string;
  articleHtml?: string;
  activityContent?: React.ReactNode;
  soundcloudUrl?: string;
  youtubeUrl?: string;
}

export function MediaContentModal({
  open,
  onClose,
  type,
  title,
  url,
  articleHtml,
  activityContent,
  soundcloudUrl,
  youtubeUrl,
}: MediaContentModalProps) {
  // Track video error state for fallback UI
  const [videoError, setVideoError] = useState(false);
  const [audioError, setAudioError] = useState(false);

  // Reset error state when switching modal content
  React.useEffect(() => {
    setVideoError(false);
    setAudioError(false);
  }, [open, url, soundcloudUrl, youtubeUrl]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {type === "video" && "Healing music or meditation video."}
            {type === "audio" && "Therapeutic music or relaxation sounds."}
            {type === "article" && "Wellness article."}
            {type === "activity" && "Interactive healing activity."}
          </DialogDescription>
        </DialogHeader>
        <div className="my-4">
          {type === "video" && url && !videoError && (
            <div className="aspect-video w-full">
              <iframe
                src={url}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-64 rounded-xl shadow-lg border"
                loading="lazy"
                onError={() => setVideoError(true)}
              />
            </div>
          )}
          {type === "video" && videoError && (
            <div className="flex flex-col items-center justify-center py-8 text-center text-warm-gray">
              <svg className="mx-auto mb-4 w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
              <span>
                Sorry, this video is unavailable or cannot be played.<br />
                Try refreshing the page or choose another item.
              </span>
            </div>
          )}
          {type === "audio" && (
            <div className="w-full flex flex-col items-center">
              {/* Priority 1: YouTube embed if present */}
              {youtubeUrl && (
                <div className="w-full aspect-video mb-4">
                  <iframe
                    src={youtubeUrl}
                    title={title}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="w-full h-48 rounded-lg shadow-lg border"
                  />
                </div>
              )}
              {/* Priority 2: SoundCloud embed if present and no YouTube */}
              {!youtubeUrl && soundcloudUrl && (
                <div className="w-full mb-4">
                  <iframe
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(soundcloudUrl)}&color=%23b3656b&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true`}
                    title={title + " (SoundCloud)"}
                    className="rounded-lg shadow-lg border"
                  ></iframe>
                  <div className="text-xs text-muted-foreground text-center mt-2">Via SoundCloud</div>
                </div>
              )}
              {/* Priority 3: fallback to HTML5 audio */}
              {!youtubeUrl && !soundcloudUrl && url && !audioError && (
                <audio
                  controls
                  src={url}
                  className="w-full rounded-lg shadow border"
                  style={{ outline: 'none' }}
                  preload="metadata"
                  onError={() => setAudioError(true)}
                >
                  Your browser does not support the audio element.
                </audio>
              )}
              {/* Error fallback */}
              {(audioError || (!youtubeUrl && !soundcloudUrl && !url)) && (
                <div className="flex flex-col items-center justify-center py-8 text-center text-warm-gray">
                  <svg className="mx-auto mb-4 w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
                  <span>
                    Sorry, the audio could not be loaded.<br />
                    Try using a different track, or open in a separate app.
                  </span>
                </div>
              )}
            </div>
          )}
          {type === "article" && articleHtml && (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: articleHtml }}
            />
          )}
          {type === "activity" && activityContent}
        </div>
        <DialogClose asChild>
          <Button variant="secondary" className="w-full">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
