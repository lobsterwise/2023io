import { useState } from "react";

export default function ScoreTable() {
	const [player1Name, setPlayer1Name] = useState("Player 1");
	const [player2Name, setPlayer2Name] = useState("Player 2");
	const [tableValues, setTableValues] = useState([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, 0]);

	return (
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
	);
}
