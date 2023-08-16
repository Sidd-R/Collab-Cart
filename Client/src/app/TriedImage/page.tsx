"use Client";
import Image from "next/image";
import {useState} from 'react'
export default function ShopCart() {
    const [load,setLoad]=useState(true)
    let i=0
    return(
        <div>
        {load?
        (<div className="items-center justify-center ">
        <div className="flex items-center mt-16 mx-32 justify-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Virtual Fitting</h1>
        </div>
        <div className="flex mt-8 justify-center">
        <img
                  src="https://media.istockphoto.com/id/1185028107/photo/young-laughing-woman-standing-with-hands-in-pockets-wearing-blank-white-t-shirt-with-copy.jpg?s=612x612&w=0&k=20&c=u32Y6c-VfpL5HOdoRs2WLwp9zFDbGRo4inuRRdnnHKU="
                  alt="logo"
                  className="w-96 h-64  justify-center"
                />
                </div>
                <div className=" flex justify-center">
                <span className='text-white bg-blue-500 active:bg-yellow-700 font-bold uppercase text-sm mt-8 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"'>Share in Session</span>
                </div>
                </div>) : null //delay loop
}
                </div>
    )
}