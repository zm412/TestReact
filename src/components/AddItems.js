
import React from 'react';
import {useState, useEffect} from 'react';
import {Dialog, Box,TextField,Select, MenuItem, Container,Paper,Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Button, Grid, Typography, Breadcrumbs} from  '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 350,
    height: 900,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  typographyStyle: {
    marginTop: theme.spacing(4),
    marginButtom: theme.spacing(6),
    color: theme.palette.grey[700],
    padding: theme.spacing(4) 
  },
  dialogModal:{
    height: '100%',
    width: '100%',
    borderRadius: '25px',
  },
  boxButton: {
    textAlign: 'center',
  },
  buttonStyle:{
    borderRadius: 41,
  }


}))

export default function AddItems({forOnChange, errArr,open, handleClose, closeRedact,saveItem }) {
  console.log(errArr)

 const classes = useStyles();

  
  return (
    <div>
  
    <Dialog  onClose={handleClose} open={open}>
    <Grid container direction='column'>
         <Paper component="form" className={classes.dialogModal}>
      <Grid item xs={12}> 
            <Box m={3}>
              <TextField 
                helperText={errArr[0]?'Incorrect entry': ''} 
                error={errArr[0]} 
                placeholder='email'
                name='Email'  
                onChange={forOnChange}
              />
            </Box>
    </Grid>

      <Grid item xs={12}> 
            <Box m={3}>
              <TextField 
                helperText={errArr[1]?'Incorrect entry': ''} 
                placeholder='telephone number'
                error={errArr[1]} 
                name='PhoneNumber' 
                onChange={forOnChange} 
              />
            </Box>
    </Grid>
      <Grid item xs={12}> 
            <Box m={3}>
              <TextField 
                name='Name' 
                error={errArr[2]} 
                placeholder='name'
                helperText={errArr[2] ?'Incorrect entry': ''} 
                onChange={forOnChange}
              />
            </Box>
    </Grid>
      <Grid item xs={12}> 
            <Box m={3}>
              <Select defaultValue='client' name='searchStatus' onChange={forOnChange} >
                <MenuItem value='client'>Client</MenuItem>
                <MenuItem value='partner'>Partner</MenuItem>
                <MenuItem value='admin'>Admin</MenuItem>
              </Select>
            </Box>
    </Grid>
      <Grid item xs={12}> 
        <Box m={3}>
          <Button variant='contained'  color='primary' size='small' onClick={saveItem}>Save new item</Button>
          <Button variant='contained'  color='primary' size='small' onClick={handleClose}>Cancel</Button>
    </Box>
    </Grid>

         </Paper>
    </Grid>
    </Dialog>
   </div>
    
  )
}
