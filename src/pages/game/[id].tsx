import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useEffect, useState} from 'react'
import Script from 'next/script'
import { io } from 'socket.io-client'
import {default as DieComponent} from '../../components/Die'
import Die, { makeDice } from '../../yahtzee_logic/die'

const inter = Inter({ subsets: ['latin'] })
let socket;
let count = 0;
const amountOfDice = 5;

export default function Game() {
  const router = useRouter()
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [playerName, setPlayerName] = useState('Player 1');
  const [gameText, setGameText] = useState("Finding Match...");
  const [tableValues, setTableValues] = useState([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, 0])
  const [dieValues, setDieValues] = useState(makeDice(null, false));
  const { id } = router.query
  socket = io({autoConnect: false});


  useEffect(() => {
    if (count < 1) {
      initEvents();
      let result = prompt("Enter Username:")
      setPlayerName(result)
      setName(result)
      count++;
    }
  }, [])

  const initEvents = async () => {
    socket.connect()
    // Get the socket
    await fetch("http://localhost:3000/api/game_manager");
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('player-connect', () => {
      console.log("A player has connected to the session");
    });

    socket.on('player-join', (name: string) => {
      console.log("Player " + name + " has joined!");
    });

    socket.on('players', (players: [object]) => {
      console.log(players)
    });

    socket.on("disconnect", (reason) => {
      socket.emit("player-disconnect", playerName, reason)
    })

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

    socket.on('update-dice', (player, dice: any[]) => {
      if (player === 0) {
        setDieValues(dice);
      }
    });
  }

  const handleRoll = () => {
    socket.emit('roll', player1Name);
  } 

  const setName = (name) => {
    socket.emit('player-join', name);
  }

  const handleHoldDie = (index: number) => {
    console.log("DIEDIEIDIEDIE");
    socket.emit('hold', index);
  }

  return (
    <>
    <h1 style={{textAlign:"center", paddingBottom:"2vw",paddingTop:"2vw"}} className='text-4xl font-sans text-white center'>{gameText}</h1>
    <div className='center bg-slate-800 text-white' style={{width:"75vw",height:"80vh"}}>
      <table style={{width:"auto",position:"absolute",top:"70%",left:"32.5%"}} className='table-auto border-collapse border border-slate-500  ...'>
        <tbody>
        <tr>
          <DieComponent onClick={() => handleHoldDie(0)} value={dieValues[0].held} held={dieValues[0].value} />
          <DieComponent onClick={() => handleHoldDie(1)} value={dieValues[1].held} held={dieValues[1].value} />
          <DieComponent onClick={() => handleHoldDie(2)} value={dieValues[2].held} held={dieValues[2].value} />
          <DieComponent onClick={() => handleHoldDie(3)} value={dieValues[3].held} held={dieValues[3].value} />
          <DieComponent onClick={() => handleHoldDie(4)} value={dieValues[4].held} held={dieValues[4].value} />
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