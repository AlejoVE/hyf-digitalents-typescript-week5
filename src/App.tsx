import React, { useState } from 'react';
import { Button, Colors } from './components/Button';
import { Title } from './components/Title';
import './styles/styles.css'
import { StartButton } from './components/StartButton';
import { timeout } from './helpers/helpers';

function App() {

  const colors = Object.values(Colors)
  const [currentSequence, setCurrentSequence] = useState<string[]>([])
  const [activeColor, setActiveColor] = useState<string>('')
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [score, setScore] = useState<number>(0)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(true)

  const startGame = (e: React.MouseEvent<HTMLButtonElement>)=> {
    setGameStarted(true)
    startSequence()
  }

  const startSequence = async () =>{
    setButtonsDisabled(true)
    const randomIndex: number = Math.floor(Math.random() * colors.length);
    const color = colors[randomIndex]
    const updateSequence = [...currentSequence, color]

    setCurrentSequence(updateSequence)

    displayColors(updateSequence)

  }

  const checkAnswers = async(userAnswers: string[]) => {

   for (let i = 0; i < userAnswers.length; i++) {
    if(currentSequence[i] !== userAnswers[i]){
      alert(`                    Game over\n
                     Your Score: ${score}
      `  )
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
    if(currentSequence.length < 1) return
    const color = (e.target as HTMLButtonElement).getAttribute('data-color')
    const updateUserAnswers = [...userAnswers, (color as string)]
    setUserAnswers(updateUserAnswers)
    checkAnswers(updateUserAnswers)
  }

 const displayColors = async (sequence: string[])=> {
    for (let i = 0; i < sequence.length; i++) {
      setActiveColor(sequence[i])
      await timeout(500)
      setActiveColor('')
      await timeout(500)
    }
    setButtonsDisabled(false)
  }


  const resetGame = ()=>{
    setButtonsDisabled(true)
    setActiveColor('')
    setCurrentSequence([])
    setScore(0)
    setUserAnswers([])
    setGameStarted(false)
  }

  return (
    <div className="container text-center">
      <Title />
      <h1 className='text-white mt-2 '>Score: {score}</h1>
      <div className='grid mb-5 mt-5'>
       {
        Object.values(Colors).map(color=> <Button disabled={buttonsDisabled} key={color} isActive={activeColor === color ? true: false}  color={color} onClick={handleClick} /> )
       }
       </div>
       {
        !gameStarted && <StartButton onClick={startGame}  />
       }
    </div>
  );
}

export default App;
