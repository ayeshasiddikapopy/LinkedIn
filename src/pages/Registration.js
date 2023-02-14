import React, { useState } from 'react'
import Header from '../components/Header';
import Heading from '../components/Heading';
import InputBox from '../components/InputBox';
import { styled, Button , Alert ,LinearProgress ,Modal ,Typography ,Box } from '@mui/material';
import Authentication from '../components/Authentication';
import { AiFillEye,AiFillEyeInvisible ,AiFillLinkedin  } from "react-icons/ai";
import { getAuth, createUserWithEmailAndPassword ,sendEmailVerification,signInWithPopup, GoogleAuthProvider ,updateProfile  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from  'react-loader-spinner';
import Images from '../components/Images';
import { getDatabase, ref, set , push} from "firebase/database";



// sign up button
const CommonButton = styled(Button)({
  width:'100%',
  fontSize: 16,
  padding: '20px 0',
  margin: '50px 0',
  backgroundColor: '#086FA4',
  borderRadius:'86px',
});

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

const Registration = () => {
  const auth = getAuth();
  let navigate = useNavigate(); 
  const db = getDatabase();
  const provider = new GoogleAuthProvider();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [show, setShow] = useState(false);
  let [loader, setLoader] = useState(false);
  let [progress , setProgress] = useState(0);
  let [formData, setFormdata] = useState({
    email:"",
    fullname: "",
    password: ""
  })
  let [error, setError] = useState({
    email:"",
    fullname: "",
    password: ""
  })

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

// sign in button
let handleSignin = () => {
  setLoader(true)
  let expression =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;

  if(formData.email === ''){ 
    setError({...error, email: 'email required'})
  } 
  else if(!expression.test(formData.email)){
    setError({...error, email: 'valid email required'})
  }
  else if(formData.fullname === ''){
    setError({...error, fullname: 'Full name required'})
  }
  else if(formData.password === ''){
    setError({...error, password: 'password required'})
  }
  else{
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
  .then((user) => {
    sendEmailVerification(auth.currentUser)
    .then(()=>{
      console.log(user.user)
      updateProfile(auth.currentUser, {
        displayName: formData.fullname
      }).then(() => {
        set(ref(db, 'users/' + user.user.uid), {
          displayName : user.user.displayName,
          email:user.user.email,
        }).then(() => {
            setLoader(false)
            toast("Registration succesfull!")
            setTimeout(()=> {
              navigate('/login')
            },1000)
            console.log('email send')
            }).catch((error) => {
            console.log(error)
            });
            })
      })
  }).catch((error) => {
    const errorCode = error.code;
    if(errorCode.includes('auth/email-already-in-use')){
      setError({...error, email:'email already exist'})
    }
    console.log(errorCode)
    toast("email already exist!")
  })
  } 
}

//sign in with google
let handleGoogle = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    console.log("google done")
    navigate('/profile')
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log(errorCode)
    // if(errorCode.includes()){
    //   toast("email not found !")
    // }
    })
}



  return (
    <React.Fragment>
        <div className='registration'>
            <Header>
                <AiFillLinkedin className='heading_icon'/>
                <Heading as = 'h1' title='Get started with easily register' className='heading'/>
                <Heading as = 'h2' title='Free register and you can enjoy it' className='sub_heading'/>
            </Header>
            <div className='inputs'>
              <InputBox type='email' name='email' onChange={handleForm} label="email" variant="outlined" placeholder='Type something' className='input_items'/>
              {error.email &&
                <Alert className='error' variant="filled" severity="error">
                {error.email}
                </Alert>
              }
              <InputBox type='text' name='fullname' onChange={handleForm} label="Full Name" variant="outlined" placeholder='Type something' className='input_items'/>
              {error.fullname &&
                <Alert className='error' variant="filled" severity="error">
                {error.fullname}
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
              <CommonButton  variant="contained" onClick={handleSignin}>Sign In</CommonButton>
               }
              <Authentication className='registrationLink' href='/login' title='Already have an account !' hreftitle
              ='sign in'/>
            <Authentication className='registrationLink' title='Try another way !' hreftitle
              ='sign in' onClick={handleOpen}/>
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
          <Images onClick = {handleGoogle} className='google__img' imgsrc='assets/google.png' />
          </Typography>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default Registration;