import React from 'react'
import { Link } from 'react-router-dom';
import Images from '../components/Images';
import ListsItem from './ListsItem';

const Education = () => {
  return (
    <React.Fragment>
    <div className=' container project'>
    <ListsItem title ='Education' className= 'aboutTitle experience_title' as='h2' />  
        <div className='education'>
        <div className='experienc_img'>
            <Link><Images className='experienc_imgItem' imgsrc='assets/avatar.png'/></Link>
        </div>
        <div className='experience_Item'>
            <ListsItem title ='Moscow State Linguistic University' className= 'experience_heading' as='h2' />
            <ListsItem title ="Bachelor's degree Field Of StudyComputer and Information Systems Security/Information Assurance." className= 'experienc_text' as='p' />
            <ListsItem title ='2013 — 2017' className= 'experienc_text' as='p' />
            <ListsItem title ='Additional English classes and UX profile courses​.' className= 'experienc_text' as='p' />
        </div>
    </div>
    </div>
</React.Fragment>
  )
}

export default Education