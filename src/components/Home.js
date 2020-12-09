import React from 'react'
import {Container,Paper,Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Button, Grid, Typography, Breadcrumbs} from  '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Home() {

  const classes = useStyles();

  localStorage.setItem('users', JSON.stringify([{ email: 'email', phoneNumber: 'phoneNumber', name: 'name', status: 'status', created: 'createdData', updated: 'updatedData', redactItem: 'Redact', updateItem: 'Update' , deleteItem: 'Delete'}, {email: 1, phoneNumber: 2,name: 3,status: 4, created: new Date(), updated: new Date(),redactItem: 'buttonRedact', updateItem: 'buttonUpdate',deleteItem: 'buttonDelete'}]))  ;

  const getUsers = () => {
    return JSON.parse(localStorage.getItem('users'));
  }

  let style = { table: {
    border: '1px solid black'
  } }

  let users = getUsers();

   

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Phone number</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Created</TableCell>
            <TableCell align="right">Updated</TableCell>
            <TableCell align="right">Redact</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row, index) => (
            <TableRow key={row.index}>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.created}</TableCell>
              <TableCell align="right">{row.updated}</TableCell>
              <TableCell align="right">{row.redactItem}</TableCell>
              <TableCell align="right">{row.updateItem}</TableCell>
              <TableCell align="right">{row.deleteItem}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
