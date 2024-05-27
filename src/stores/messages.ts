import { LIMIT_MESSAGES } from "@/constants";
import { create } from "zustand";

export type Imessage = {
  created_at: string;
  id: string;
  is_edit: boolean;
  text: string;
  user_id: string;
  user: {
    avatar_url: string;
    created_at: string;
    id: string;
    name: string;
  } | null;
};

interface MessageState {
  hasMore: boolean;
  isClickedLoadMore: boolean;
  page: number;
  messages: Imessage[] | [];
  actionMessage: Imessage | undefined;
  optimisticIds: string[];
  setIsClickedLoadMore: (isClickedLoadMore: boolean) => void;
  setActionMessage: (message: Imessage | undefined) => void;
  setOptimisticIds: (id: string) => void;
  setMessages: (messages: Imessage[]) => void;
  addMessage: (nextMessage: Imessage) => void;
  optimisticDeleteMessage: (messageId: string) => void;
  optimisticEditMessage: (message: Imessage) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  hasMore: false,
  isClickedLoadMore: false,
  page: 1,
  messages: [],
  optimisticIds: [],
  actionMessage: undefined,
  setIsClickedLoadMore: (isClickedLoadMore) =>
    set((state) => ({ isClickedLoadMore })),
  setActionMessage: (message) => set((state) => ({ actionMessage: message })),
  setOptimisticIds: (id) =>
    set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
  setMessages: (newMessages) =>
    set((state) => ({
      messages: [...newMessages, ...state.messages],
      page: state.page + 1,
      hasMore: newMessages.length >= LIMIT_MESSAGES,
    })),
  addMessage: (nextMessage) =>
    set((state) => ({ messages: [...state.messages, nextMessage] })),
  optimisticDeleteMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.filter((message) => message.id !== messageId),
    })),
  optimisticEditMessage: (nextMessage) =>
    set((state) => ({
      messages: state.messages.filter((message) => {
        if (message.id === nextMessage.id) {
          message.text = nextMessage.text;
          message.is_edit = nextMessage.is_edit;
        }

        return message;
      }),
    })),
}));
