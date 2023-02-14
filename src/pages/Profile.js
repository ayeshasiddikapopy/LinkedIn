import React from 'react'
import {Grid  } from '@mui/material';
import Banner from '../components/Banner';
import TabItem from '../components/TabItem'
import About from '../components/About';
import Project from '../components/Project';
import Experienc from '../components/Experienc';
import Education from '../components/Education';
import UserList from '../components/UserList';

const Profile = () => {
 
  return (
    <React.Fragment>
      <Grid className='grid_holder'>
        <Grid className='BannerGrid'>
          <Banner/>
          <TabItem/>
          <About/>
          <Project/>
          <Experienc/>
          <Education/>
        </Grid>
        <Grid className='ItemGrid'>
         <UserList/>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Profile