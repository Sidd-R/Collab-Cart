/* This example requires Tailwind CSS v2.0+ */
'use client';
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
  const [roomId, setRoomId] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(false);

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const cancelButtonRef = useRef(null);

  const create = () => {
    socket.connect();
    socket.emit('createRoom', user, (roomId1: string) => {
      dispatch(createRoom({ roomId1 }));
      setRoomId(roomId1);
      setSubmit(true);
    });
  };

  const join = () => {
    console.log("hello");
    
    socket.connect();
    socket.emit('joinRoom', user, roomId);
    dispatch(joinRoom(roomId));
    setRoomId('');
    setOpen(false);
  };

  useEffect(() => {
    if (open == false) router.push('/MainSession');
  
  }, [open])

  socket.on('updateRoom' , (room) => {
    console.log("why not wprl");    
    
    dispatch(updateRoom(room))
    // console.log(users,room);
    
  })

  socket.on('updateCart' , (cart) => {
      dispatch(updateCart({cart,userId:user.userId}))
      console.log('update cart');
      
  })
  

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
                    src="https://www.pngarts.com/files/7/Virtual-Meeting-Transparent-Images.png"
                    className="w-30 h-20 mx-48"
                  />
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Shopping Virtual Rooms
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Welcome to virtual Rooms! Now get the offline shopping
                        experience online! Create your own virtual room or join
                        one!!
                      </p>
                    </div>
                  </div>
                </div>
                {!submit ? (
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    {roomId === '' ? (
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                        onClick={create}
                      >
                        Create Room
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                        onClick={join}
                      >
                        Join Room
                      </button>
                    )}
                    <input
                      type="text"
                      className="px-2"
                      placeholder="Enter Room Code"
                      onChange={(e) => setRoomId(e.target.value)}
                      value={roomId}
                    />
                  </div>
                ) : (
                  <div className='text-center mt-5 mb-2 '>
                    <span>
                    Room Code:
                    </span>
                    <span className='bg-gray-100 p-3 ml-3 leading-4  rounded-s-md'>
                     {roomId}
                    </span>
                    <button className='bg-gray-200 p-3 leading-5 rounded-e-md border-s-2 border-gray-300 hover:bg-gray-300 transition-all duration-200' onClick={() => {navigator.clipboard.writeText(roomId);}}
>
                      copy
                    </button>
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
