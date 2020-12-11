import React from 'react';
import {useState, useEffect} from 'react';
import {TextField,Box, Select, MenuItem, Container,Paper,Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Button, Grid, Typography, Breadcrumbs} from  '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function FilterBox({forOnChange, forFilterEmail, forFilterPhone }) {

  const classes = useStyles();
  return (
    <div>
      <Box>
       <TextField id='SearchEmail' onChange={forOnChange}/>
       <Button onClick={forFilterEmail}  color='primary' size='small' variant='outlined'>Search</Button>
    </Box>
     <Box> 
        <TextField id='SearchPhone'  onChange={forOnChange} />
        <Button onClick={forFilterPhone}  color='primary' size='small' variant='outlined'> Search </Button>
    </Box>
    <Box>
      <Select defaultValue='client' name='Status' onChange={forOnChange} >
        <MenuItem value='client'>Client</MenuItem>
        <MenuItem value='partner'>Partner</MenuItem>
        <MenuItem value='admin'>Admin</MenuItem>
      </Select>
    </Box>
  </div>

   
  )
}
