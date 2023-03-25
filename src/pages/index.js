import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import logo from '../../public/logo.svg'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div>
      <Image src={logo} alt="logo" width="75vw" className='center' />
      <h1 className='text-3xl font-bold underline center'>Yahtzee! Online</h1>
    </div>
    </>
  )
}
