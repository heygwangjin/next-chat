"use client";

import { Textarea } from "@/components/ui/textarea";
import { Imessage, useMessage } from "@/stores/messages";
import { useUser } from "@/stores/user";
import { createClient } from "@/supabase/client";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

function ChatInput() {
  const user = useUser((state) => state.user);
  const { addMessage, setOptimisticIds } = useMessage((state) => state);

  const supabase = createClient();

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    const id = uuidv4();
    const nextMessage = {
      id,
      text,
      user_id: user?.id,
      is_edit: false,
      created_at: new Date().toISOString(),
      user: {
        id: user?.id,
        name: user?.user_metadata.name,
        avatar_url: user?.user_metadata.avatar_url,
        created_at: new Date().toISOString(),
      },
    };

    addMessage(nextMessage as Imessage);
    setOptimisticIds(nextMessage.id);

    const { error } = await supabase.from("message").insert({ id, text });

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-4">
      <Textarea
        placeholder="Type a message"
        className="resize-none"
        onKeyDownCapture={(event) => {
          if (
            event.key === "Enter" &&
            event.nativeEvent.isComposing === false
          ) {
            event.preventDefault();
            handleSendMessage(event.currentTarget.value);
            event.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
}

export default ChatInput;
