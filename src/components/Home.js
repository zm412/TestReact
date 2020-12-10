import React from 'react';
import {useState, useEffect} from 'react';
import {TextField,Select, MenuItem, Container,Paper,Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Button, Grid, Typography, Breadcrumbs} from  '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Home() {

//  localStorage.setItem('users', JSON.stringify([ {id: 1, email: 'kjlj', phoneNumber: 'lkjljlj', name: 'ljljlk', status: 'ljljlkj', created: 'lkjljlk', updated: 'lj;ljkl'} ]))

  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')));
  const [changeUser, setChangeUser] = useState(false);
  const [newItem, setNewItem] = useState(false);
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('');
  const [created, setCreated] = useState('');
  const [updated, setUpdated] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [isUpdating, setIsUpdating] = useState(-1);
  const [changed, setChanged] = useState(-1);
  const [isCompressed, setIsCompressed] = useState(false);

  const classes = useStyles();

  const currentPos = (id, arr) => {
    for( let i = 0; i < arr.length; i++ ){
      if(id == arr[i].id) return i
    }
  }

  const searchByEmail = () => {
    setIsCompressed(false);
    setIsCompressed(true);
    let store = JSON.parse(localStorage.getItem('users'));
    let newStore = store.filter(item => item.email == searchEmail);
    setUsers(newStore);
    
  }

  const searchByPhone = () => {
    setIsCompressed(false);
    setIsCompressed(true);
    let store = JSON.parse(localStorage.getItem('users'));
    let newStore = store.filter(item => item.phoneNumber == searchPhone);
    setUsers(newStore);
  }


   const rememberState = (pos) => {
    let store = JSON.parse(localStorage.getItem('users'));

      setId(store[pos].id);
      setEmail(store[pos].email);
      setPhoneNumber(store[pos].phoneNumber);
      setName(store[pos].name);
      setCreated(store[pos].created);
      setUpdated(store[pos].updated);
    console.log(email,  phoneNumber,name, status)
  }

  const removeFilter = () => {
    let store = JSON.parse(localStorage.getItem('users'));
    setUsers(store);
    setSearchEmail('');
    setSearchPhone('');
  }



  const saveNewItem = () => {
    let store = JSON.parse(localStorage.getItem('users'));
    let newId = store[store.length - 1].id + 1;
    console.log(newId)
    console.log(store)
    store.push({id: newId,email: email, phoneNumber: phoneNumber, name: name, status: status, created: created, updated: updated});
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

   
  

  const addItem = () =>{
    setNewItem(true);
    setCreated(new Date()) ;
    setUpdated(new Date()); 
  } 
  const closeAddItem = () => setNewItem(false);

  const deleteRow = (e) => {
    e.preventDefault();
    let parent = e.target.closest('.row');
    let id = parent.firstElementChild.innerHTML;
    let store = JSON.parse(localStorage.getItem('users'));
    let newStore = store.filter(item => item.id != id)
    console.log(newStore)
    localStorage.setItem('users', JSON.stringify(newStore));
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
    rememberState(pos)
    setIsUpdating(pos);
    e.preventDefault();
     setChangeUser(true);
  }
 
  const onChangeValue = (e) => {
    e.preventDefault();
    let key;
    if(e.target.id){
      key = 'set' + e.target.id + '("' + e.target.value + '")';
    }else{
      key = 'set' + e.target.name + '("' + e.target.value + '")';
    }
    setUpdated(new Date());
    eval(key);
  }

   const saveUpdate = () => {
    let store = JSON.parse(localStorage.getItem('users'));
    store[isUpdating] = {id: id, email: email, name: name, phoneNumber: phoneNumber, created: created, updated: updated}
    localStorage.setItem('users', JSON.stringify(store));
    setIsUpdating(-1);
    setChangeUser(true);
  }

   
  let tabBody = users.map((row, index) => (
    index != isUpdating ?
            <TableRow key={index} className='row'>
              <TableCell align="right">{row.id}</TableCell>
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
        <TableCell align="right">{row.id}</TableCell>
        <TableCell align="right" ><TextField id='Email' defaultValue={row.email} onChange={onChangeValue}/></TableCell>
        <TableCell align="right"><TextField id='PhoneNumber'  defaultValue={row.phoneNumber} onChange={onChangeValue} /></TableCell>
        <TableCell align="right" ><TextField id='Name' defaultValue={row.name} onChange={onChangeValue}/></TableCell>
        <TableCell align="right" >
            <Select id='Status' name='Status' defaultValue={row.status} onChange={onChangeValue} >
              <MenuItem value='client'>Client</MenuItem>
              <MenuItem value='partner'>Partner</MenuItem>
              <MenuItem value='admin'>Admin</MenuItem>
            </Select>
        </TableCell>

        <TableCell align="right">{row.created}</TableCell>
        <TableCell align="right">{row.updated}</TableCell>
        <TableCell align="right"><Button variant='outlined' onClick={saveUpdate}>Save</Button></TableCell>
        <TableCell align="right"><Button variant='outlined' onClick={cancelUpdate}>Cancel</Button></TableCell>
        </TableRow>
 
          ));

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
          <TableRow>
            <TableCell align="right"></TableCell>
            <TableCell align="right" ><TextField id='SearchEmail' onChange={onChangeValue}/><Button onClick={searchByEmail} variant='outlined'>Search</Button></TableCell>
            <TableCell align="right"><TextField id='SearchPhone'  onChange={onChangeValue} /><Button onClick={searchByPhone} variant='outlined'>Search</Button></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right" >
                <Select defaultValue='client' name='Status' onChange={onChangeValue} >
                  <MenuItem value='client'>Client</MenuItem>
                  <MenuItem value='partner'>Partner</MenuItem>
                  <MenuItem value='admin'>Admin</MenuItem>
                </Select>
            </TableCell>


            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          {tabBody}
    
    {newItem && (
      <TableRow className='row'>
              <TableCell align="right" ></TableCell>
              <TableCell align="right" ><TextField id='Email' onChange={onChangeValue}/></TableCell>
              <TableCell align="right"><TextField id='PhoneNumber' onChange={onChangeValue} /></TableCell>
              <TableCell align="right" ><TextField id='Name' onChange={onChangeValue}/></TableCell>
              <TableCell align="right" >
                <Select defaultValue='client' name='Status' onChange={onChangeValue} >
                  <MenuItem value='client'>Client</MenuItem>
                  <MenuItem value='partner'>Partner</MenuItem>
                  <MenuItem value='admin'>Admin</MenuItem>
                </Select>
              </TableCell>

              <TableCell align="right"><TextField disabled /></TableCell>
              <TableCell align="right"><TextField disabled /></TableCell>
              <TableCell align="right" ></TableCell>
              <TableCell align="right" ></TableCell>
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
          <Button variant='contained' onClick={saveNewItem}>Save new item</Button>
          <Button variant='contained' onClick={closeAddItem}>Cancel</Button>
        </div>
      )
    }

    {
      isCompressed && (
        <Button variant='outlined' onClick={removeFilter}>Remove filter </Button>
      )
    }
    </div>
    
  )
}
