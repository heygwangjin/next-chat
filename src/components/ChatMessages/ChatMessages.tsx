import { LIMIT_MESSAGES } from "@/constants";
import { createClient } from "@/supabase/server";
import { Suspense } from "react";
import InitMessages from "../InitMessages";
import ListMessages from "../ListMessages";

async function ChatMessages() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("message")
    .select("*, user(*)")
    .range(0, LIMIT_MESSAGES)
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error loading messages</div>;
  }

  return (
    <Suspense fallback={"Loading messages..."}>
      <ListMessages />
      <InitMessages messages={data.reverse()} />
    </Suspense>
  );
}

export default ChatMessages;
