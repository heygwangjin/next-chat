"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

function ChatHeader({ user }: { user: User | null }) {
  const router = useRouter();

  const handleLoginWithGithub = () => {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error.message);
    }

    router.refresh();
  };

  return (
    <header className="flex h-20 items-center justify-between border-b p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">Next Chat</h1>
        <div className="flex items-center gap-1">
          <span className="h-4 w-4 animate-pulse rounded-full bg-green-500" />
          <h2 className="text-sm text-gray-600">2 onlines</h2>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button onClick={handleLoginWithGithub}>Login</Button>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}

export default ChatHeader;
