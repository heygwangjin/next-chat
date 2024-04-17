import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import InitUser from "@/components/InitUser";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <main className="mx-auto h-screen max-w-3xl md:py-10">
        <div className="flex h-full flex-col rounded-md border">
          <ChatHeader user={user} />
          <div className="flex flex-1 flex-col overflow-y-auto p-4">
            <div className="flex-1"></div>
            {/* <div className="space-y-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                (value) => {
                  return (
                    <div className="flex gap-2" key={value}>
                      <div className="h-10 w-10 rounded-full bg-green-500"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <h1 className="font-bold">Gwang Jin</h1>
                          <span className="text-sm text-gray-400">2:00 PM</span>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec nec maximus nunc. Nullam in justo et nunc
                          tempus lacinia. Aliquam erat volutpat. Nullam in justo
                          et nunc tempus lacinia. Aliquam erat volutpat.
                        </p>
                      </div>
                    </div>
                  );
                },
              )}
            </div> */}
          </div>
          <ChatInput />
        </div>
      </main>
      <InitUser user={user} />
    </>
  );
}
