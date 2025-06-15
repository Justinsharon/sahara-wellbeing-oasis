
import React from "react";
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
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {type === "video" && "Interactive meditation experience."}
            {type === "audio" && "Relaxing sounds for wellness."}
            {type === "article" && "Wellness article."}
            {type === "activity" && "Interactive healing activity."}
          </DialogDescription>
        </DialogHeader>
        <div className="my-4">
          {type === "article" && articleHtml && (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: articleHtml }}
            />
          )}
          {type === "activity" && activityContent && (
            <div className="space-y-4">
              {activityContent}
            </div>
          )}
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
