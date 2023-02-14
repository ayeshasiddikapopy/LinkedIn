import React from 'react'
import { Link } from 'react-router-dom';
import Images from '../components/Images';
import ListsItem from './ListsItem';

const Project = () => {
  return (
    <React.Fragment>
        <div className='container project'>
            <div className='projectHeading'>
                <ListsItem title ='Project' className= 'aboutTitle' as='h2' />
                <ul>
                    <p>3 of 12</p>
                </ul>
            </div>
            <div className='ProjectImg'>
                <div className='project_inner'>
                   <Link> <Images className='pojectimg_item' imgsrc='assets/ext-1.png'/></Link>
                </div>
                <div className='project_inner'>
                <Link><Images className='pojectimg_item' imgsrc='assets/ext-2.png'/></Link>
                </div>
                <div className='project_inner'>
                <Link><Images className='pojectimg_item' imgsrc='assets/ext.png'/></Link>
                </div>
            </div>

        </div>
    </React.Fragment>
  )
}

export default Project