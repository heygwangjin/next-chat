"use client";

import { Imessage, useMessage } from "@/stores/messages";
import { createClient } from "@/supabase/client";
import React from "react";
import { toast } from "sonner";
import AlertDeleteMessage from "../AlertDeleteMessage";
import AlertEditMessage from "../AlertEditMessage";
import Message from "../Message";

function ListMessages() {
  const scrollRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  const { messages, optimisticIds, addMessage, optimisticDeleteMessage } =
    useMessage((state) => state);
  const supabase = createClient();

  React.useEffect(() => {
    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "message" },
        async (payload) => {
          if (optimisticIds.includes(payload.new.id)) {
            return;
          }

          const { data, error } = await supabase
            .from("user")
            .select("*")
            .eq("id", payload.new.user_id)
            .single();

          if (error) {
            toast.error(error.message);
            return;
          }

          const nextMessage = {
            ...payload.new,
            user: data,
          };

          addMessage(nextMessage as Imessage);
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "message" },
        (payload) => {
          optimisticDeleteMessage(payload.old.id);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [messages]);

  React.useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-4" ref={scrollRef}>
      <div className="flex-1"></div>
      <div className="space-y-6">
        {messages.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </div>
      <AlertDeleteMessage />
      <AlertEditMessage />
    </div>
  );
}

export default ListMessages;
