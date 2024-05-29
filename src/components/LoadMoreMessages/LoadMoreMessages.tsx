import { LIMIT_MESSAGES } from "@/constants";
import { useMessage } from "@/stores/messages";
import { createClient } from "@/supabase/client";
import { getFromAndTo } from "@/utils";
import { toast } from "sonner";
import { Button } from "../ui/button";

function LoadMoreMessages() {
  const supabase = createClient();

  const page = useMessage((state) => state.page);
  const hasMore = useMessage((state) => state.hasMore);
  const setMessages = useMessage((state) => state.setMessages);
  const setIsClickedLoadMore = useMessage(
    (state) => state.setIsClickedLoadMore,
  );

  const fetchMoreMessages = async () => {
    const { from, to } = getFromAndTo(page, LIMIT_MESSAGES);

    const { data, error } = await supabase
      .from("message")
      .select("*, user(*)")
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data.length === 0) {
      setMessages([]);
      toast.info("No more messages");
      return;
    }

    setMessages(data.reverse());
    setIsClickedLoadMore(true);
  };

  return (
    hasMore && (
      <Button variant="outline" className="w-full" onClick={fetchMoreMessages}>
        Load More
      </Button>
    )
  );
}

export default LoadMoreMessages;
