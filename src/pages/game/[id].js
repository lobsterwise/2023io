import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useEffect, useState} from 'react'
import Script from 'next/script'
import { io } from 'socket.io-client'

const inter = Inter({ subsets: ['latin'] })
let socket;
let count = 0;
const amountOfDice = 5;

export default function Game() {
  const router = useRouter()
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [gameText, setGameText] = useState("Finding Match...");
  const [tableValues, setTableValues] = useState([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, 0])
  const [dieValues, setDieValues] = useState(["", "", "", "", ""]);
  const { id } = router.query
  socket = io();

  useEffect(() => { initEvents(); })
  useEffect(() => {
    if (count < 1) {
      let result = prompt("Enter Username:")
      setPlayer1Name(result)
      setName(result)
      count++;
    }
  }, [])

  const initEvents = async () => {
    // Get the socket
    await fetch("http://localhost:3000/api/game_manager");
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('player-connect', () => {
      console.log("A player has connected to the session");
    });

    socket.on('player-join', name => {
      console.log("Player " + name + " has joined!");
    });

    socket.on('both-players', (firstPlayer, secondPlayer) => {
      console.log(`Name1: ${firstPlayer}, Name2: ${secondPlayer}`)
      if(name === firstPlayer) {
        setPlayer1Name(firstPlayer)
        setPlayer2Name(secondPlayer)
      } if(name === secondPlayer) {
        setPlayer1Name(secondPlayer)
        setPlayer2Name(firstPlayer)
      }
      setGameText(`Playing against: ${player2Name}`)
    });

    socket.on('update-score', (player, fields, leftSideBonus, yahtzeeBonus, total) => {
      if(player == 0) {
        tableValues[0] = fields.ones
        tableValues[1] = fields.twos
        tableValues[2] = fields.threes
        tableValues[3] = fields.fours
        tableValues[4] = fields.fours
      } if (player == 1) {

      }
    });

    socket.on('update-dice', (player, values, held) => {
      if (player === 0) {
        for (let i = 0; i < values.length; i++) {
          console.log("Die " + values[i]);
          if (values[i] === null) {
            dieValues[i] = "";
          }
          dieValues[i] = toString(values[i]);
        }
      }
    });
  }
  const handleRoll = () => {
    socket.emit('roll', player1Name);
  } 

  const setName = (name) => {
    socket.emit('player-join', name);
  } 

  return (
    <>
    <h1 style={{textAlign:"center", paddingBottom:"2vw",paddingTop:"2vw"}} className='text-4xl font-sans text-white center'>{gameText}</h1>
    <div className='center bg-slate-800 text-white' style={{width:"75vw",height:"80vh"}}>
      <table style={{width:"auto",position:"absolute",top:"70%",left:"32.5%"}} lassName='table-auto border-collapse border border-slate-500  ...'>
        <tbody>
        <tr>
          <td style={{textAlign:"center",padding:"2vh 2vw 2vh 2vw"}} className='border border-slate-300'>{dieValues[0]}</td>
          <td style={{textAlign:"center",padding:"2vh 2vw 2vh 2vw"}} className='border border-slate-300'>{dieValues[1]}</td>
          <td style={{textAlign:"center",padding:"2vh 2vw 2vh 2vw"}} className='border border-slate-300'>{dieValues[2]}</td>
          <td style={{textAlign:"center",padding:"2vh 2vw 2vh 2vw"}} className='border border-slate-300'>{dieValues[3]}</td>
          <td style={{textAlign:"center",padding:"2vh 2vw 2vh 2vw"}} className='border border-slate-300'>{dieValues[4]}</td>
        </tr>
        </tbody>
      </table>
      <button onClick={handleRoll} style={{padding:"1vw 3vw 1vw 3vw",position:"absolute",top:"85%",left:"40%"}} className='rounded-md border-2 border-indigo-500/75 text-white hover:rounded-full border-dashed'>Roll</button>
      <table align='right' style={{height:"100%"}} className='table-auto border-collapse border border-slate-500 ...'>
        <thead>
            <tr>
                <th style={{textAlign:'left'}} className='border border-slate-600 ...'></th>
                <th style={{textAlign:'center'}} className='border border-slate-600 ...'>{player1Name}</th>
                <th style={{textAlign:'center'}} className='border border-slate-600 ...'>{player2Name}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th style={{textAlign:'left'}} className='border border-slate-600 ...'>Ones</th>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[0]}</td>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[13]}</td>
            </tr>
            <tr>
                <th style={{textAlign:'left'}} className='border border-slate-600 ...'>Twos</th>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[1]}</td>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[14]}</td>
            </tr>
            <tr>
                <th style={{textAlign:'left'}} className='border border-slate-600 ...'>Threes</th>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[2]}</td>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[15]}</td>
            </tr>
            <tr>
                <th style={{textAlign:'left'}} className='border border-slate-600 ...'>Fours</th>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[3]}</td>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[16]}</td>
            </tr>
            <tr>
                <th style={{textAlign:'left'}} className='border border-slate-600 ...'>Fives</th>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[4]}</td>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[17]}</td>
            </tr>
            <tr>
                <th style={{textAlign:'left'}} className='border border-slate-600 ...'>Sixes</th>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[5]}</td>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[18]}</td>
            </tr>
            <tr>
                <th style={{textAlign:'left'}} className='border border-slate-700 border-4 ...'>Sum</th>
                <td style={{textAlign:'center'}} className='border border-slate-700 border-4 ...'>{tableValues[0] + tableValues[1] + tableValues[2] + tableValues[3] + tableValues[4] + tableValues[5]}</td>
                <td style={{textAlign:'center'}} className='border border-slate-700 border-4 ...'>{tableValues[13] + tableValues[14] + tableValues[15] + tableValues[16] + tableValues[17] + tableValues[18]}</td>
            </tr>
            <tr>
                <th style={{textAlign:'left'}} className='border border-slate-600 ...'>Bonus</th>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[6]}</td>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[19]}</td>
            </tr>
            <tr>
                <th style={{textAlign:'left'}} className='border border-slate-600 ...'>Three of a kind</th>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[7]}</td>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[20]}</td>
            </tr>
            <tr>
                <th style={{textAlign:'left'}} className='border border-slate-600 ...'>Four of a kind</th>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[8]}</td>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[21]}</td>
            </tr>
            <tr>
                <th style={{textAlign:'left'}} className='border border-slate-600 ...'>Full House</th>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[9]}</td>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[22]}</td>
            </tr>
            <tr>
                <th style={{textAlign:'left'}} className='border border-slate-600 ...'>Large Straight</th>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[10]}</td>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[23]}</td>
            </tr>
            <tr>
                <th style={{textAlign:'left'}} className='border border-slate-600 ...'>Chance</th>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[11]}</td>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[24]}</td>
            </tr>
            <tr>
                <th style={{textAlign:'left'}} className='border border-slate-600 ...'>YAHTZEE</th>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[12]}</td>
                <td style={{textAlign:'center'}} className='border border-slate-600 ...'>{tableValues[25]}</td>
            </tr>
            <tr>
                <th style={{textAlign:'left'}} className='border border-slate-700 border-4 ...'>TOTAL SCORE</th>
                <td style={{textAlign:'center'}} className='border border-slate-700 border-4 ...'>{tableValues[26]}</td>
                <td style={{textAlign:'center'}} className='border border-slate-700 border-4 ...'>{tableValues[27]}</td>
            </tr>
        </tbody>
      </table>
    </div>
    </>
  )
} 