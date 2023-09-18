import { useState } from "react";
import Button from "./Button";

// eslint-disable-next-line react/prop-types
export default function Score({initialScore}) {
  const[rating, setRating] = useState(initialScore);

  function handleAddScore(){
    setRating(prev => prev + 1);
  }

  function handleDecrementScore(){
    setRating(prev => prev > 0 ? prev - 1 : 0);
  }

  return (
    <div className="score">
        <Button onClick={handleAddScore}>+</Button>
        <p>{rating}</p>
        <Button onClick={handleDecrementScore}>-</Button>
    </div>
  )
}
