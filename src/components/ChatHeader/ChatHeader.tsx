"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { createClient } from "@/supabase/client";
import { User } from "@supabase/supabase-js";
import ChatPresence from "./ChatPresence";

function ChatHeader({ user }: { user: User | null }) {
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

    window.location.reload();
  };

  return (
    <header className="flex h-20 items-center justify-between border-b p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">Next Chat</h1>
        <ChatPresence />
      </div>
      <div className="flex items-center gap-2">
        {user ? (
          <Button className="dark:text-white" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button className="dark:text-white" onClick={handleLoginWithGithub}>
            Login
          </Button>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}

export default ChatHeader;
