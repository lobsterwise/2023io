export default function Game() {
	const [value, setValue] = useState(0);
	const [held, setHeld] = useState(false);
	
  return (
    <td style={{textAlign:"center",padding:"2vh 2vw 2vh 2vw"}} className="border border-slate-300">{value}</td>
  )
}
