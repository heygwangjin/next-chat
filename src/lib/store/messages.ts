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
  messages: Imessage[] | [];
  actionMessage: Imessage | undefined;
  addMessage: (message: Imessage) => void;
  optimisticDeleteMessage: (messageId: string) => void;
  setActionMessage: (message: Imessage | undefined) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  actionMessage: undefined,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  optimisticDeleteMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.filter((message) => message.id !== messageId),
    })),
  setActionMessage: (message) => set((state) => ({ actionMessage: message })),
}));
