import * as React from "react";
import { productList } from "@/constants/productList";
import Link from "next/link";

type BubbleProps = {
  username?: string;
  value: string;
  isYou?: boolean;
  type: "product" | "message" | 'tryOn';
};

const Bubble: React.FC<BubbleProps> = ({ username, value, isYou, type }) => {
  const product = productList.find((product) => product.id === value);
  return (
    <>
      {type === "product" ? (
        <>
          {isYou ? (
            <div className="flex justify-end my-2">
              {product && (
                <div className="flex justify-end">
                  <Link href={`/ProductList/${product.id}`}>
                    <div key={product.id} className="p-1 w-[80%] bg-blue-200">
                      <div className="flex items-center sm:items-start">
                        <div className="flex-shrink-0 w-20 h-20 bg-blue-200 rounded-lg overflow-hidden sm:w-40 sm:h-40">
                          <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="flex-1 ml-6 text-sm">
                          <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                            <h5>{product.name}</h5>
                            <p className="mt-2 sm:mt-0">
                              Price: {product.price}
                            </p>
                          </div>
                          <p className="hidden text-gray-500 sm:block sm:mt-2 overflow-hidden max-h-[3em]">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h6 className="text-xs font-semibold mb-1 text-gray-500">
                {username}
              </h6>
              <div className="flex justify-start my-2">
                {product && (
                  <>
                    <Link href={`/ProductList/${product.id}`}>
                      <div
                        key={product.id}
                        className="p-0 w-[80%] bg-slate-100"
                      >
                        <div className="flex items-center sm:items-start">
                          <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden sm:w-40 sm:h-40">
                            <img
                              src={product.imageSrc}
                              alt={product.imageAlt}
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="flex-1 ml-6 text-sm">
                            <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                              <h5>{product.name}</h5>
                              <p className="mt-2 sm:mt-0">{product.price}</p>
                            </div>
                            <p className="hidden text-gray-500 sm:block sm:mt-2 overflow-hidden max-h-[3em]">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {isYou ? (
            <div className="flex justify-end">
              <div className="max-w-[70%] bg-blue-500 text-white rounded-lg p-2 mb-2 text-sm">
                {value}
              </div>
            </div>
          ) : (
            <div className="flex justify-start">
              <div className="flex flex-col max-w-[70%]">
                <h6 className="text-xs font-semibold mb-1 text-gray-500">
                  {username}
                </h6>
                <div className="bg-gray-200 text-gray-800 rounded-lg p-3 mb-2 text-sm">
                  <p>{value}</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Bubble;
