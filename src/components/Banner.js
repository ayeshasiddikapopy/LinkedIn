
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
import "cropperjs/dist/cropper.css";
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
  
  //modal-->
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // croper start-->
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const [profile , setProfile] = useState('')
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result );
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      const storage = getStorage();
      const storageRef = ref(storage, `profile_img/${data.userdata.userInfo.uid}`);
      // Data URL string
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        console.log('Uploaded a data_url string!');
        setOpen(false)
        setImage('')
        //downloal imag
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log('File available at', downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL      // photourl : getdownloadURL upload img show koreni, cause o function kei call korse..
          }).then(() => {
            dispatch(activeUser(auth.currentUser))
            localStorage.setItem('userInfo' , JSON.stringify(auth.currentUser))
            console.log('uploaded')
          })
        });
      });
    }
  };
  useEffect(() => {
    setProfile(data.userdata.userInfo.photoURL)
  },[data])
  // croper end-->

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
            {image 
            ?
              <div className='img-preview'></div> 
              :
              data.userdata.userInfo.photoURL 
                ?
                <Link><Images imgsrc={profile} className='loginImgItem' onClick={handleOpen}/></Link>
                :
                <Link><Images imgsrc='assets/login.png' className='loginImgItem' onClick={handleOpen}/></Link>
              }
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
            <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <div className='img-Holder'>
             {image 
               ?
               <div className='img-preview'></div>
               :
               data.userdata.userInfo.photoURL
                 ?
                 <Link><Images imgsrc={data.userdata.userInfo.photoURL}className='loginImgItem'/></Link>
                 :
                 <Link><Images imgsrc='assets/login.png' className='loginImgItem'/></Link>
             }
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <input type='file' onChange={onChange}/>

         {image &&
         <div className='cropper'>
          <Cropper
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
          />  
          <ButtonBox buttonName = {CommonButton} title='upload' onClick={getCropData}/>
        </div>
        }
     
          </Typography>
        </Box>
      </Modal>
       </div>
    </React.Fragment>
  )
}

export default Banner;