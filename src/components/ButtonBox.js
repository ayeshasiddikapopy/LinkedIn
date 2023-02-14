import React from 'react'

const ButtonBox = (props) => {
  return (
    <React.Fragment>
        <props.buttonName onClick = {props.onClick} variant="contained" disableRipple>{props.title}</props.buttonName>
    </React.Fragment>
  )
}

export default ButtonBox