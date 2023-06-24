'use client'
import Link from 'next/link'
import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { VscSignOut } from 'react-icons/vsc';
import { VscSignIn } from 'react-icons/vsc';

export interface IHeaderProps { }

const Header = (props: IHeaderProps) => {
  const { data: sessionData, status } = useSession()
  const nombre = sessionData?.user ? sessionData.user.name : ''
  const router = useRouter()

  const handleLogIn = () => {
    router.push('/login')
  }

  const DataNav = [
    {
      id: 1,
      title: 'Home',
    },
    {
      id: 2,
      title: 'About',
    },
    {
      id: 3,
      title: 'Contact',
    },
    {
      id: 4,
      title: 'Museums',
    }
  ]


  return (
    <header className='w-full h-24 bg-navColor flex flex-row justify-center items-center'>
      <nav className='w-full h-full flex flex-row justify-center items-center gap-16'>
        <ul className='w-full h-full flex flex-row gap-5 justify-evenly items-center p-16'>
          {sessionData?.user ? (
            <h2 className='text-xl font-medium text-white'>Hi {nombre}</h2>
          ) : (
            <h2 className='text-xl font-medium text-white'>Hi Guest</h2>
          )}
          {DataNav.map(({ id, title }) =>
            <li key={id} className=''>
              <Link
                className='text-xl font-medium text-white'
                href={"#"}
              >
                {title}
              </Link>
              <div className=''></div>
            </li>
          )}
          {sessionData?.user ? (
            <div className='flex flex-row gap-6'>
              <button onClick={() => signOut()}><VscSignOut className="w-12 h-12 text-white" /></button>
            </div>
          ) : (
            <button onClick={handleLogIn}><VscSignIn className="w-12 h-12 text-white" /></button>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header