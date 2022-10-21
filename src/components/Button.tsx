import React from 'react'

export enum Colors {

    GREEN = 'green',
    RED= 'red',
    BLUE = 'blue',
    PINK = 'hotpink'
}

type SimonButtonProps = {
    color: Colors,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    isActive: boolean,
    disabled: boolean
}

export const Button = (props: SimonButtonProps) => {
  return (
    <button disabled={props.disabled}  data-color={props.color} onClick={props.onClick} className={`btn-mine box ${props.isActive ? " border border-white" : "inactive"}`} style={{backgroundColor: props.color}}></button>
  )
}
