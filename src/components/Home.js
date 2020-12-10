import React from 'react';
import {useState, useEffect} from 'react';
import {TextField, Container,Paper,Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Button, Grid, Typography, Breadcrumbs} from  '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Home() {

  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')))
  const [changeUser, setChangeUser] = useState(false);
  const [newItem, setNewItem] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('');
  const [created, setCreated] = useState('');
  const [updated, setUpdated] = useState('');
  const [isUpdating, setIsUpdating] = useState(-1);

  const classes = useStyles();



  const saveChanges = () => {
    let store = JSON.parse(localStorage.getItem('users'));
    store.push({email: email, name: name, phoneNumber: phoneNumber, created: created, updated: updated});
    localStorage.setItem('users', JSON.stringify(store));
    setChangeUser(true)
    setNewItem(false)
  }

  useEffect (() => {
    if(changeUser){
      setUsers(JSON.parse(localStorage.getItem('users')))
      setChangeUser(false)
    }
  }, [changeUser])


  const addItem = () =>  setNewItem(true);
  const closeAddItem = () => setNewItem(false);

  const deleteRow = (e) => {
    e.preventDefault();
    let parent = e.target.closest('.row');
    let pos = parent.firstElementChild.innerHTML - 1;
    let store = JSON.parse(localStorage.getItem('users'));
    store.splice(pos, 1);
    localStorage.setItem('users', JSON.stringify(store));
    setChangeUser(true);
  }

  const cancelUpdate = () => {
    setIsUpdating(-1);
  }

  const updateRow = (e) => {
    setChangeUser(true)
    e.preventDefault();
    let parent = e.target.closest('.row');
    let pos = parent.firstElementChild.innerHTML - 1;
    setIsUpdating(pos);
  }

  const saveUpdate = () => {
    let store = JSON.parse(localStorage.getItem('users'));
    store[isUpdating] = {email: email, name: name, phoneNumber: phoneNumber, created: created, updated: updated}
    localStorage.setItem('users', JSON.stringify(store));
    setIsUpdating(-1);
    setChangeUser(true);
  }

   
  let tabBody = users.map((row, index) => (
    index != isUpdating ?
            <TableRow key={index} className='row'>
              <TableCell align="right">{index+1}</TableCell>
              <TableCell align="right"> {row.email} </TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.created}</TableCell>
              <TableCell align="right">{row.updated}</TableCell>
              <TableCell align="right"><Button variant='outlined' onClick={updateRow}>Redact</Button></TableCell>
              <TableCell align="right"><Button variant='outlined' onClick={deleteRow}>Delete</Button></TableCell>
            </TableRow>
    :
      <TableRow>
              <TableCell align="right" ></TableCell>
              <TableCell align="right" ><TextField defaultValue={row.email} onChange={(e)=>setEmail(e.target.value)}/></TableCell>
              <TableCell align="right" ><TextField defaultValue={row.name} onChange={(e)=>setName(e.target.value)}/></TableCell>
              <TableCell align="right" ><TextField  defaultValue={row.status} onChange={(e)=>setStatus(e.target.value)}/></TableCell>
              <TableCell align="right"><TextField  defaultValue={row.phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} /></TableCell>
              <TableCell align="right"><TextField  defaultValue={row.created} onChange={(e)=>setCreated(new Date())}/></TableCell>
              <TableCell align="right"><TextField  defaultValue={row.updated} onChange={(e)=>setUpdated(new Date())}/></TableCell>
              <TableCell align="right"><Button variant='outlined' onClick={saveUpdate}>Save</Button></TableCell>
              <TableCell align="right"><Button variant='outlined' onClick={cancelUpdate}>Cancel</Button></TableCell>
            </TableRow>
 
          ))

  return (
    <div>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row" align="right">Id</TableCell>
            <TableCell component="th" scope="row" align="right">Email</TableCell>
            <TableCell  component="th" scope="row" align="right">Phone number</TableCell>
            <TableCell  component="th" scope="row" align="right">Name</TableCell>
            <TableCell  component="th" scope="row" align="right">Status</TableCell>
            <TableCell  component="th" scope="row" align="right">Created</TableCell>
            <TableCell  component="th" scope="row" align="right">Updated</TableCell>
            <TableCell  component="th" scope="row" align="right">Redact</TableCell>
            <TableCell  component="th" scope="row" align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tabBody}
    
    {newItem && (
      <TableRow>
              <TableCell align="right" ></TableCell>
              <TableCell align="right" ><TextField onChange={(e)=>setEmail(e.target.value)}/></TableCell>
              <TableCell align="right" ><TextField onChange={(e)=>setName(e.target.value)}/></TableCell>
              <TableCell align="right" ><TextField onChange={(e)=>setStatus(e.target.value)}/></TableCell>
              <TableCell align="right"><TextField onChange={(e)=>setPhoneNumber(e.target.value)} /></TableCell>
              <TableCell align="right"><TextField onChange={(e)=>setCreated(new Date())}/></TableCell>
              <TableCell align="right"><TextField onChange={(e)=>setUpdated(new Date())}/></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          )}
    


        </TableBody>
      </Table>
    </TableContainer>

    { !newItem && (
      <Button variant='contained' onClick={addItem}>Add item</Button>
    ) }

    {
      newItem && (
        <div>
          <Button variant='contained' onClick={saveChanges}>Save changes</Button>
          <Button variant='contained' onClick={closeAddItem}>Cancel</Button>
        </div>
      )
    }
    </div>
    
  )
}
