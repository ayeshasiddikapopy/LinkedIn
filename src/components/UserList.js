import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Images from '../components/Images';
import ButtonBox from './ButtonBox';
import ListsItem from './ListsItem';
import { styled, Button, Alert,Modal ,Typography ,Box  } from '@mui/material';
import { getDatabase, ref, set , push, onValue , remove} from "firebase/database";
import { useSelector } from 'react-redux';

const CommonButton = styled(Button)({
    fontSize: 12,
    padding: '9px 45px',
    margin: '10px',
    backgroundColor: '#086FA4',
    borderRadius:'10px',
  });
  


const UserList = () => {
    const db = getDatabase();
    let data = useSelector((state) => state)
    let [userList, setUserList] = useState([]);
    let [friendrequest, setFriendrequest] = useState([])
    let [friends, setFriends] = useState([]);
    let [block, setBlock] = useState([]);

    // get data from redux 
    useEffect (() => {
       const userListRef = ref(db, 'users');
        onValue(userListRef, (snapshot) => {
            let arr = [];
            snapshot.forEach(item => {
                if(data.userdata.userInfo.uid != item.key){
                  arr.push({...item.val(), id:item.key})
                }
            })
            setUserList(arr)
        });
    },[])

    //after accepting friends
    useEffect(() => {
        const friendRef = ref(db, 'friends');
        onValue(friendRef, (snapshot) => {
            let arr = [];
            snapshot.forEach(item => {
                arr.push(item.val().receiverid + item.val().senderid )
                //arr.push({...item.val(), id: item.key} )
            })
            setFriends(arr)
        });
    },[]);

    //deleting users
    let handleCancle = (item) =>{
        remove(ref(db, 'users/' + item.id)).then((
            console.log("delete")
        ))
        console.log(item)
    }
    //delet pending request problem
    let handlePendingcancle = (item) =>{
        remove(ref(db, 'friendrequest/' + item.id)).then((
            console.log(item.id)
        ))
        console.log(item)
    }
    // sending friend request
    let handleRequest = (info) => {
       set(push(ref(db, 'friendrequest')),{
            sendername:data.userdata.userInfo.displayName,
            senderid: data.userdata.userInfo.uid,
            receivername:info.displayName,
            receiverid:info.id,
       })
    }
    // pending friend request
    useEffect(() => {
        const pendingRef = ref(db, 'friendrequest');
        onValue(pendingRef, (snapshot) => {
            let arr = [];
            snapshot.forEach(item => {
            arr.push(item.val().receiverid + item.val().senderid )
            // arr.push({...item.val(), id: item.key} )
            })
            setFriendrequest(arr)
        });
    },[]);

  return (
    <React.Fragment>
        <div className='groupBox_holder'>
            <ListsItem title ='suggested friends' className= 'aboutTitle' as='h2' />
            {userList.map((item) => (
            <div className='boxHolder'>
                <div className='box_list'>
                    <div className='groupBox'>
                        <div className='groupList_img'>
                            <Link><Images className='listImg' imgsrc='assets/login.png'/></Link>
                        </div>
                    <div className='group_subTitle'>
                        <ListsItem title ={item.displayName} className= 'Group_Subtitle' as='h2' />
                        <ListsItem title ={item.email} className= 'Group_Subtitle-lower' as='p' />
                    </div>
                    </div>
                    <div className='box_button'>

                    {block.includes(item.id + data.userdata.userInfo.uid) ||
                     block.includes(data.userdata.userInfo.uid + item.id) 
                        ? 
                        (
                            <ButtonBox buttonName = {CommonButton} title='blocked' />
                        )
                        :
                        friends.includes(item.id + data.userdata.userInfo.uid) ||
                        friends.includes(data.userdata.userInfo.uid + item.id) 
                            ? 
                            (
                                <div className='friends'>
                                <ButtonBox buttonName = {CommonButton} title='friends' />
                                <ButtonBox buttonName = {CommonButton} title='unfriend' onClick= {() => handleCancle (item)}/>
                                </div>
                            )
                            :
                            friendrequest.includes(item.id + data.userdata.userInfo.uid) || friendrequest.includes(data.userdata.userInfo.uid + item.id) 
                                ?
                                <div>
                                    <ButtonBox buttonName = {CommonButton} title='pending'/>
                                    <ButtonBox buttonName = {CommonButton} title='cancel' onClick={() => handlePendingcancle(item)}/>
                                </div>
                                :
                                <div>
                                    <ButtonBox buttonName = {CommonButton} title='send request' onClick={() => handleRequest(item)}/>
                                    <ButtonBox buttonName = {CommonButton} title='cancel' onClick={() => handleCancle(item)}/>
                                </div>
                            }
                    </div>
                </div>
            </div>
            ))
            }
        </div>
    </React.Fragment>
  )
}

export default UserList