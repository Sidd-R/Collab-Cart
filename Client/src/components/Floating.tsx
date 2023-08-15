/* This example requires Tailwind CSS v2.0+ */
import { MicrophoneIcon, ChatAltIcon, ArrowsExpandIcon } from '@heroicons/react/solid';

export default function Example() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <span className="relative z-0 inline-flex shadow-sm rounded-md">
        <button
          type="button"
          className="relative inline-flex items-center px-2 py-2 rounded-l-md bg-blue-500 text-sm font-medium text-yellow-400 hover:bg-blue-400 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <span className="sr-only">Previous</span>
          <MicrophoneIcon className="h-10 w-10" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="-ml-px relative inline-flex items-center px-2 py-2 bg-blue-500 text-sm font-medium text-yellow-400 hover:bg-blue-400 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <span className="sr-only">Next</span>
          <ChatAltIcon className="h-10 w-10" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md bg-blue-500 text-sm font-medium text-yellow-400 hover:bg-blue-400 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <span className="sr-only">Next</span>
          <ArrowsExpandIcon className="h-10 w-10" aria-hidden="true" />
        </button>
      </span>
    </div>
  );
}
