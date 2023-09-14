import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import '../start/styles/line.css'
import { signOut, useSession } from 'next-auth/react';
import { StateContext } from '@/context/StateContext';
import '@/app/globals.css'
import { CldImage } from 'next-cloudinary';
import Image from 'next/image'
import LogOut from '../../../../../public/assets/icons/LogOut.png'



const NavLanding = () => {
  const { data: sessionData } = useSession()
  const nombre = sessionData?.user ? sessionData.user.name : ''

  const { setSelectedMenu } = useContext(StateContext);

  const DataNav = [
    {
      id: 1,
      title: 'Inicio',
    },
    {
      id: 2,
      title: 'Colecciones',

    },
    {
      id: 3,
      title: 'Eventos',

    },
    {
      id: 4,
      title: 'Ayuda',
    },
  ]

  const router = useRouter()

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <nav className=' w-full h-[60px] navbar flex justify-center items-center p-6 flex-row bg-navColor fixed z-10'>
      <ul className='w-full h-full flex flex-row items-center justify-between nav-ul '>
        <div>
          <CldImage src={'Logo_Blanco'} width={50} height={50} alt='logo'></CldImage>
        </div>
        {DataNav.map(({ id, title }) =>
          <li className=' list-none text-center flex flex-col justify-center items-center mt-1' key={id}>
            <button
              id='MyLink'
              className='navElements font-normal text-white link '
              onClick={() => router.push(`/${title}`)}
            >
              {title}
            </button>
            <div className='line'></div>
          </li>
        )}
        {sessionData?.user ? (
          <button onClick={() => signOut()} className=''>
            <Image
              className='w-7 h-8'
              src={LogOut}
              alt='LogOut'
              height={400}
              width={400}></Image>
          </button>
        ) : (
          <button onClick={handleLogin} className='w-24 h-12 rounded-full text-black hover:scale-95 bg-white  transition'>
            <h1 className='text-[18px] font-bold navElements'>Log in</h1>
          </button>
        )
        }
      </ul>
    </nav>
  )
}

export default NavLanding