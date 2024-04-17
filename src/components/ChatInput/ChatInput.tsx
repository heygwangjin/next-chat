"use client";

import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

function ChatInput() {
  const supabase = createClient();

  const handleSendMessage = async (text: string) => {
    if (!text) return;

    const { error } = await supabase.from("message").insert({ text });

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-4">
      <Input
        placeholder="Type a message"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSendMessage(event.currentTarget.value);
            event.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
}

export default ChatInput;
