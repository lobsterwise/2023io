import { useState } from "react";

export default function Die() {
	const [value, setValue] = useState(0);
	const [held, setHeld] = useState(false);
	
  return (
    <td style={{
      textAlign: "center",
      padding: "2vh 2vw 2vh 2vw",
      transform: {held} ? "translateY(10rem)" : "",
    }} className="border border-slate-300">
      {value === null ? "" : value}
    </td>
  )
}
