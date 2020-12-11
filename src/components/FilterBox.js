import React from 'react';
import {useState, useEffect} from 'react';
import {TextField,Box, Select, MenuItem, Container,Paper,Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Button, Grid, Typography, Breadcrumbs} from  '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function FilterBox({forOnChange, forFilterEmail, forFilterPhone, forFilterStatus, removeFilter, isCompressed, emailMeaning, phoneMeaning }) {

  const classes = useStyles();
  return (
    <div>
      <Box>
       <TextField id='SearchEmail' defaultValue='' onChange={forOnChange}/>
       <Button onClick={forFilterEmail}  color='primary' size='small' variant='outlined'>Search</Button>
    </Box>
     <Box> 
        <TextField id='SearchPhone' defaultValue='' onChange={forOnChange} />
        <Button onClick={forFilterPhone}  color='primary' size='small' variant='outlined'> Search </Button>
    </Box>
    <Box>
      <Select defaultValue='client' name='SearchStatus' onChange={forOnChange} >
        <MenuItem value='client'>Client</MenuItem>
        <MenuItem value='partner'>Partner</MenuItem>
        <MenuItem value='admin'>Admin</MenuItem>
      </Select>
        <Button onClick={forFilterStatus}  color='primary' size='small' variant='outlined'> Search </Button>
    </Box>
    
    {
      isCompressed && (
        <Button variant='outlined' color='primary' size='small' onClick={removeFilter}>Remove filter </Button>
      )
    }

  </div>

   
  )
}
