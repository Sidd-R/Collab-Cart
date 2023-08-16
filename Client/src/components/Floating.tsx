/* This example requires Tailwind CSS v2.0+ */
import { MicrophoneIcon, ChatAltIcon, ArrowsExpandIcon } from '@heroicons/react/solid';
import { toggleChat, updateChat } from '@/app/features/chat/chatSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
export default function Example() {
  const dispatch = useAppDispatch();
  const pathName = usePathname()
  const {roomId} = useAppSelector((state) => state.room);
  return (
    <>
    {(roomId === "" || pathName === "/MainSession")?(null):(
    <div className={"fixed bottom-4 right-4 z-50  "}>
      <span className="relative z-0 inline-flex shadow-sm  px-3">
        <button
          type="button"
          className="relative inline-flex items-center px-2 py-2 bg-blue-500   text-sm font-medium text-gray-200 hover:bg-blue-400 focus:z-10 focus:outline-none  rounded-s-full"
        >
          <span className="sr-only">Previous</span>
          <MicrophoneIcon className="h-8 w-8 m-2" aria-hidden="true" />
        </button>
        <button
          onClick={() => dispatch(toggleChat())}
          type="button"
          className="-ml-px relative inline-flex items-center px-2 py-2 bg-blue-500 text-sm  font-medium text-yellow-400 hover:bg-blue-400 focus:z-10 focus:outline-none  border-l border-r-2 border-blue-600 "
        >
          <span className="sr-only">Next</span>
          <ChatAltIcon className="h-8 w-8 m-2" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="-ml-px relative inline-flex items-center px-2 py-2   text-sm   font-medium text-yellow-400 hover:bg-blue-400 focus:z-10 focus:outline-none  bg-blue-500 rounded-e-full"
        >
          <span className="sr-only">Next</span>
          <Link href='/MainSession'>
          <ArrowsExpandIcon className="h-8 w-8 m-2 " aria-hidden="true" />
          </Link>
        </button>
      </span>
    </div>
    )}
    </>
  );
}
