"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMessage } from "@/stores/messages";
import { createClient } from "@/supabase/client";
import { toast } from "sonner";

function AlertDeleteMessage() {
  const actionMessage = useMessage((state) => state.actionMessage);
  const optimisticDeleteMessage = useMessage(
    (state) => state.optimisticDeleteMessage,
  );

  const handleDeleteMessage = async () => {
    const supabase = createClient();

    const { error } = await supabase
      .from("message")
      .delete()
      .eq("id", actionMessage?.id!);

    if (error) {
      toast.error(error.message);
    } else {
      optimisticDeleteMessage(actionMessage?.id!);
      toast.success("Successfully deleted message!");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button id="delete-message"></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            message and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteMessage}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertDeleteMessage;
