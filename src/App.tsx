import React, { useState } from 'react';
import './App.css';
import { Button, Colors } from './components/Button';
import { Title } from './components/Title';

import './styles/styles.css'
import { StartButton } from './components/StartButton';
import { timeout, displayColors } from './helpers/helpers';

function App() {

  const [colors, setColors] = useState(Object.values(Colors))
  const [currentSequence, setCurrentSequence] = useState<string[]>([])
  const [activeColor, setActiveColor] = useState<string>('')  // const currentSequence: string[] = [];
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [score, setScore] = useState<number>(0)

  const startGame = (e: React.MouseEvent<HTMLButtonElement>)=> {
    startSequence()
  }

  const startSequence = () =>{
    const randomIndex: number = Math.floor(Math.random() * colors.length);
    const color = colors[randomIndex]

    const updateSequence =  [...currentSequence, color]

    setCurrentSequence(updateSequence)

    displayColors(updateSequence, setActiveColor)

  }

  const checkAnswers = async(userAnswers: string[]) => {

   for (let i = 0; i < userAnswers.length; i++) {
    if(currentSequence[i] !== userAnswers[i]){
      alert('Wrong Answer')
      resetGame()
      return
     }
   }

    if(userAnswers.length === currentSequence.length) {
        setScore(score + 1)
        await timeout(1000)
        startSequence()
        setUserAnswers([])
    }

  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>)=> {
    const color = (e.target as HTMLButtonElement).getAttribute('data-color')
    const updateUserAnswers = [...userAnswers, (color as string)]
    setUserAnswers(updateUserAnswers)
    checkAnswers(updateUserAnswers)
  }

  const resetGame = ()=>{
    setActiveColor('')
    setCurrentSequence([])
    setScore(0)
    setUserAnswers([])
  }

  return (
    <div className="App">
      <Title />
      <h1>User Score: {score}</h1>
       {
        Object.values(Colors).map(color=> <Button key={color} isActive={activeColor === color ? true: false} color={color} onClick={handleClick} /> )
       }
      <StartButton onClick={startGame}  />
    </div>
  );
}

export default App;
