import { Imessage } from "@/lib/store/messages";
import Image from "next/image";

function Message({ message }: { message: Imessage }) {
  return (
    <div className="flex gap-2">
      <div>
        <Image
          src={message.user?.avatar_url!}
          width={40}
          height={40}
          className="rounded-full ring-2 dark:ring-white"
          alt={message.user?.name!}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <h1 className="font-bold">{message.user?.name}</h1>
          <span className="text-sm text-gray-400">
            {new Date(message.created_at).toLocaleDateString()}
          </span>
        </div>
        <p>{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
