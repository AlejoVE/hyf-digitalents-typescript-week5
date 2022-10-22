import React from 'react'

export enum Colors {

    GREEN = '#08a045',
    RED= '#d63230',
    BLUE = '#40bcd8',
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
