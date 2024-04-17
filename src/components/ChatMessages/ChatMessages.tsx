import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import InitMessages from "../InitMessages";
import ListMessages from "../ListMessages";

async function ChatMessages() {
  const supabase = createClient();

  const { data: messages, error } = await supabase
    .from("message")
    .select("*, user(*)");

  if (error) {
    return <div>Error loading messages</div>;
  }

  return (
    <Suspense fallback={"Loading messages..."}>
      <ListMessages />
      <InitMessages messages={messages} />
    </Suspense>
  );
}

export default ChatMessages;
