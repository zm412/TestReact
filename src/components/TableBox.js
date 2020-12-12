
import React from 'react';
import {useState, useEffect} from 'react';
import {TextField,Select, MenuItem, Container,Paper,Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Button, Grid, Typography, Breadcrumbs} from  '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AddItems from './AddItems';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#8A858C',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    maxWidth: 700,
  },
});

export default function TableBox({users, handleClose, isUpd, newItm,addItem, errArr, forOnChange, updRow, dltRow, saveUpd, noUpd , saveItm}) {
  console.log(errArr)

 const classes = useStyles();

   
  let tabBody = users.map((row, index) => (
    index != isUpd ?
      <StyledTableRow key={index} className='row'>
        
        <StyledTableCell>{row.id}</StyledTableCell>
        <StyledTableCell>{row.email} </StyledTableCell>
        <StyledTableCell>{row.phoneNumber}</StyledTableCell>
        <StyledTableCell>{row.name}</StyledTableCell>
        <StyledTableCell>{row.status}</StyledTableCell>
        <StyledTableCell>{row.created}</StyledTableCell>
        <StyledTableCell>{row.updated}</StyledTableCell>

        <StyledTableCell>
          <Button variant='outlined'  color='primary' size='small' onClick={updRow}>
            Redact
          </Button>
        </StyledTableCell>

        <StyledTableCell>
          <Button variant='outlined'  color='primary' size='small' onClick={dltRow}>
            Delete
          </Button>
        </StyledTableCell>

      </StyledTableRow>
    :
      <StyledTableRow key={index} className='row'>
        <StyledTableCell>{row.id}</StyledTableCell>

        <StyledTableCell>
          <TextField name='Email' 
            helperText={errArr[0]?'Incorrect entry': ''} 
            error={errArr[0]} 
            defaultValue={row.email} 
            onChange={forOnChange}
          />
        </StyledTableCell>

        <StyledTableCell>
          <TextField 
            helperText={errArr[1]?'Incorrect entry': ''} 
            error={errArr[1]}name='PhoneNumber'  
            defaultValue={row.phoneNumber} 
            onChange={forOnChange} 
          />
        </StyledTableCell>

        <StyledTableCell>
          <TextField name='Name' 
            helperText={errArr[2]?'Incorrect entry': ''} 
            error={errArr[2]} 
            defaultValue={row.name} 
            onChange={forOnChange}/>
        </StyledTableCell>

        <StyledTableCell>
            <Select name='Status' name='Status' defaultValue='client' onChange={forOnChange} >
              <MenuItem value='client'>Client</MenuItem>
              <MenuItem value='partner'>Partner</MenuItem>
              <MenuItem value='admin'>Admin</MenuItem>
            </Select>
        </StyledTableCell>

        <StyledTableCell>{row.created}</StyledTableCell>
        <StyledTableCell>{row.updated}</StyledTableCell>

        <StyledTableCell>
          <Button variant='outlined'  color='primary' size='small' onClick={saveUpd}>
            Save
          </Button>
        </StyledTableCell>

        <StyledTableCell>
          <Button variant='outlined'  color='primary' size='small' onClick={noUpd}>
            Cancel
          </Button>
        </StyledTableCell>

        </StyledTableRow>
 
          ));

  return (
    <div>


    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" >
        <TableHead>
          <StyledTableRow>

            <StyledTableCell component="th" scope="row" >
              Id
            </StyledTableCell>

            <StyledTableCell component="th" scope="row" >
              Email
            </StyledTableCell>

            <StyledTableCell component="th" scope="row" >
              Phone number
            </StyledTableCell>

            <StyledTableCell component="th" scope="row" >
              Name
            </StyledTableCell>

            <StyledTableCell component="th" scope="row" >
              Status
            </StyledTableCell>

            <StyledTableCell component="th" scope="row" >
              Created
            </StyledTableCell>

            <StyledTableCell component="th" scope="row" >
              Updated
            </StyledTableCell>

            <StyledTableCell component="th" scope="row" >
              Redact
            </StyledTableCell>

            <StyledTableCell component="th" scope="row" >
              Delete
            </StyledTableCell>

          </StyledTableRow>
        </TableHead>
      <TableBody>

         {tabBody}
    
    {newItm && (
      
    <AddItems forOnChange={forOnChange} errArr={errArr} open={newItm} handleClose={handleClose} saveItm={saveItm}/>
         )}
    
    { !newItm && (
      <Button variant='contained'  color='primary' size='small' onClick={addItem}>Add item</Button>
    ) }




        </TableBody>
      </Table>
    </TableContainer>

    </div>
    
  )
}
