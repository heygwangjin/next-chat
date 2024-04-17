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
  addMessage: (message: Imessage) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));
