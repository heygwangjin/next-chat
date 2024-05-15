import { createClient } from "@/supabase/server";
import { Suspense } from "react";
import InitMessages from "../InitMessages";
import ListMessages from "../ListMessages";

async function ChatMessages() {
  const supabase = createClient();

  const { data: messages, error } = await supabase
    .from("message")
    .select("*, user(*)")
    .order("created_at", { ascending: true });

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
