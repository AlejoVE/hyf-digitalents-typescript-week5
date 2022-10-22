import React from 'react'


type StartButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const StartButton = (props: StartButtonProps ) => {
  return (
    <button className='btn btn-success btn-lg' onClick={props.onClick}>START GAME</button>
  )
}
