"use client";

import { Imessage, useMessage } from "@/stores/messages";
import { createClient } from "@/supabase/client";
import React from "react";
import { toast } from "sonner";
import AlertDeleteMessage from "../AlertDeleteMessage";
import AlertEditMessage from "../AlertEditMessage";
import Message from "../Message";

function ListMessages() {
  const { messages, addMessage, optimisticIds } = useMessage((state) => state);
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
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-4">
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
