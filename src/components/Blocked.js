import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Images from '../components/Images';
import ButtonBox from '../components//ButtonBox';
import ListsItem from '../components//ListsItem';
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

  
const Blocked = () => {
    const db = getDatabase();
    let data = useSelector((state) => state)
    let [block, setBlock] = useState([]);

    
    //friends
    useEffect(() => {
        const blockRef = ref(db, 'block');
        onValue(blockRef, (snapshot) => {
            let arr = [];
            snapshot.forEach(item => {
                if(item.val().blockbyid === data.userdata.userInfo.uid) {
                    arr.push({ 
                        id : item.key,
                        block: item.val().block,
                        blockid:item.val().blockid
                    })
                } else if (item.val().blockid === data.userdata.userInfo.uid) {
                    arr.push({ 
                        id : item.key,
                        blockby: item.val().blockby,
                        blockbyid:item.val().blockbyid
                    })
                }
            })
            setBlock(arr)
        });
    },[]);

    //unblock
    let handleUnblock = (item) => {
        set(push(ref(db,'friends')),{
            sendername:data.userdata.userInfo.displayName,
            senderid: data.userdata.userInfo.uid,
            receivername:item.block,
            receiverid:item.blockid,
        }).then(()=>{
            remove(ref(db,'block/' + item.id)).then(()=>{
                console.log('unblocked')
            })
        })
    }


  return (
    <React.Fragment>
        <div className='groupBox container'>
       
        <ListsItem title ='block list' className= 'friendTitle' as='h1' />

        <div className='flex'>
            {block.length > 0 ? block.map((item) =>(
              <div className='box_Item'>
                  <div className='box_list'>
                      <div className='groupBox'>
                          <div className='groupList_img'>
                              <Link><Images className='listImg' imgsrc='/assets/login.png'/></Link>
                          </div>
                      <div className='group_subTitle'>
                      {item.block
                            ?
                            <ListsItem title ={item.block} className= 'Group_Subtitle' as='h2' />
                            :
                            <ListsItem title ={item.blockby} className= 'Group_Subtitle' as='h2' />
                        }
                      </div>
                      </div>
                      <div className='box_button'>
                      {item.block 
                        ?
                        <ButtonBox buttonName = {CommonButton} title='Unblocked' onClick={() => handleUnblock(item)}/>
                        :
                        <ButtonBox buttonName = {CommonButton} title='Blocked'/>
                    }  
                        
                      </div>
                  </div>
              </div>
            )) : (<Alert variant="filled" severity="info" className='alert'>
            No friend here
            </Alert>)
            }
          </div> 
        </div>
    </React.Fragment>
  )
}

export default Blocked