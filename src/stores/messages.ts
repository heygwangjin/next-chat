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
  optimisticIds: string[];
  setActionMessage: (message: Imessage | undefined) => void;
  setOptimisticIds: (id: string) => void;
  addMessage: (nextMessage: Imessage) => void;
  optimisticDeleteMessage: (messageId: string) => void;
  optimisticEditMessage: (message: Imessage) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  optimisticIds: [],
  actionMessage: undefined,
  setActionMessage: (message) => set((state) => ({ actionMessage: message })),
  setOptimisticIds: (id) =>
    set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
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
