"use client";

import { Imessage, useMessage } from "@/stores/messages";
import React from "react";

function InitMessages({ messages }: { messages: Imessage[] | [] }) {
  const initState = React.useRef(false);

  React.useEffect(() => {
    if (!initState.current) {
      useMessage.setState({ messages });
    }

    initState.current = true;
  }, []);

  return <></>;
}

export default InitMessages;
