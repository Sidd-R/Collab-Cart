"use client";
import Link from "next/link";
import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import SignalIcon from "../app/icons/SignalIcon";
import { useAppSelector } from "@/app/hooks";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Home",
      href: "/",
    },
    {
      id: "men",
      name: "products",
      href: '/ProductList'
     
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ openModal }: { openModal: () => void }) => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const {roomId} = useAppSelector((state) => state.room);
  const {length} = useAppSelector((state) => state.cart.products);
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
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
            <div className="relative max-w-xs w-full bg-blue-500 text-yellow shadow-xl pb-12 flex flex-col overflow-y-auto" style={{paddingTop: 20}}>
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-yellow-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                {user.userId==="" && user.userName=="" && (
                  <div className="border-t border-b border-gray-200 py-6 px-4 space-y-6">
                  <div className="flow-root">
                    <a
                      onClick={()=>{
                        setOpen(false);
                        openModal();
                      }}
                      className="-m-2 p-2 block font-medium text-white"
                    >
                      Sign in
                    </a>
                  </div>
                </div>
                )}
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "text-indigo-600 border-indigo-600"
                              : "text-white border-transparent",
                            "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                {/* <Tab.Panels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <Tab.Panel
                      key={category.name}
                      className="pt-10 pb-8 px-4 space-y-10"
                    >
                      <div className="grid grid-cols-2 gap-x-4">
                        {category.featured.map((item) => (
                          <div
                            key={item.name}
                            className="group relative text-sm"
                          >
                            <div className="aspect-w-1 aspect-h-1 rounded-lg bg-blue-500 overflow-hidden group-hover:opacity-75">
                              <img
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                className="object-center object-cover"
                              />
                            </div>
                            <a
                              href={item.href}
                              className="mt-6 block font-medium text-white"
                            >
                              <span
                                className="absolute z-10 inset-0"
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                        ))}
                      </div>
                      {category.sections.map((section) => (
                        <div key={section.name}>
                          <p
                            id={`${category.id}-${section.id}-heading-mobile`}
                            className="font-medium text-white"
                          >
                            {section.name}
                          </p>
                          <ul
                            role="list"
                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {section.items.map((item) => (
                              <li key={item.name} className="flow-root">
                                <a
                                  href={item.href}
                                  className="-m-2 p-2 block text-gray-200"
                                >
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </Tab.Panel>
                  ))}
                </Tab.Panels> */}
              </Tab.Group>

              {/* <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a
                      href={page.href}
                      className="-m-2 p-2 block font-medium text-white"
                    >
                      {page.name}kkk
                    </a>
                  </div>
                ))}
              </div> */}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-blue-500">
        <nav
          aria-label="Top"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div>
            <div className="h-16 flex items-center">
              {/* <button
                type="button"
                className="bg-blue-500 p-2 rounded-md text-yellow-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button> */}

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="  ml-8 lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Link
                            href={category.href}
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-white hover:text-orange-200",
                                "relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
                              )}
                            >
                              {category.name}
                            </Link>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-200">
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="max-w-7xl mx-auto px-8">
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {/* {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-center object-cover"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-white"
                                          >
                                            <span
                                              className="absolute z-10 inset-0"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))} */}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                      {/* {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-white"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <a
                                                  href={item.href}
                                                  className="hover:text-orange-200"
                                                >
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))} */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-white hover:text-orange-200"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {user.userId === "" && user.userName === "" && (
                  <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <a
                      onClick={openModal}
                      className="text-sm font-medium text-white hover:text-orange-200"
                    >
                      Sign in
                    </a>
                  </div>
                )}

                  <>
                    <div className="flex lg:ml-6">
                      <Link
                            href={'/ProductList'}
                        className="p-2 text-yellow-400 hover:text-gray-200"
                      >
                        <span className="sr-only">Room</span>
                        <SearchIcon className="w-6 h-6" aria-hidden="true" />
                      </Link>
                    </div>

                    <div className="flex lg:ml-6">
                      <Link
                            href={roomId === '' ? '/session': '/MainSession'}
                        className="p-2 text-yellow-400 hover:text-gray-200"
                      >
                        <span className="sr-only">Search</span>
                        <SignalIcon aria-hidden="true" />
                      </Link>
                    </div>

                    <div className="ml-2 flow-root lg:ml-6">
                      <Link
                        href="/ShopCart"
                        className="group -m-2 p-2 flex items-center"
                      >
                        <ShoppingBagIcon
                          className="flex-shrink-0 h-6 w-6 text-yellow-400 group-hover:text-gray-200"
                          aria-hidden="true"
                        />
                        {length > 0?<span className="ml-2 text-xs font-semibold text-yellow-500 group-hover:text-orange-200 bg-white bg-opacity-950 rounded-full h-4 w-4 text-center -ml-3 mt-6">
                          {length}
                        </span>:null}
                        <span className="sr-only">items in cart, view bag</span>
                      </Link>
                    </div>
                  </>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
