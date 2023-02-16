import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Images from '../components/Images';
import ButtonBox from '../components//ButtonBox';
import ListsItem from '../components//ListsItem';
import { styled, Button, Alert,Modal ,Typography ,Box  } from '@mui/material';
import { getDatabase, ref, set , push, onValue , remove} from "firebase/database";
import { useSelector } from 'react-redux';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import FriendRequest from '../components/FriendRequest';
import Blocked from '../components/Blocked';


const CommonButton = styled(Button)({
  fontSize: 12,
  padding: '9px 45px',
  margin: '10px',
  backgroundColor: '#086FA4',
  borderRadius:'10px',
});


const Friends = () => {
    const db = getDatabase();
    let data = useSelector((state) => state)
    let navigate = useNavigate()
    let [friends, setFriends] = useState([]);

    //friends
    useEffect(() => {
        const friendRef = ref(db, 'friends');
        onValue(friendRef, (snapshot) => {
            let arr = [];
            snapshot.forEach(item => {
                if(data.userdata.userInfo.uid == item.val().receiverid || data.userdata.userInfo.uid == item.val().senderid)  {
                arr.push({...item.val(), blockId : item.key})
                }
            })
            setFriends(arr)
        });
        console.log('friend')
    },[]);

    //navigate to profile page
      let handleBack = () => {
        navigate('/profile')
        console.log('navigate')
      }

      // unfriend
      let handleUnfriend = (item) => {
        remove(ref(db, 'friends/' + item.blockId)).then((
            console.log("delete")
        )).then(() =>{
            console.log('unfriend')
        })
      }

    //block
    let handleBlock = (item) =>{
      console.log(item)
      if(data.userdata.userInfo.uid == item.senderid){
          set(push(ref(db, 'block')), {
              block: item.receivername,
              blockid: item.receiverid,
              blockby:item.sendername,
              blockbyid: item.senderid,
          }).then(()=>{
              remove(ref(db,'friends/' + item.blockId)).then(()=>{
                  console.log('delet')
              })
          })
      } else {
          set(push(ref(db, 'block')), {
              block: item.sendername,
              blockid: item.senderid,
              blockby:item.receivername,
              blockbyid: item.receiverid,
          }).then(()=>{
              remove(ref(db,'friends/' + item.blockId)).then(()=>{
                  console.log('delet')
              })
          })
      }
  }
  return (
     <React.Fragment>
        <div className='groupBox container'>
        <div className='backToProfile_icon'>
          <Link><AiOutlineArrowLeft onClick={handleBack}/></Link>
        </div>
        <ListsItem title ='friends' className= 'friendTitle' as='h1' />

        <div className='flex'>
            {friends.length > 0 ? friends.map((item) =>(
              <div className='box_Item'>
                  <div className='box_list'>
                      <div className='groupBox'>
                          <div className='groupList_img'>
                              <Link><Images className='listImg' imgsrc='/assets/login.png'/></Link>
                          </div>
                      <div className='group_subTitle'>
                      {item.receiverid == data.userdata.userInfo.uid
                      ?
                      <ListsItem title ={item.sendername} className= 'Group_Subtitle' as='h2' />
                      :
                      <ListsItem title ={item.receivername} className= 'Group_Subtitle' as='h2' />
                      }
                      <ListsItem title ={item.date} className= 'Group_Subtitle-lower' as='p' />
                      </div>
                      </div>
                      <div className='box_button'>
                        <ButtonBox buttonName = {CommonButton} title='BLock' onClick={()=>handleBlock(item)}/>
                        <ButtonBox buttonName = {CommonButton} title='Unfriend' onClick ={() => handleUnfriend(item)}/>
                      </div>
                  </div>
              </div>
            )) : (<Alert variant="filled" severity="info" className='alert'>
            No friend here
            </Alert>)
            }
          </div> 
        </div>
        <FriendRequest/>
        <Blocked/>
    </React.Fragment>
  )
}

export default Friends