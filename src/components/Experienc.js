import React from 'react'
import { Link } from 'react-router-dom';
import Images from '../components/Images';
import ListsItem from './ListsItem';

const Experienc = () => {
  return (
    <React.Fragment>
        <div className=' container '>
        <ListsItem title ='Experience' className= 'aboutTitle experience_title' as='h2' />  
            <div className='experienc'>
            <div className='experienc_img'>
                <Link><Images className='experienc_imgItem' imgsrc='assets/avatar.png'/></Link>
            </div>
            <div className='experience_Item'>
                <ListsItem title ='Freelance UX/UI designer' className= 'experience_heading' as='h2' />
                <div className='occupation'>
                    <ListsItem title ='Self Employed' className= 'experienc_text' as='p' />
                    <ListsItem title ='Around the world' className= 'experienc_text' as='p' />
                </div>
                <div className='date'>
                    <ListsItem title ='Jun 2016 — Present' className= 'experienc_text' as='p' />
                    <ListsItem title ='3 yrs 3 mos' className= 'experienc_text' as='p' />
                </div>
                <ListsItem title ='Work with clients and web studios as freelancer.  Work in next areas: eCommerce web projects; creative landing pages; iOs and Android apps; corporate web sites and corporate identity sometimes.' className= 'experienc_text' as='p' />
            </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Experienc