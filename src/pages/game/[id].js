import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useEffect} from 'react'
import Script from 'next/script'
import io from 'socket.io-client'
let socket
let message
const inter = Inter({ subsets: ['latin'] })

export default function Game() {
  const router = useRouter()
  const { id } = router.query

  useEffect(() => { socketInitializer(); }, [])

  const socketInitializer = async () => {
    let res = await fetch('/api/game_manager');
    socket = io();

    socket.on('connect', () => {
        message = "connected!"
      console.log('connected');
    });
  }

  return (
    <>
    <h1 className='font-sans'>Game Page ID: {id}</h1>
    <div className='center' style={{height:"75vw"}}>
      <button className='rounded-md border-2 border-indigo-500/75'>Roll</button>
      <table align='right' className='table-auto border-collapse border border-slate-500 ...'>
        <thead>
            <tr>
                <th className='border border-slate-600 ...'></th>
                <th className='border border-slate-600 ...'>Player 1</th>
                <th className='border border-slate-600 ...'>Player 2</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th className='border border-slate-600 ...'>Ones</th>
                <td className='border border-slate-600 ...'>12</td>
                <td className='border border-slate-600 ...'>0</td>
            </tr>
            <tr>
                <th className='border border-slate-600 ...'>Twos</th>
            </tr>
            <tr>
                <th className='border border-slate-600 ...'>Threes</th>
            </tr>
            <tr>
                <th className='border border-slate-600 ...'>Fours</th>
            </tr>
            <tr>
                <th className='border border-slate-600 ...'>Fives</th>
            </tr>
            <tr>
                <th className='border border-slate-600 ...'>Sixes</th>
            </tr>
            <tr>
                <th className='border border-slate-600 ...'>Sum</th>
            </tr>
            <tr>
                <th className='border border-slate-600 ...'>Bonus</th>
            </tr>
        </tbody>
      </table>
    </div>
    </>
  )
}
