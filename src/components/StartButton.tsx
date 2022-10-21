import React from 'react'


type StartButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const StartButton = (props: StartButtonProps ) => {
  return (
    <button onClick={props.onClick}>Start Game</button>
  )
}
