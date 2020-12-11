
import React from 'react';
import {useState, useEffect} from 'react';
import {TextField,Select, MenuItem, Container,Paper,Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Button, Grid, Typography, Breadcrumbs} from  '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
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
    minWidth: 700,
  },
});

export default function TableBox({users, isUpd, newItm, forOnChange, updRow, dltRow, saveUpd, noUpd }) {

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
        <StyledTableCell><Button variant='outlined'  color='primary' size='small' onClick={updRow}>Redact</Button></StyledTableCell>
        <StyledTableCell><Button variant='outlined'  color='primary' size='small' onClick={dltRow}>Delete</Button></StyledTableCell>
      </StyledTableRow>
    :
      <StyledTableRow key={index} className='row'>
        <StyledTableCell>{row.id}</StyledTableCell>
        <StyledTableCell><TextField id='Email' defaultValue={row.email} onChange={forOnChange}/></StyledTableCell>
        <StyledTableCell><TextField id='PhoneNumber'  defaultValue={row.phoneNumber} onChange={forOnChange} /></StyledTableCell>
        <StyledTableCell><TextField id='Name' defaultValue={row.name} onChange={forOnChange}/></StyledTableCell>
        <StyledTableCell>
            <Select id='Status' name='Status' defaultValue={row.status} onChange={forOnChange} >
              <MenuItem value='client'>Client</MenuItem>
              <MenuItem value='partner'>Partner</MenuItem>
              <MenuItem value='admin'>Admin</MenuItem>
            </Select>
        </StyledTableCell>

        <StyledTableCell>{row.created}</StyledTableCell>
        <StyledTableCell>{row.updated}</StyledTableCell>
        <StyledTableCell><Button variant='outlined'  color='primary' size='small' onClick={saveUpd}>Save</Button></StyledTableCell>
        <StyledTableCell><Button variant='outlined'  color='primary' size='small' onClick={noUpd}>Cancel</Button></StyledTableCell>
        </StyledTableRow>
 
          ));

  return (
    <div>


    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" >
        <TableHead>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row" >Id</StyledTableCell>
            <StyledTableCell component="th" scope="row" >Email</StyledTableCell>
            <StyledTableCell  component="th" scope="row" >Phone number</StyledTableCell>
            <StyledTableCell  component="th" scope="row" >Name</StyledTableCell>
            <StyledTableCell  component="th" scope="row" >Status</StyledTableCell>
            <StyledTableCell  component="th" scope="row" >Created</StyledTableCell>
            <StyledTableCell  component="th" scope="row" >Updated</StyledTableCell>
            <StyledTableCell  component="th" scope="row" >Redact</StyledTableCell>
            <StyledTableCell  component="th" scope="row" >Delete</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>

         {tabBody}
    
    {newItm && (
      <StyledTableRow className='row'>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell><TextField id='Email' onChange={forOnChange}/></StyledTableCell>
              <StyledTableCell><TextField id='PhoneNumber' onChange={forOnChange} /></StyledTableCell>
              <StyledTableCell><TextField id='Name' onChange={forOnChange}/></StyledTableCell>
              <StyledTableCell>
                <Select defaultValue='client' name='Status' onChange={forOnChange} >
                  <MenuItem value='client'>Client</MenuItem>
                  <MenuItem value='partner'>Partner</MenuItem>
                  <MenuItem value='admin'>Admin</MenuItem>
                </Select>
              </StyledTableCell>

              <StyledTableCell><TextField disabled /></StyledTableCell>
              <StyledTableCell><TextField disabled /></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          )}
    


        </TableBody>
      </Table>
    </TableContainer>

    </div>
    
  )
}
