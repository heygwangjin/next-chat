import ChatHeader from "@/components/ChatHeader";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto h-screen max-w-3xl md:py-10">
      <div className="h-full rounded-md border">
        <ChatHeader user={user} />
      </div>
    </main>
  );
}
