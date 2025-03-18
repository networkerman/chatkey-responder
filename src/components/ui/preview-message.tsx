
import React from "react";
import { cn } from "@/lib/utils";
import { KeywordResponse, MessageType } from "@/lib/types";

interface PreviewMessageProps {
  type: MessageType;
  message: KeywordResponse;
  userPhone?: string;
  withTail?: boolean;
  className?: string;
}

export const PreviewMessage: React.FC<PreviewMessageProps> = ({
  type,
  message,
  userPhone = "+1234567890",
  withTail = true,
  className,
}) => {
  const buttonClickHandler = (action?: string) => {
    console.log(`Button clicked with action: ${action}`);
  };

  return (
    <div className="animate-fade-in w-full max-w-md mx-auto">
      <div className="flex items-center mb-1 text-xs text-gray-500">
        {type === "received" ? (
          <span>{userPhone}</span>
        ) : (
          <span className="ml-auto">You</span>
        )}
      </div>
      <div
        className={cn(
          "chat-bubble",
          withTail && "chat-bubble-tail",
          type === "received" ? "chat-received" : "chat-sent",
          className
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
      </div>
      {message.quickReplyButtons && message.quickReplyButtons.length > 0 && (
        <div className={cn("flex gap-2 mt-2", type === "sent" && "justify-end")}>
          {message.quickReplyButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => buttonClickHandler(button.action)}
              className="quick-reply-btn animate-scale-in"
            >
              {button.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
