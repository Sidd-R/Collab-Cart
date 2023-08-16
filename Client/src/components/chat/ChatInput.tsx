import { useAppSelector } from "@/app/hooks";
import { socket } from "@/app/layout";
import SendIcon from '@/app/icons/SendIcon';
import * as React from "react";
import { Chat } from "@/app/types";

const ChatInput = () => {
  const { userId, userName } = useAppSelector((state) => state.user);

  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();
        const { value } = e.target[0];
        if (!value) return;
        e.target[0].value = "";
        const message: Chat = { userId, userName, message: value, type: 'message'};
        socket.emit("sendChat", message);
      }}
      className="relative mx-auto w-full xs:pr-4"
    >
    <div className="flex">
    <input
        placeholder="type to chat"
        type="text"
        className="w-full border-x-0 border-b border-t-0 border-fg bg-transparent font-normal text-gray-700 placeholder:text-gray-600 focus:border-fg focus:outline-0 focus:ring-0"
      />
      <button
        className="absolute right-0 h-10 w-10 border-2 border-blue-500 bg-white rounded-full flex items-center justify-center transition-opacity duration-200 hover:bg-opacity-80 active:bg-opacity-70"
        type="submit"
      >
        <SendIcon />
      </button>
    </div>
    </form>
  );
};

export default ChatInput;
