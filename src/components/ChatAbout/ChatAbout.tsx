function ChatAbout() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="space-y-5 p-4 text-center">
        <h1 className="text-3xl font-bold">Welcome to Next Chat</h1>
        <div className="w-full space-y-4">
          <p>
            This is a chat application that power by Supabase Realtime DB and
            Next.js
          </p>
          <p>Login to send message</p>
        </div>
      </div>
    </div>
  );
}

export default ChatAbout;
