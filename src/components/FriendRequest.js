import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Images from '../components/Images';
import ButtonBox from '../components//ButtonBox';
import ListsItem from '../components//ListsItem';
import { styled, Button, Alert,Modal ,Typography ,Box  } from '@mui/material';
import { getDatabase, ref, set , push, onValue , remove} from "firebase/database";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommonButton = styled(Button)({
    fontSize: 12,
    padding: '9px 45px',
    margin: '10px',
    backgroundColor: '#086FA4',
    borderRadius:'10px',
  });
  

const FriendRequest = () => {
    const db = getDatabase();
    let data = useSelector(state => state)
    let [friendrequest, setFriendrequest] = useState([])

    
    useEffect(()=>{
        const friendreqRef = ref(db, 'friendrequest');
        onValue(friendreqRef, (snapshot) => {
         let arr = [];
         snapshot.forEach(item => {
            if(item.val().receiverid === data.userdata.userInfo.uid){
                arr.push({...item.val(), id: item.key})
            }
         })
         setFriendrequest(arr)
        });
    },[])

    let handleCancle = (item) =>{
        remove(ref(db, 'friendrequest/' + item.id)).then((
            console.log("delete")
        ))
        console.log(item)
        toast("deleted!")
    }
    
    let handleAccept = (item) => {
        set(push(ref(db,'friends')),{
            ...item,
            date : `${new Date().getDate()} / ${new Date().getMonth()+1} / ${new Date().getFullYear()}`,
        }).then(() => {
            console.log("acceped")
            toast("accepted!")
        }).then(() =>{
            remove(ref(db, 'friendrequest/' + item.id)).then((
                console.log("delete")
            ))
        })
    }
  return (
    <React.Fragment>
    <div className='groupBox container'>
     <ListsItem title ='friends request' className= 'friendTitle' as='h1' />
     <div className='flex'>
         {friendrequest.length > 0 ? friendrequest.map((item) => (
            <div className='box_Item'>
            <div classN ame='box_list'>
                <div className='groupBox'>
                    <div className='groupList_img'>
                        <Link><Images className='listImg' imgsrc='/assets/login.png'/></Link>
                    </div>
                <div className='group_subTitle'>
                    <ListsItem title ={item.sendername} className= 'Group_Subtitle' as='h2' />
                    <ListsItem title ={item.email} className= 'Group_Subtitle-lower' as='p' />
                </div>
                </div>
                <div className='box_button'>
            
                <ButtonBox buttonName = {CommonButton} title='accept' onClick={() => handleAccept(item)}/>
                <ButtonBox buttonName = {CommonButton} title='remove' onClick={() => handleCancle(item)}/>
                </div>
            </div>
            </div>
            ))
            : (<Alert variant="filled" severity="info" className='alert'>
                    No friend request here
            </Alert>)}
        </div>   
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />

  </React.Fragment>
  )
}

export default FriendRequest