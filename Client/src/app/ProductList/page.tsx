"use client";
import { StarIcon } from '@heroicons/react/solid'

const products = [
  {
    id: 1,
    name: 'ZipToe Basket',
    price: '$149',
    rating: 5,
    reviewCount: 38,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
    imageAlt: 'TrendyBag',
    href: '/Product',
  },
  {
    id: 2,
    name: 'White Black Ziptoe Basket',
    price: '$134',
    rating: 5,
    reviewCount: 18,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 3,
    name: 'Gray Blue Leather Bag',
    price: '$175',
    rating: 5,
    reviewCount: 14,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-02.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 4,
    name: 'Nude Leather Modern Bag',
    price: '$187',
    rating: 4,
    reviewCount: 21,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-03.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  // More products...
]

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <div className="bg-white">
        <h1 className='text-xl font-medium text-gray-900 mt-8 mx-8'>Trending Bags</h1>
      <div className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8 mt-4">
        <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="group relative p-4 border-r border-b border-gray-200 sm:p-6">
              <div className="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="pt-10 pb-4 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <div className="mt-3 flex flex-col items-center">
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                          'flex-shrink-0 h-5 w-5'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{product.reviewCount} reviews</p>
                </div>
                <p className="mt-4 text-base font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
