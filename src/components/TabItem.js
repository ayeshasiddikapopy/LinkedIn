import React from 'react'
import { styled, Button  } from '@mui/material';
import ButtonBox from './ButtonBox';
import { useNavigate } from 'react-router-dom';

const CommonButton = styled(Button)({
    color:'#222222',
    fontSize: 12,
    padding: '21px 100px',
    textTransform:'uppercase',
    backgroundColor: '#fff',
    borderRadius:'0px',
    border:'1px',
    '&:hover': {
      backgroundColor: '#0077B5',
     color:'#fff',
    },
  });

const TabItem = () => {

  let navigate = useNavigate();
  //friends
  let handleFriend =() => {
    console.log('friend')
    navigate('friend')
  }
  //post
  let handlePost =() => {
    console.log('post')
    navigate('post')
  }
  
  return (
    <React.Fragment>
        <div className='tabs'>
          <ButtonBox buttonName = {CommonButton} title='Profile'/>
          <ButtonBox buttonName = {CommonButton} title='Friends' onClick={handleFriend}/>
          <ButtonBox buttonName = {CommonButton} title='Post' onClick={handlePost}/>
        </div>
    </React.Fragment>
  )
}

export default TabItem