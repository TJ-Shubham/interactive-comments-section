import { useState } from "react";
import Button from "./Button";

export default function Score() {
  const[rating, setRating] = useState(12);

  function handleAddScore(){
    setRating(prev => prev + 1);
  }

  function handleDecrementScore(){
    setRating(prev => prev - 1);
  }

  return (
    <div>
        <Button onClick={handleAddScore}>+</Button>
        <p>{rating}</p>
        <Button onClick={handleDecrementScore}>-</Button>
    </div>
  )
}
