
import React from 'react'
import { Link } from 'react-router-dom'
import { IconButton,Grid, Button , Divider, Box,Typography, Container,  Breadcrumps, AppBar, Toolbar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';


  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: '#C39BD3',
    },
    menuButton: {
      color: 'white',
    },
    title: {
      flexGrow: 1,
      color: 'white',
    },

    divider: {
      height: 30,
      color: 'white'
    },
    
    iconPerson: {
    borderRadius: '50%',
  },
 
  }));

export default function Header(){

  const classes = useStyles();

  

  return (
    <Grid container alignItems="flex-start" className ={classes.root} justify="flex-end" direction="row">
        <Toolbar>
      <Box mr={2} align-content='flex-end' className={classes.icon}>
       <Link to='/schedule'>
        <a style={{textDecoration:'none', color: 'white'}}>
          Schedule 
        </a>
      </Link>
      </Box>
 
      <Box mr={2} align-content='flex-end' className={classes.icon}>
       <Link to='/roster'>
        <a style={{textDecoration:'none', color: 'white'}}>
           Roster
        </a>
      </Link>
      </Box>
        <Divider className={classes.divider} orientation="vertical" />

      <Box mr={2} align-content='flex-end' className={classes.icon}>
        <IconButton edge='end' color ='inherit' className={classes.menuButton}  >
            <NotificationsNoneOutlinedIcon />
        </IconButton>
      </Box>

      <Divider className={classes.divider} orientation="vertical" />

    <Box mr={3} ml={2}>
        <Link to='/'>
          <a style={{textDecoration:'none'}}><Typography variant='h6' align='right' className={classes.title}>List</Typography> </a>
       </Link>
    </Box>
    </Toolbar>
    </Grid>

   
  )
  }










