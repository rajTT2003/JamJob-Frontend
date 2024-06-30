import React from 'react'

const Button = ({onClikHandler, value, title}) => {
  return (
    <button onClick={onClikHandler} value={value} className={`px-2 py-2 border text-base hover:bg-green hover:text-white`}>
        {title}
    </button>
  )
}

export default Button