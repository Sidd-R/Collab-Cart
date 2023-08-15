import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import * as React from 'react';

import Bubble from './Bubble';
import ChatInput from './ChatInput';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { toggleChat, updateChat } from '@/app/features/chat/chatSlice';
import { socket } from '@/app/layout';

export default function ChatBox() {
  const { isChatOpen, publicChat } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  // const { pathname } = useRouter();

  const [isPublic, setIsPublic] = React.useState(false);

  const divRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  React.useEffect(() => {
    if (divRef.current && isChatOpen) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [isChatOpen, publicChat]);
  let userId = 'userId';

  socket.on('updateChat', (data) => {
    console.log('update chat', data)
    dispatch(updateChat(data))
    
  })

  return (
    <span className="z-1 absolute flex w-full cursor-pointer items-center justify-end text-3xl font-bold text-bg">
      <button
        onClick={() => dispatch(toggleChat())}
        className="active:text-fg/-80 flex flex-col items-center gap-1 text-3xl text-fg transition-colors duration-200 hover:text-fg/90"
      >
        Open Chat
        {/* <GiDiscussion /> */}
      </button>
      {/* {showNotification && (
        <div
          className={`absolute -right-2 -top-2 h-4 w-4 animate-bounce rounded-full bg-fg text-xs text-bg  right-2`}
        >
          !
        </div>
      )} */}
      <div
        onClick={() => isChatOpen && dispatch(toggleChat())}
        className={`fixed inset-0 flex cursor-default gap-4 rounded-lg bg-bg/90 opacity-0 transition-all duration-300 right-3 w-[calc(100%+0.5rem)] sm:right-2 ${
          isChatOpen ? 'z-30 opacity-100' : 'pointer-events-none -z-10'
        }`}
      ></div>
      <AnimatePresence mode="wait">
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            key="chat-box"
            className={`absolute -bottom-[26rem] -right-4 z-40 flex h-[24.5rem] cursor-auto justify-between gap-4 rounded-lg bg-bg/30 p-4 ring ring-fg/60 ring-offset-2 ring-offset-bg bg-sky-900 bg-opacity-80 `}
          >
            <div className="flex h-full w-full flex-col justify-between ">
              <div className="flex justify-between">
                <div className="mb-2 flex gap-2 text-sm">
                  {/* {isRoomChat && (
                    <button
                      onClick={() => setIsPublic((isPublic) => !isPublic)}
                      className={clsx(
                        'rounded-lg px-2 py-1 transition-colors duration-200',
                        [!isPublic ? 'bg-fg text-bg' : 'text-hl']
                      )}
                    >
                      room
                    </button>
                  )} */}
                  <button
                    onClick={() => setIsPublic((isPublic) => !isPublic)}
                    className={`rounded-lg px-2 py-1 transition-colors duration-200 ${
                      isPublic || true ? 'bg-fg text-bg' : 'text-hl'
                    }`}
                  >
                    public
                  </button>
                </div>
                <span className="pr-4 text-sm text-fg xs:pr-6">8 online</span>
              </div>
              <div
                ref={divRef}
                className="xs:scrollbar mx-auto flex h-full w-full flex-col overflow-y-auto break-words py-2 pr-4 xs:pr-2"
              >
                {publicChat.map((chat, index) => {
                  return (
                    <Bubble
                      key={index}
                      isYou={chat.userId === userId}
                      value={chat.message}
                      username={chat.userName}
                    />
                  );
                })}
              </div>
              <ChatInput />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
