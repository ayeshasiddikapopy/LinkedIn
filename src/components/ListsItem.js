import React from 'react'

const ListsItem = (props) => {
  return (
    props.as == undefined 
    ?
    <h1 className={props.className} >{props.title}</h1>
    :
    <props.as className={props.className} >{props.title}</props.as>
  )
}

export default ListsItem;