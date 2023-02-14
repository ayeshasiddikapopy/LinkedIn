import React ,{ useEffect }from 'react'
import { AiFillLinkedin  } from "react-icons/ai";
import { styled, Button  } from '@mui/material';
import ButtonBox from './ButtonBox';
import { getAuth,signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { activeUser } from '../slices/userSlice';
import { Outlet } from 'react-router-dom';


const CommonButton = styled(Button)({
  color:'#222222',
  fontSize: 12,
  padding: '10px 20px',
  textTransform:'uppercase',
  backgroundColor: '#fff',
  borderRadius:'10px',
  border:'1px',
  '&:hover': {
    backgroundColor: '#0077B5',
    color:'#fff',
  },
});

const Rootlayout = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let data = useSelector(state => state)
  console.log(Boolean(!data.userdata.userInfo))

  // navigate to logins page
  useEffect(() => {
    if(!data.userdata.userInfo){
    console.log('works')
    navigate('/login')
  }
  // else{
  //   navigate('/profile')
  // }
  },[])

    //not to navigate login page
    // useEffect(() => {
    //   if( data.userdata.userInfo != null){
    //   console.log('if true then not to navigate login page')
    //   navigate('/profile')
    // }
    // },[])

  let handlelogOut = () => {
    signOut(auth).then(() => {
      localStorage.clear('userInfo') // remove from local storage 
      dispatch(activeUser(null)) // remove from redux
      navigate("/login")
    })
    console.log('word')
  }
  return (
    <React.Fragment>
        <div className='menubar'>
            <AiFillLinkedin className='heading_icon menu_spacing'/>
            <ButtonBox buttonName = {CommonButton} title='sign out' onClick={handlelogOut}/>
        </div>
        <Outlet/>
    </React.Fragment>
  )
}
export default Rootlayout