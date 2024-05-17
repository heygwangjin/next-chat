import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import InitUser from "@/components/InitUser";
import { createClient } from "@/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <main className="mx-auto h-screen max-w-3xl md:py-10">
        <div className="relative flex h-full flex-col rounded-md border">
          <ChatHeader user={user} />
          {user ? <ChatMessages /> : <div>hehe</div>}
          <ChatInput />
        </div>
      </main>
      <InitUser user={user} />
    </>
  );
}
