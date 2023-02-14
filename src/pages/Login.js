import React, { useState } from 'react'
import Header from '../components/Header';
import Heading from '../components/Heading';
import InputBox from '../components/InputBox';
import { styled, Button, Alert ,LinearProgress ,Modal ,Typography ,Box  } from '@mui/material';
import Authentication from '../components/Authentication';
import { AiFillEye,AiFillEyeInvisible ,AiFillLinkedin  } from "react-icons/ai";
import { getAuth, signInWithEmailAndPassword ,sendPasswordResetEmail} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from  'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { activeUser } from '../slices/userSlice';
import ButtonBox from '../components/ButtonBox'

// sign up button
const CommonButton = styled(Button)({
  width:'100%',
  fontSize: 16,
  padding: '20px 0',
  margin: '50px 0',
  backgroundColor: '#086FA4',
  borderRadius:'86px',
});

const Login = () => {

  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [show, setShow] = useState(false)
  let [loader, setLoader] = useState(false);
  let [progress , setProgress] = useState(0);
  let [formData, setFormdata] = useState({
    email:"",
    password: "",
    forgotPassword:"",
  })
  let [error, setError] = useState({
    email:"",
    password: ""
  })
  //modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// dynamic value
  let handleForm = (e) => {
    let {name, value} = e.target;
    
    //password validation
    if(name === 'password'){

      let capitalizes = /[A-Z]/
      let lower = /[a-z]/
      let number = /[0-9]/
      let symbol = /[<>()[\]\\.,;:\s@"$`~!$%^&*_?/^]/

      // capita
      if(!capitalizes.test(value)){
        setError({...error, password:'one capital letter required'})
        return
      }else{
        if(progress < 100){
          setProgress(progress + 20)
        }
      }

      //number
      if(!number.test(value)){
        setError({...error, password:'one number letter required'})
        return
      }else{
        if(progress < 100){
          setProgress(progress + 20)
        }
      }

      //lower case
      if(!lower.test(value)){
        setError({...error, password:'one lower letter required'})
        return
      }else{
        if(progress < 100){
          setProgress(progress + 20)
        }
      }

      //symbol
      if(!symbol.test(value)){
        setError({...error, password:'one symbol required'})
        return
      }else{
        if(progress < 100){
          setProgress(progress + 20)
        }
      }

      // strength
      if(value.length < 8){
        setError({...error, password:'minimum 8 character required'})
        return
      }else{
        if(progress < 100){
          setProgress(progress + 20)
        }
      }
    }
    setFormdata({...formData, [name]: value})
    setError({...error,[name] : ''})
  }

  //login
  let handleLogin = () => {
    setLoader(true)
    let expression =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;

    if(formData.email === ''){ 
      setError({...error, email: 'email required'})
    } 
    else if(!expression.test(formData.email)){
      setError({...error, email: 'valid email required'})
    }
    else if(formData.password === ''){
      setError({...error, password: 'password required'})
    }
    else{
      signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {

        console.log('login',userCredential)
        dispatch(activeUser(userCredential.user))
        localStorage.setItem('userInfo' , JSON.stringify(userCredential.user))

       if(userCredential.user.emailVerified){
          toast("varified!")
          setTimeout(()=> {
            navigate("/profile")
          },1000)
         console.log('email sends')
       }else{
        toast("varify email & try again!")
       }
       setLoader(false)
      })
      .catch((error) => {
        const errorCode = error.code;
        if(errorCode.includes('auth/user-not-found')){
          setError({...error, email:'user not found'})
        }
        console.log(errorCode)
        setLoader(false)
        toast("user not found !")
      })
    }
  }

  // forgot password
 let handleforgotPassword = () => {
  sendPasswordResetEmail(auth, formData.forgotPassword)
    .then(() => {
      toast("mail sent !")
    }).catch((error) => {
      const errorCode = error.code;
      if(errorCode.includes('auth/user-not-found')){
        toast("user not found !")
      }
    })
 }

  return (
    <>
         <React.Fragment>
        <div className='registration'>
            <Header>
                <AiFillLinkedin className='heading_icon'/>
                <Heading as = 'h1' title='Login' className='heading_login'/>
                <Heading as = 'h2' title='Free register and you can enjoy it' className='sub_heading'/>
            </Header>
            <div className='inputs'>
            <InputBox type='email' name='email' onChange={handleForm} label="email" variant="outlined" placeholder='Type something' className='input_items'/>
              {error.email &&
                <Alert className='error' variant="filled" severity="error">
                {error.email}
                </Alert>
              }
               <div style={{width:'100%', position:'relative'}}>
              <InputBox type={show ? 'text' : 'password'} name='password' onChange={handleForm} label="password" variant="outlined" placeholder='Type something' className='input_items'/>
              {show
              ?
              <AiFillEye onClick={()=> setShow(false)} className='eyeicon'/>
              :
              <AiFillEyeInvisible onClick={()=> setShow(true)} className='eyeicon'/>
              }
               <LinearProgress variant="determinate" value={progress} className = 'progress'/>
              </div>
              {error.password &&
                <Alert className='error' variant="filled" severity="error">
                {error.password}
                </Alert>
              }
            </div>
            <div className='signUp_button'>
            {loader ?
              <div className='oval'>
              <Oval
                ariaLabel="loading-indicator"
                height={50}
                width={50}
                strokeWidth={5}
                strokeWidthSecondary={1}
                color="blue"
                secondaryColor="white"
                margin='100'
              />
              </div>
              :
              <CommonButton  variant="contained" onClick={handleLogin}>login</CommonButton>
            }
              <Authentication className='registrationLink' href='/' title="Didn't have account ? " hreftitle
              ='sign up'/>
              <Button onClick={handleOpen} className='forgotpassword'>Forgot password ? click here</Button>
            </div>
        </div> 
        <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
         <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Forgot password!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <InputBox onChange={handleForm} name="forgotPassword" className='reginputfgp' label="email Address" variant='standard' />
          <ButtonBox onClick = {handleforgotPassword} buttonName = {CommonButton} title='send email'/>
          </Typography>
        </Box>
      </Modal>
    </React.Fragment>
    </>
  )
}

export default Login