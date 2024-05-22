import { Imessage } from "@/stores/messages";
import { useUser } from "@/stores/user";
import Image from "next/image";
import MessageMenu from "./MessageMenu";

function Message({ message }: { message: Imessage }) {
  const user = useUser((state) => state.user);

  return (
    <div className="flex gap-2">
      <div>
        <Image
          src={message.user?.avatar_url!}
          width={40}
          height={40}
          className="rounded-full ring-2 dark:ring-white min-w-10 min-h-10"
          alt={message.user?.name!}
        />
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h1 className="font-bold">{message.user?.name}</h1>
            <span className="text-sm text-gray-400">
              {new Date(message.created_at).toLocaleDateString()}
            </span>
            {message.is_edit && (
              <span className="text-sm text-gray-400">(edited)</span>
            )}
          </div>
          {user?.id === message.user?.id && <MessageMenu message={message} />}
        </div>
        <p className="break-words max-w-2xl whitespace-pre-wrap mt-1">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
