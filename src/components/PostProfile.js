import React from 'react'
import Images from './Images';
import ListsItem from './ListsItem'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostProfile = () => {
    let data = useSelector((state) => state);
  return (
    <React.Fragment>
       <div className='bannerImg'>
            <Link><Images imgsrc='/assets/banner.png' className='bannerimgItem'/></Link>
             <div className='postImgItem'>
            <Link><Images imgsrc='/assets/login.png' className='postLoginImg'/></Link>
            </div>
        </div>
        <div className='postText'>
            <ListsItem title ={data.userdata.userInfo.displayName} className= 'post_login_item' as='h2' />
            <ListsItem title ='Freelance UX/UI designer, 80+ projects in web design, mobile apps  (iOS & android) and creative projects. Open to offers.' className= 'post-login_text' as='p' />
        </div>
    </React.Fragment>
  )
}

export default PostProfile