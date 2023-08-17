import Image from "next/image";
import { socket } from '@/app/layout';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
export default function ShopCart() {
    let load=1
    let i=0
    return(
        <div>
        {load?
        (<div className="items-center justify-center ">
        <div className="flex items-center mt-16 mx-32 justify-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Virtual Fitting</h1>
        </div>
        <div className="flex mt-8 justify-center">
        <Image
                  src={require("../icons/TriedImage.jpg")}
                  alt="logo"
                  className="contain h-auto w-48 justify-center"
                />
                </div>
                </div>) : null //delay loop
}
                </div>
    )
}