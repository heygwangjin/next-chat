"use client";

import { Input } from "@/components/ui/input";
import { Imessage, useMessage } from '@/lib/store/messages';
import { useUser } from '@/lib/store/user';
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

function ChatInput() {
  const user  = useUser((state) => state.user);
  const addMessage = useMessage((state) => state.addMessage);

  const supabase = createClient();

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    const nextMessage = {
      id: uuidv4(),
      text,
      user_id: user?.id,
      is_edit: false,
      created_at: new Date().toISOString(),
      user: {
        id: user?.id,
        name: user?.user_metadata.name,
        avatar_url: user?.user_metadata.avatar_url,
        created_at: new Date().toISOString(),
      }
    }

    addMessage(nextMessage as Imessage)

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
