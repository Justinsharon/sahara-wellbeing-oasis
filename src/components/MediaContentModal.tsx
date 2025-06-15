
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
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
}

export function MediaContentModal({
  open,
  onClose,
  type,
  title,
  url,
  articleHtml,
  activityContent,
}: MediaContentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="my-4">
          {type === "video" && url && (
            <div className="aspect-video w-full">
              {/* YouTube or embed player */}
              <iframe
                src={url}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-64 rounded-xl shadow-lg border"
              />
            </div>
          )}
          {type === "audio" && url && (
            <iframe
              src={url}
              allow="autoplay"
              title={title}
              className="w-full h-20 rounded-xl shadow border"
            />
          )}
          {type === "article" && articleHtml && (
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: articleHtml }} />
          )}
          {type === "activity" && activityContent}
        </div>
        <DialogClose asChild>
          <Button variant="secondary" className="w-full">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
