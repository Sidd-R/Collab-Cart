'use client'
import './globals.css'
import {useState} from 'react'
import UserModal from '../components/Modal'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import Floating from '../components/Floating'
import {addUser} from './features/user/userSlice'
import {Provider} from 'react-redux'
import {store} from './store'
import { io } from 'socket.io-client'
import ChatBox from '@/components/chat/ChatBox'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  
}

export const socket = io('http://localhost:5000',
{autoConnect: false, }
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
        <div className='min-h-[65vh] w-full  pt-10  font-primary'>
            <div className='relative mb-8 flex h-8 w-full max-w-[800px] items-center justify-between text-center'>
              <ChatBox
                // className='right-3 w-[calc(100%+0.5rem)] sm:right-2'
                // label='public chat'
              />
            </div>


          <Navbar openModal={() => setIsModalOpen(true)} />
          <Floating/>
          {children}
          <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
        </Provider>
      </body>
    </html>
  )
}
