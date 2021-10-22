import React from 'react';
import {useState, useEffect} from 'react';
import {Divider,IconButton, InputBase, Box, Select, MenuItem, Container,Paper, Button, Grid, Typography, Breadcrumbs} from  '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
  root: {
  },
  block: {
    width: '100%',
  },
  paper:{
    padding: '2px 4px',
    margin: '15px 0',
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


const SearchField = (props) => {
  
  const classes = useStyles();

  return(
   <Grid item xs={12} className='connect' data-connect={props.name}>
           <Paper component="form" className={classes.paper}>
              <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
              </IconButton>
    
    {
      props.name == 'Status' ?
                 <Select value='0' className={classes.input} name='Status' onChange={props.forOnChange} >
                  <MenuItem value='0' disabled>Поиск по статусу</MenuItem>
                  <MenuItem value='client'>Client</MenuItem>
                  <MenuItem value='partner'>Partner</MenuItem>
                  <MenuItem value='admin'>Admin</MenuItem>
                </Select>   
        :
          <InputBase
                    className={classes.input}
                    name={props.name} 
                    defaultValue={props.meaning} 
                    onChange={props.forOnChange} 
                    placeholder={props.title}
                    inputProps={{ 'aria-label': 'search google maps' }}
                />

    }
               <Button 
                    
                    onClick={props.filterBy}  
                    color='primary' 
                    startIcon={<Icon/>}
                >
              </Button>
                <Divider className={classes.divider} orientation="vertical" />
                <Divider className={classes.divider} orientation="vertical" />
          </Paper>
    </Grid>
  
  )
}


export default function FilterBox(props) {

  let searchFieldsInfo = [ {name:'Email', title: 'Поиск по email'}, { name: "PhoneNumber", title: "Поиск по номеру телефона"}, {name: "Status", title: ''} ]

  const classes = useStyles();

  return (
        <div className={classes.block}>
    <Grid container spacing={2} sx={{ flexGrow: 1 }} >
        <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={1}>
        {
        searchFieldsInfo.map((n, i) => <div key={i}><SearchField name={n.name} title={n.title} {...props} /> </div>)
        }
            </Grid>

      </Grid>
    </Grid>
    
    {
      props.isCompressed && (

        <Grid container display='flex' justify='flex-start'>
          <Grid item xs={12} className={classes.buttonRemove} >
              <Button variant='outlined' color='primary' size='small' onClick={props.removeFilter}>Remove filter</Button>
          </Grid>
        </Grid>

      )
    }

  </div>

   
  )
}
