import React from 'react';
import {useState, useEffect} from 'react';
import {Divider,IconButton, InputBase, Box, Select, MenuItem, Container,Paper, Button, Grid, Typography, Breadcrumbs} from  '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
  root: {
  },
  paper:{
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  buttonRemove:{
    justify: 'center',
    textAlign: 'center',
  }
}));

export default function FilterBox({forOnChange,filterBy,handelClose, removeFilter, isCompressed, emailMeaning, phoneMeaning }) {

  const classes = useStyles();
  return (
        <div>
    <Grid container display='flex' justify='flex-start'>
      <Grid item xs={12} md={4}>
        <Box  id='Email' ml={3} m={2} className='box'>
           <Paper component="form" className={classes.paper}>
              <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
              </IconButton>
                <InputBase
                  className={classes.input}
                 name='Email'  
                  defaultValue={emailMeaning} 
                  placeholder="Поиск по email"
                  onChange={forOnChange}
                  inputProps={{ 'aria-label': 'search google maps' }}
                />
                <Button 
                    onClick={filterBy}  
                    color='primary' 
                    startIcon={<Icon/>}
                > </Button>
      <Divider className={classes.divider} orientation="vertical" />
      <Divider className={classes.divider} orientation="vertical" />
    </Paper>

       </Box>
    </Grid>

    <Grid item xs={12} md={4}>

       <Box  ml={3} m={2} id='PhoneNumber' className='box' > 


           <Paper component="form" className={classes.paper}>
              <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
              </IconButton>
                <InputBase
                    className={classes.input}
                    name='PhoneNumber' 
                    defaultValue={phoneMeaning} 
                    onChange={forOnChange} 
                    placeholder="Поиск по номеру телефона"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <Button 
                    onClick={filterBy}  
                    color='primary' 
                    startIcon={<Icon/>}
                >
              </Button>
                <Divider className={classes.divider} orientation="vertical" />
                <Divider className={classes.divider} orientation="vertical" />
          </Paper>
         
      </Box>
    </Grid>
    <Grid item xs={12} md={4}>
      <Box  ml={3} m={2} id='Status' className='box' >

         <Paper component="form" className={classes.paper}>
            <IconButton className={classes.iconButton} aria-label="menu">
              <MenuIcon />
            </IconButton>
                <Select value='0' className={classes.input} name='Status' onChange={forOnChange} >
                  <MenuItem value='0' disabled>Поиск по статусу</MenuItem>
                  <MenuItem value='client'>Client</MenuItem>
                  <MenuItem value='partner'>Partner</MenuItem>
                  <MenuItem value='admin'>Admin</MenuItem>
                </Select>   

               <Button 
                  onClick={filterBy}  
                  color='primary' 
                  startIcon={<Icon/>}
                >
                </Button>

          <Divider className={classes.divider} orientation="vertical" />
          <Divider className={classes.divider} orientation="vertical" />
        </Paper>


        </Box>
      </Grid>
    </Grid>

    
    {
      isCompressed && (

        <Grid container display='flex' justify='flex-start'>
          <Grid item xs={12} className={classes.buttonRemove} >
              <Button variant='outlined' color='primary' size='small' onClick={removeFilter}>Remove filter</Button>
          </Grid>
        </Grid>

      )
    }

  </div>

   
  )
}
