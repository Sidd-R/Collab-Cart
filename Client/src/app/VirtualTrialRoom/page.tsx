"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import { useAppDispatch, useAppSelector } from '../hooks';
import { socket } from '../layout';
import { createRoom, joinRoom, updateRoom } from '../features/room/roomSlice';
import { useRouter } from 'next/navigation';
import { updateCart } from '../features/cart/cartSlice';

export default function Example() {
  const [open, setOpen] = useState<boolean>(true);
  

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const cancelButtonRef = useRef(null);

  

  return (
    <div className="bg-white">
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <img
                    src="https://media.istockphoto.com/id/1309878971/vector/young-woman-trying-clothes-using-augmented-reality-shopping-app-ar-shopping-concept-vector.jpg?s=612x612&w=0&k=20&c=p52-eW7hME4IkV3wrFu2ivoklaJgAEXOl7h0gYFmY8U="
                    className="w-30 h-20 mx-48"
                  />
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Virtual TRY ON
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Welcome to Virtual Try ON! Upload a clear image of yourself to get a trial!
                        Below is an example
                      </p>
                    </div>
                    <div className='flex mx-10 my-5'>
                    <Image
                  src={require('../icons/Example.png')}
                  alt="logo"
                  className="w-80 h-32 mx-3"
                />
                </div>
                <h4 className='text-black my-5'>Add an image to try on your self! </h4>
                    <form>
                        <label  className="drop-container" id="dropcontainer">
  <input type="file" id="images" accept="image/*" />
</label>
<Link href='/TryItemOn'>
<span className='text-white bg-blue-500 mx-2 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"'>Submit</span>
</Link>
                    </form>
                  </div>
                </div>
                </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}