"use client"
import Image from 'next/image'
import React from 'react'
import Foto2 from '../../../public/assets/Foto2.png'
import { useRouter } from 'next/navigation'


const Presentation = () => {
  const router = useRouter()

  const handleLogin = () => {
    router.push('/login')
  }

  const handleCollections = () => {

  }


  return (
    <section className='w-full h-[500px] flex justify-center items-center flex-row'>
      <div className='w-full flex flex-col justify-center items-center gap-6'>
        <div className='w-10/12 h-full justify-center items-center flex flex-col gap-3'>
          <h1 className=' w-full text-center font-semibold text-6xl'>¡Bienvenido a Courbet!</h1>
          <h3 className='w-8/12 text-center text-2xl font-medium leading-normal'>Disfruta de la experiencia de visitar museos desde la comodidad de tu casa</h3>
        </div>
        <div className='w-full h-[60px] justify-center items-center flex flex-row gap-14'>
          <button onClick={handleCollections} className='w-[180px] h-full rounded-full bg-black'>
            <h1 className='text-xl text-white'>Colecciones</h1>
          </button>
          <button onClick={handleLogin} className='w-[180px] h-full border-4 rounded-full'>
            <h1 className='text-xl font-semibold'>Log in</h1>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Presentation