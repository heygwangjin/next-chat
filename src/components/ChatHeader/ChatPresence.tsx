"use client";

import { useUser } from "@/stores/user";
import { createClient } from "@/supabase/client";
import React from "react";

function ChatPresence() {
  const user = useUser((state) => state.user);
  const supabase = createClient();
  const [numOnlineUsers, setNumOnlineUsers] = React.useState(0);

  React.useEffect(() => {
    const channel = supabase.channel("chat-room-presence");

    channel
      .on("presence", { event: "sync" }, () => {
        // 탭이 여러개 열려있을 때, 중복된 유저를 제거하기 위해 Set을 사용한다.
        const userIds = new Set();

        for (const id in channel.presenceState()) {
          // @ts-ignore
          const { user_id } = channel.presenceState()[id][0];

          if (user_id) {
            // @ts-ignore
            userIds.add(channel.presenceState()[id][0].user_id);
          }

        }

        setNumOnlineUsers(userIds.size);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user?.id,
          });
        }
      });
  }, [user]);

  if (!user) {
    return <div className=" h-3 w-1"></div>;
  }

  return (
    <div className="flex items-center gap-1">
      <span className="h-4 w-4 animate-pulse rounded-full bg-green-500" />
      <h2 className="text-sm text-gray-600">{numOnlineUsers} onlines</h2>
    </div>
  );
}

export default ChatPresence;
