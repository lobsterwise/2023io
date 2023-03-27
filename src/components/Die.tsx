export default function Die({ onClick, value, held}) {
  const handleClick = () => {
    console.log("LIVLIVELIVELIVELIE");
    onClick();
  };

  return (
    <>
      <td 
        style={{
          textAlign: "center",
          padding: "2vh 2vw 2vh 2vw",
          transform: {held} ? "translateY(1rem)" : "",
        }}
        className="border border-slate-300 fill-slate-100"
        onClick={handleClick}
      >
        {value === null ? "" : value}
      </td>
    </>
  )
}
