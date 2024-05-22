"use client";

import { Imessage, useMessage } from "@/stores/messages";
import { createClient } from "@/supabase/client";
import { ArrowDown } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import AlertDeleteMessage from "../AlertDeleteMessage";
import AlertEditMessage from "../AlertEditMessage";
import Message from "../Message";
import { Button } from "../ui/button";
import { useUser } from '@/stores/user';

function ListMessages() {
  const [userScrolled, setUserScrolled] = React.useState(false);
  const [notification, setNotification] = React.useState(0);
  const user = useUser((state) => state.user);
  const {
    messages,
    optimisticIds,
    addMessage,
    optimisticDeleteMessage,
    optimisticEditMessage,
  } = useMessage((state) => state);

  const scrollRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  const supabase = createClient();

  React.useEffect(() => {
    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "message" },
        async (payload) => {
          const scrollContainer = scrollRef.current;

          if (
            scrollContainer.scrollTop <
            scrollContainer.scrollHeight - scrollContainer.clientHeight - 10
          ) {
            setNotification((prev) => prev + 1);
          }

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
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "message" },
        (payload) => {
          optimisticEditMessage(payload.new as Imessage);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [messages]);

  React.useEffect(() => {
    const scrollContainer = scrollRef.current;

    // 가장 최근 메시지가 내가 보낸 메시지일 경우 스크롤을 가장 아래로 내린다.
    if (messages.length && messages[messages.length - 1].user_id === user?.id) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }

    // 초기 메시지 로딩 시 스크롤을 가장 아래로 내린다
    if (scrollContainer && !userScrolled) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const handleOnScroll = () => {
    const scrollContainer = scrollRef.current;

    if (!scrollContainer) {
      return;
    }

    const isScroll =
      scrollContainer.scrollTop <
      scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;

    if (!isScroll) {
      setNotification(0);
    }

    setUserScrolled(isScroll);
  };

  const scrollDown = () => {
    setUserScrolled(false);
    setNotification(0);
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  return (
    <div
      className="flex flex-1 flex-col overflow-y-auto"
      ref={scrollRef}
      onScroll={handleOnScroll}
    >
      <div className="flex-1"></div>
      <div className="space-y-6 p-4">
        {messages.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </div>
      {userScrolled && (
        <div className="absolute bottom-28 z-10 w-full">
          {notification ? (
            <Button
              className="mx-auto flex animate-bounce items-center justify-center dark:text-white"
              onClick={scrollDown}
            >
              {notification} new messages
            </Button>
          ) : (
            <Button
              className="mx-auto flex h-10 w-10 animate-bounce items-center justify-center rounded-full p-0 dark:text-white"
              onClick={scrollDown}
            >
              <ArrowDown />
            </Button>
          )}
        </div>
      )}

      <AlertDeleteMessage />
      <AlertEditMessage />
    </div>
  );
}

export default ListMessages;
