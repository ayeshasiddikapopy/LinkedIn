import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Images from '../components/Images';
import ButtonBox from './ButtonBox';
import ListsItem from './ListsItem';
import { styled, Button, Alert,Modal ,Typography ,Box  } from '@mui/material';
import { getDatabase, ref, set , push, onValue} from "firebase/database";
import { useSelector } from 'react-redux';

const CommonButton = styled(Button)({
    fontSize: 12,
    padding: '9px 45px',
    margin: '10px 0',
    backgroundColor: '#086FA4',
    borderRadius:'10px',
  });
  


const UserList = () => {
    const db = getDatabase();
    let data = useSelector((state) => state)
    let [userList, setUserList] = useState([]);

    // get data from redux and login users couldn't show
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
                    <ButtonBox buttonName = {CommonButton} title='send request'/>
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