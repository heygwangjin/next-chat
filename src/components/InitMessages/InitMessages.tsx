"use client";

import { LIMIT_MESSAGES } from "@/constants";
import { Imessage, useMessage } from "@/stores/messages";
import React from "react";

function InitMessages({ messages }: { messages: Imessage[] | [] }) {
  const initState = React.useRef(false);
  const hasMore = messages.length >= LIMIT_MESSAGES;

  React.useEffect(() => {
    if (!initState.current) {
      useMessage.setState({ messages, hasMore });
    }

    initState.current = true;
  }, []);

  return <></>;
}

export default InitMessages;
