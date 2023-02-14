import React from 'react'
import { TextField } from '@mui/material'

const InputBox = ({label, variant, className, onChange, type, name }) => {
  return (
    <React.Fragment>
        <TextField className={className} variant={variant} type={type} name={name} label={label} onChange={onChange} />
    </React.Fragment>
  )
}

export default InputBox