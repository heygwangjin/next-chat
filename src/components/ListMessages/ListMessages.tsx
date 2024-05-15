"use client";

import { useMessage } from "@/stores/messages";
import AlertDeleteMessage from "../AlertDeleteMessage";
import AlertEditMessage from "../AlertEditMessage";
import Message from "../Message";

function ListMessages() {
  const messages = useMessage((state) => state.messages);

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
