"use client";
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    CalendarIcon,
    ChartBarIcon,
    ChatIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    MenuIcon,
    ShoppingBagIcon,
    SwitchVerticalIcon,
    UsersIcon,
    XIcon,
} from '@heroicons/react/outline'
import { useAppDispatch, useAppSelector } from '../hooks';
import Image from 'next/image';
import { socket } from '../layout';
import { updateRoom } from '../features/room/roomSlice';
import { updateCart } from '../features/cart/cartSlice';

const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Room Members', href: '#', icon: UsersIcon, current: false },
    { name: 'Chat', href: '#', icon: ChatIcon, current: false },
    { name: 'Mutual Cart', href: '#', icon: ShoppingBagIcon, current: false },
    { name: 'Virtual Trial Room', href: '#', icon: SwitchVerticalIcon, current: false },
    { name: 'Poll', href: '#', icon: ChartBarIcon, current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const people = [
    {
        name: 'Faiz',
        id: 1,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
    {
        name: 'Siddhant',
        id: 2,
        imageUrl:
            'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
]

const imageUrl = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

export default function Example() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const dispatch = useAppDispatch()
    const {admin,users} = useAppSelector(state => state.room);

    // const {users} = useAppSelector(state => state.room)
    // socket.on('updateRoom' , (room) => {
    //     console.log("why not wprl");    
        
    //   dispatch(updateRoom(room))
    //   console.log(users,room);
      
    // })

    // socket.on('updateCart' , (cart) => {
    //     dispatch(updateCart(cart))
    //     console.log('update cart');
        
    // })


    return (
        <>
            <div >
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-blue-600 bg-opacity-75" />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-blue-600">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                                    <nav className="mt-5 px-2 space-y-1">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                )}
                                            >
                                                <item.icon
                                                    className={classNames(
                                                        item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                                        'mr-4 flex-shrink-0 h-6 w-6'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                                <div className="flex-shrink-0 flex bg-gray-100 p-4">
                                    <a href="#" className="flex-shrink-0 group block">
                                        <div className="flex items-center">
                                            <div>
                                                <img
                                                    className="inline-block h-10 w-10 rounded-full"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                            </div>

                                        </div>
                                    </a>
                                </div>
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 mt-16">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex-1 flex flex-col min-h-0 bg-blue-700">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <nav className="mt-5 flex-1 px-2 space-y-1">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-blue-500 text-white' : 'text-yellow-300 hover:bg-blue-500 hover:text-whitw',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                                'mr-3 flex-shrink-0 h-6 w-6'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="md:pl-64 flex flex-col flex-1">
                    <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
                        <button
                            type="button"
                            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <main className="flex-1 bg-gray-200 h-600">
                        <div className="py-4 h-full">
                            <div className="flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <h1 className="flex text-4xl font-semibold text-gray-900 items-center ">Virtual Shopping Room</h1>
                            </div>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                                <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-12">
                                        <ul role="list" className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
                                            {users.map((person) => (
                                                <li key={person.userId} className="py-10 px-4 bg-white text-center rounded-lg xl:px-2 ">
                                                    <div className="space-y-6 xl:space-y-5">
                                                        <span>Mic</span>
                                                        <img className="mx-auto h-20 w-20 rounded-full xl:w-40 xl:h-40" src={imageUrl} alt="" />
                                                        <div className="font-medium text-lg leading-6 space-y-1">
                                                            <h3 className="text-blue-500 mx-auto">{person.userName}</h3>
                                                        </div>
                                                        {person.userId === admin.userId ? <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">Admin</span> : <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">User</span>}
                                                        {/* <span></span> */}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                </div>
                                {/* Replace with your content */}
                                <div className="">
                  <span className='flex' style={{ marginLeft: 300 }}>
                  <Image  src={require('../icons/MicImage.png')} className='w-30 h-15 mx-5' alt='mic'/>
                  <Image  src={require('../icons/EndIcon.png')} className='w-30 h-15 mx-5' alt='end'/>
                  <Image  src={require('../icons/AddIcon.png')} className='w-30 h-15 mx-5' alt='add'/>
                  </span>
                </div>

                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
