'use client';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
  XIcon,
} from '@heroicons/react/outline';
import { CheckIcon, ClockIcon } from '@heroicons/react/solid';
import Toggle from '../../components/Toggle';
import { useAppSelector } from '../hooks';
import { Product, User } from '../types';
import { Switch } from '@headlessui/react';
import { socket } from '../layout';
import Image from 'next/image';

/*// const products: Array<Product> = [
  {
    productId: '1',
    productName: 'Nomad Tumbler',
    // href: '#',
    price: 35.0,
    // color: 'White',
    // inStock: true,
    image:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
    // imageAlt: 'Insulated bottle with white base and black snap lid.',
    addedBy: 'sidd-r',
    contributors: [
      { userName: 'Faiz07', userId: '99' },
      { userName: 'sidd-r', userId: '109' },
    ],
    quantity: 4,
  },
  {
    productId: '2',
    productName: 'Basic Tee',
    // href: '#',
    price: 32.0,
    // color: 'Sienna',
    // inStock: true,
    // size: 'Large',
    image:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
    // imageAlt: "Front of men's Basic Tee in sienna.",
    addedBy: 'Faiz07',
    contributors: [{ userName: 'Faiz07', userId: '99' }],
    quantity: 1,
  },
  // More products...
];*/

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ShopCart() {
  const imageUrl =
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
  const [open, setOpen] = useState(false);
  const user = useAppSelector((state) => state.user);
  const { products, totalAmount, personalAmount } = useAppSelector(
    (state) => state.cart
  );
  const [contriModal, setContriModal] = useState(false);
  const [contributors, setContributors] = useState<Array<User>>([]);
  const [contributeAll, setContributeAll] = useState(false);

  useEffect(() => {
    if (contributeAll === true) socket.emit('contributeAll', user);
    else socket.emit('contributeAllOff', user);
  }, [contributeAll]);

  return (
    <div className="bg-white">
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto pt-16">
            <span className="flex justify-between">
              <span className="flex">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Mutual Cart{' '}
                </h1>
                <Image
                  src={require('../icons/Group.png')}
                  alt="logo"
                  className="w-32 h-10 mx-3"
                />
              </span>
              <span className="flex items-end">
                <h4 className="text-1xl font-light px-5">
                  Contribute to all items
                </h4>
                <Toggle
                  contributeAll={contributeAll}
                  setContributeAll={setContributeAll}
                />
              </span>
            </span>
            <span>
              <h4 className="text-1xl font-light">
                Items you and your group add are visible here!
              </h4>
            </span>
            <div className="mt-12">
              <section aria-labelledby="cart-heading">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                <ul
                  role="list"
                  className="border-t border-b border-gray-200 divide-y divide-gray-200"
                >
                  {products.map((product, productIdx) => (
                    <li key={product.productId} className="flex py-20 sm:py-10">
                      <div className="flex-shrink-0">
                        <img
                          src={product.image}
                          alt={'product image'}
                          className="w-2 h-2 rounded-lg object-center object-cover sm:w-16 sm:h-16"
                        />
                      </div>

                      <div className="relative ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                        <div>
                          <div className="flex justify-between sm:grid sm:grid-cols-2">
                            <div className="pr-6">
                              <h3 className="text-sm">
                                {/* <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800"> */}
                                {product.productName}
                                {/* </a> */}
                              </h3>
                              {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                              {/* {product.size ? <p className="mt-1 text-sm text-gray-500">{product.size}</p> : null} */}
                            </div>

                            <p className="text-sm font-medium text-gray-900 text-right">
                              ₹ {product.price}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center sm:block sm:absolute sm:top-0 sm:left-1/2 sm:mt-0">
                            <label
                              htmlFor={`quantity-${productIdx}`}
                              className="sr-only"
                            >
                              Quantity, {product.productName}
                            </label>
                            <select
                              id={`quantity-${productIdx}`}
                              name={`quantity-${productIdx}`}
                              value={product.quantity}
                              className="block max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                            </select>

                            <button
                              type="button"
                              className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
                            ></button>
                          </div>
                        </div>

                        <p className="mt-4 flex justify-between text-sm text-gray-700 space-x-2">
                          Added by {product.addedBy}
                          <span className="flex">
                            Contribute
                            <Switch
                              checked={
                                product.contributors.find(
                                  (contributor) =>
                                    contributor.userId === user.userId
                                )
                                  ? true
                                  : false
                              }
                              onChange={() => {
                                if (
                                  product.contributors.find(
                                    (contributor) =>
                                      contributor.userId === user.userId
                                  )
                                ) {
                                  // remove user from contributors
                                  socket.emit(
                                    'contributeOff',
                                    product.productId,
                                    user
                                  );
                                } else {
                                  // add user to contributors
                                  socket.emit(
                                    'contributeOn',
                                    product.productId,
                                    user
                                  );
                                }
                              }}
                              className="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-5"
                            >
                              <span className="sr-only">Use setting</span>
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute bg-white w-full h-full rounded-md"
                              />
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  product.contributors.find(
                                    (contributor) =>
                                      contributor.userId === user.userId
                                  )
                                    ? 'bg-blue-500'
                                    : 'bg-yellow-300',
                                  'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'
                                )}
                              />
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  product.contributors.find(
                                    (contributor) =>
                                      contributor.userId === user.userId
                                  )
                                    ? 'translate-x-5'
                                    : 'translate-x-0',
                                  'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'
                                )}
                              />
                            </Switch>
                          </span>
                        </p>
                        <button
                          className="my-1 text-blue-500 text-xs w-1/6 px-3 bg-yellow-300 border border-transparent rounded-md shadow-sm  text-base text-white hover:bg-yellow-400  "
                          onClick={() => {
                            setContributors(product.contributors);
                            setContriModal(true);
                          }}
                        >
                          Contributors
                        </button>
                        {contriModal ? (
                          <>
                            <div className="flex overflow-x-hidden overflow-y-auto fixed inset-0 ">
                              <div className="relative w-auto my-5 mx-auto  max-w-3xl">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-64 bg-white outline-none focus:outline-none">
                                  <div className='flex justify-between mx-2 my-1'>
                                    <span>Contributors</span>
                                    <button onClick={() => setContriModal(false)}>X</button>
                                  </div>
                                  <div className="flex p-6 border-t border-solid border-blueGray-200 rounded-b ">
                                    <div className="flow-root">
                                      <ul role="list" className="-my-5 divide-y divide-gray-200">
                                        {product.contributors.map((person, i) => (
                                          <li key={i} className="py-4">
                                            <div className="flex  space-x-4">
                                              <div className="flex-shrink-0">
                                                <img className="h-8 w-8 rounded-full" src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{person.userName}</p>
                                              </div>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
              {contriModal ? (
                <>
                  <div className="flex overflow-x-hidden overflow-y-auto fixed inset-0  ">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex justify-between mx-5 my-2">
                          <span>Contributors</span>
                          <button onClick={() => setContriModal(false)}>
                            X
                          </button>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <div className="flow-root mt-6">
                            <ul
                              role="list"
                              className="-my-5 divide-y divide-gray-200"
                            >
                              {contributors.length > 0
                                ? contributors.map((person, i) => (
                                    <li key={i} className="py-4">
                                      <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                          <img
                                            className="h-8 w-8 rounded-full"
                                            src={imageUrl}
                                            alt=""
                                          />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-sm font-medium text-gray-900 truncate">
                                            {person.userName}
                                          </p>
                                        </div>
                                      </div>
                                    </li>
                                  ))
                                : 'No contributors'}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-10 sm:ml-6 sm:pl-6"
              >
                <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                  <div className="flow-root">
                    <dl className="-my-4 text-sm divide-y divide-gray-200">
                      <div className="py-4 flex items-center justify-between">
                        <dt className="text-base font-medium text-gray-900">
                          Common total
                        </dt>
                        <dd className="text-base font-medium text-gray-900">
                          ₹ {totalAmount}
                        </dd>
                      </div>
                      <div className="py-4 flex items-center justify-between">
                        <dt className="text-base font-medium text-gray-900">
                          Your total
                        </dt>
                        <dd className="text-base font-medium text-gray-900">
                          ₹ {personalAmount}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="mt-10">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  >
                    Checkout
                  </button>
                </div>

                <div className="mt-6 text-sm text-center text-gray-500">
                  <p>
                    or{' '}
                    <a
                      href="#"
                      className="text-indigo-600 font-medium hover:text-indigo-500"
                    >
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Policy grid */}
      </main>
    </div>
  );
}
