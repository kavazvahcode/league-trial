import React from 'react'

interface ButtonProps {
  text: string
  onClick: () => void
  className?: string
  textClassName?: string
  icon?: React.ReactNode
  shadow?: boolean
  disabled?: boolean
}

const Button = ({
  text,
  onClick,
  className = '',
  textClassName = '',
  icon,
  shadow = false,
  disabled,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-3 bg-tetriary rounded-md flex items-center justify-center ${
        shadow ? 'shadow-md' : ''
      } ${className}`}
    >
      {icon && <span className="mr-2 ">{icon}</span>}
      <span className={`text-white text-base font-volksans ${textClassName}`}>
        {text}
      </span>
    </button>
  )
}

export default Button
