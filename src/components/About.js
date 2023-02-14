import React from 'react'
import ListsItem from './ListsItem';
import Authentication from '../components/Authentication';


const About = () => {
  return (
    <React.Fragment>
        <div className='about container'>
        <ListsItem title ='About' className= 'aboutTitle' as='h2' />
        <ListsItem title ="I'm more experienced in eCommerce web projects and mobile banking apps, but also like to work with creative projects, such as landing pages or unusual corporate websites. "className= 'about_item' as='p' />
        <Authentication className='registrationLink about_more'  title='see more'/>
        </div>
    </React.Fragment>
  )
}

export default About