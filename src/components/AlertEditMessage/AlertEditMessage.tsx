"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Imessage, useMessage } from "@/stores/messages";
import { createClient } from "@/supabase/client";
import React from "react";
import { toast } from "sonner";

function AlertEditMessage() {
  const actionMessage = useMessage((state) => state.actionMessage);
  const optimisticEditMessage = useMessage(
    (state) => state.optimisticEditMessage,
  );
  const inputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleEditMessage = async () => {
    const supabase = createClient();

    const nextText = inputRef.current.value.trim();

    if (!nextText) {
      toast.error("Message cannot be empty");
      return;
    }

    const { error } = await supabase
      .from("message")
      .update({ text: nextText, is_edit: true })
      .eq("id", actionMessage?.id!);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Successfully edited message");
    document.getElementById("edit-message")?.click();
    optimisticEditMessage({
      ...actionMessage,
      text: nextText,
      is_edit: true,
    } as Imessage);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button id="edit-message"></button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Edit message</DialogTitle>
        </DialogHeader>
        <Input
          defaultValue={actionMessage?.text}
          ref={inputRef}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.stopPropagation();
              handleEditMessage();
            }
          }}
        />
        <DialogFooter>
          <Button type="submit" onClick={handleEditMessage}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AlertEditMessage;
