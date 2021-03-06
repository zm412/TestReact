
import React from 'react';
import {useState, useEffect} from 'react';
import {Paper,Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Button, Grid} from  '@material-ui/core';
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


const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%',
  },
  containerTable: {
    justify: 'center',
    textAlign: 'center',
  }
}))
  


export default function TableBox({users,closeAdd, handleClose, isUpd, newItm,addItem, errArr, forOnChange, updRow, dltRow, saveUpd, noUpd , saveItm}) {

 const classes = useStyles();

   
  let tabBody = users.map((row, index) => (
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
              ));

  return (
    <div>


    <Grid container spacing={3} justify='center'>
      <Grid item xs={11}>
    <TableContainer className={classes.containerTable} component={Paper}>
      <Table className={classes.table} size="small" >
        <TableHead>
          <StyledTableRow>

            <StyledTableCell component="th" scope="row" > Id </StyledTableCell>

            <StyledTableCell component="th" scope="row" > Email </StyledTableCell>

            <StyledTableCell component="th" scope="row" > Phone number </StyledTableCell>

            <StyledTableCell component="th" scope="row" > Name </StyledTableCell>

            <StyledTableCell component="th" scope="row" > Status </StyledTableCell>

            <StyledTableCell component="th" scope="row" > Created </StyledTableCell>

            <StyledTableCell component="th" scope="row" > Updated </StyledTableCell>

            <StyledTableCell component="th" scope="row" > Redact </StyledTableCell>

            <StyledTableCell component="th" scope="row" > Delete </StyledTableCell>

          </StyledTableRow>
        </TableHead>
      <TableBody>

    
         {tabBody}
   



        </TableBody>
      </Table>
    </TableContainer>
    </Grid>

     
        {newItm && (
          
          <AddItems forOnChange={forOnChange} errArr={errArr} open={newItm} handleClose={closeAdd} saveItm={saveItm}/>
         )}
        

        { !newItm && (
        <Grid item xs={12} className={classes.containerTable}>
          <Button variant='contained'  color='primary' size='small' onClick={addItem}>Add item</Button>
        </Grid>
        ) }



    </Grid>

    </div>
    
  )
}
