import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import logo from '../../public/logo.svg'
import dice from '../../public/dice.svg'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div>
      <Image src={logo} alt="logo" width="75vw" className='center' />
      <Image src={dice} alt="dice" width="75vw" classname='center'/>
      <h1 className='text-3xl font-bold text text-blue-300'>Yahtzee! Online</h1>
      <a href="http://localhost:3000/game/1" className="bg-blue-500 hover:bg-blue-400 text-white button font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
        Play Game
      </a>
    </div>
    </>
  )
}
