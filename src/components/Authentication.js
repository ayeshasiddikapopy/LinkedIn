import React from 'react';
import { Link } from 'react-router-dom';


const Authentication = ({className, href, title, hreftitle , onClick}) => {
  return (
    <p onClick={onClick} className={className}>{title}<Link to= {href}> {hreftitle}</Link></p>
  )
}

export default Authentication;