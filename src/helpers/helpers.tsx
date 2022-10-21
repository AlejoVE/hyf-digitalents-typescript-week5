export const timeout = (ms: number)=>{
    return new Promise(resolve=>setTimeout(resolve, ms))
}

export const displayColors = async (sequence: string[], setActiveColor: React.Dispatch<React.SetStateAction<string>>)=> {
    for (let i = 0; i < sequence.length; i++) {
      setActiveColor(sequence[i])
      await timeout(500)
      setActiveColor('')
      await timeout(500)
    }
  }
