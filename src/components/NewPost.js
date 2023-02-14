import React from 'react';
import Images from './Images';
import ListsItem from './ListsItem';
import { FaLocationArrow } from "react-icons/fa";
import { ImImage } from "react-icons/im";
const NewPost = () => {
  return (
    <React.Fragment>
        <div className='posting'>
            <div className='posting_input container'>
                <ListsItem title ='New post' className= 'post_login_item newPOst ' as='h2' />
                <div className='posting_inner'>
                    <ListsItem title ='What’s on your mind?' className= 'post_login_item ' as='p' />
                    <div className='icon'>
                        <FaLocationArrow className='icon_item'/>
                        <ImImage className='icon_item'/>
                    </div>
                </div>
            </div> 
          <div className='posting_item container'>
            </div>  
        </div>
    </React.Fragment>
  )
}

export default NewPost