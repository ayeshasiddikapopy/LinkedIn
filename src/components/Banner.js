
import React , {useEffect, useState} from 'react';
import Images from './Images';
import ListsItem from './ListsItem'
import { BiEdit } from "react-icons/bi";
import { Link } from 'react-router-dom';
import ButtonBox from './ButtonBox';
import { FaLocationArrow } from "react-icons/fa";
import { styled, Button, Alert,Modal ,Typography ,Box  } from '@mui/material';
import { useSelector } from 'react-redux';
import { getStorage, ref, uploadString,getDownloadURL } from "firebase/storage";
import Cropper from "react-cropper";
import { getAuth ,updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { activeUser } from '../slices/userSlice';

const CommonButton = styled(Button)({
    fontSize: 16,
    padding: '9px 45px',
    margin: '14px 0',
    backgroundColor: '#086FA4',
    borderRadius:'10px',
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

  

const Banner = () => {
  const auth = getAuth();
  let data = useSelector((state) => state);
  let dispatch = useDispatch();


  return (
    <React.Fragment>
        <div className='bannerImg'>
            <Link><Images imgsrc='assets/banner.png' className='bannerimgItem'/></Link>
             <div className='edit_profile'>
                <Link><BiEdit/></Link>
                <ListsItem title ='edit profile' className= 'edit_item' as='p' />
            </div>
        </div>
       <div className='banner_inner'>
            <div className='bannerInner_Item'>
              <Link><Images imgsrc='assets/login.png' className='loginImgItem'/></Link>
            </div>
            <div className='bannerInner_text'>
               <div className='text_items'>
                    <ListsItem title ={data.userdata.userInfo.displayName} className= 'login_item' as='h2' />
                    <div className='location'>
                        <Link><FaLocationArrow/></Link>
                        <ListsItem title ='Saint Petersburg, Russian Federation' className= 'location_item' as='p' />
                    </div>
               </div>
               <ListsItem title ='Freelance UX/UI designer, 80+ projects in web design, mobile apps  (iOS & android) and creative projects. Open to offers.' className= 'login_text' as='p' />
               <ButtonBox buttonName = {CommonButton} title='contact info'/>
            </div>
       </div>
    </React.Fragment>
  )
}

export default Banner;