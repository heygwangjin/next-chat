"use client";

import { useUser } from "@/stores/user";
import { User } from "@supabase/supabase-js";
import React from "react";

function InitUser({ user }: { user: User | null }) {
  const initState = React.useRef(false);

  React.useEffect(() => {
    if (!initState.current) {
      useUser.setState({ user });
    }

    initState.current = true;
  }, []);

  return <></>;
}

export default InitUser;
