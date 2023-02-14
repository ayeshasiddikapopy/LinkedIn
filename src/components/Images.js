import React from 'react'

const Images = ({imgsrc , className, onClick}) => {
    return (
      <img onClick={onClick} className={className} src={imgsrc} alt='img'/>
    )
  }

export default Images