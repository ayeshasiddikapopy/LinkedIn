import React from 'react'
import {Grid  } from '@mui/material';
import PostProfile from '../components/PostProfile';
import NewPost from '../components/NewPost';
const Post = () => {
  return (
    <React.Fragment>
      <Grid className='grid_holder'>
        <Grid className='BannerGrid'>
          <NewPost/>
        </Grid>
        <Grid className='ItemGrid'>
          <PostProfile/>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Post