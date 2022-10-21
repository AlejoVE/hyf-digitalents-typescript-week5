import React from 'react'

export enum Colors {

    GREEN = 'green',
    RED= 'red',
    BLUE = 'blue',
    PINK = 'pink'
}

type SimonButtonProps = {
    color: Colors,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    isActive: boolean
}

export const Button = (props: SimonButtonProps) => {
  return (
    <button data-color={props.color} onClick={props.onClick} className={`btn ${props.isActive ? "active" : "inactive"}`} style={{backgroundColor: props.color}}></button>
  )
}
