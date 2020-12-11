import React from 'react';
import {useState, useEffect} from 'react';
import {TextField,Box, Select, MenuItem, Container,Paper,Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Button, Grid, Typography, Breadcrumbs} from  '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  table: {
  },
});

export default function FilterBox({forOnChange,filterBy, removeFilter, isCompressed, emailMeaning, phoneMeaning }) {

  const classes = useStyles();
  return (
    <div>
      <Box  id='Email' className='boxSearch'>
       <TextField id='SearchEmail'  defaultValue={emailMeaning} onChange={forOnChange}/>
       <Button onClick={filterBy}  color='primary' size='small' variant='outlined'>Search</Button>
    </Box>
     <Box id='PhoneNumber' className='boxSearch'> 
        <TextField id='SearchPhoneNumber' defaultValue={phoneMeaning} onChange={forOnChange} />
        <Button onClick={filterBy} color='primary' size='small' variant='outlined'>Search</Button>
    </Box>
    <Box id='Status' className='boxSearch'>
      <Select defaultValue='client' name='SearchStatus' onChange={forOnChange} >
        <MenuItem value='client'>Client</MenuItem>
        <MenuItem value='partner'>Partner</MenuItem>
        <MenuItem value='admin'>Admin</MenuItem>
      </Select>
        <Button onClick={filterBy}  color='primary' size='small' variant='outlined'> Search </Button>
    </Box>
    
    {
      isCompressed && (
        <Button variant='outlined' color='primary' size='small' onClick={removeFilter}>Remove filter </Button>
      )
    }

  </div>

   
  )
}
