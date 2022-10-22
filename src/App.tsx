import React, { useState } from 'react';
import { Button, Colors } from './components/Button';
import { Title } from './components/Title';
import './styles/styles.css'
import { StartButton } from './components/StartButton';
import { timeout } from './helpers/helpers';
import swal from 'sweetalert';


function App() {

  const colors = Object.values(Colors)
  const [currentSequence, setCurrentSequence] = useState<string[]>([])
  const [activeColor, setActiveColor] = useState<string>('')
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [score, setScore] = useState<number>(0)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(true)

  const startGame = (e: React.MouseEvent<HTMLButtonElement>): void=> {
    setGameStarted(true)
    startSequence()
  }

  const startSequence = (): void =>{
    setButtonsDisabled(true)
    const randomIndex: number = Math.floor(Math.random() * colors.length);
    const color: string = colors[randomIndex]
    const updateSequence: string[] = [...currentSequence, color]

    setCurrentSequence(updateSequence)

    displayColors(updateSequence)

  }

  const checkAnswers = async(userAnswers: string[]): Promise<void> => {

   for (let i = 0; i < userAnswers.length; i++) {
    if(currentSequence[i] !== userAnswers[i]){
      swal("WRONG ANSWER!", `SCORE: ${score}`, "error");
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

  const handleClick =  async(e: React.MouseEvent<HTMLButtonElement>): Promise<void>=> {
    if(currentSequence.length < 1) return
    // Get the color of the  clicked button
    const color: string = (e.target as HTMLButtonElement).getAttribute('data-color') as string
    setActiveColor(color)
    await timeout(150)
    setActiveColor('')
    const updateUserAnswers: string[] = [...userAnswers, color]
    setUserAnswers(updateUserAnswers)
    checkAnswers(updateUserAnswers)
  }

 const displayColors = async (sequence: string[]): Promise<void>=> {
    for (let i = 0; i < sequence.length; i++) {
      setActiveColor(sequence[i])
      await timeout(300)
      setActiveColor('')
      await timeout(300)
    }
    setButtonsDisabled(false)
  }


  const resetGame = (): void=>{
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
