import React from 'react';
import {useState, useEffect} from 'react';
import {TextField,Select, MenuItem, Container,Paper,Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Button, Grid, Typography, Breadcrumbs} from  '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FilterBox from './FilterBox';


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
    setIsCompressed(false);
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
      <StyledTableRow key={index} className='row'>
        <StyledTableCell>{row.id}</StyledTableCell>
        <StyledTableCell>{row.email} </StyledTableCell>
        <StyledTableCell>{row.phoneNumber}</StyledTableCell>
        <StyledTableCell>{row.name}</StyledTableCell>
        <StyledTableCell>{row.status}</StyledTableCell>
        <StyledTableCell>{row.created}</StyledTableCell>
        <StyledTableCell>{row.updated}</StyledTableCell>
        <StyledTableCell><Button variant='outlined'  color='primary' size='small' onClick={updateRow}>Redact</Button></StyledTableCell>
        <StyledTableCell><Button variant='outlined'  color='primary' size='small' onClick={deleteRow}>Delete</Button></StyledTableCell>
      </StyledTableRow>
    :
      <StyledTableRow>
        <StyledTableCell>{row.id}</StyledTableCell>
        <StyledTableCell><TextField id='Email' defaultValue={row.email} onChange={onChangeValue}/></StyledTableCell>
        <StyledTableCell><TextField id='PhoneNumber'  defaultValue={row.phoneNumber} onChange={onChangeValue} /></StyledTableCell>
        <StyledTableCell><TextField id='Name' defaultValue={row.name} onChange={onChangeValue}/></StyledTableCell>
        <StyledTableCell>
            <Select id='Status' name='Status' defaultValue={row.status} onChange={onChangeValue} >
              <MenuItem value='client'>Client</MenuItem>
              <MenuItem value='partner'>Partner</MenuItem>
              <MenuItem value='admin'>Admin</MenuItem>
            </Select>
        </StyledTableCell>

        <StyledTableCell>{row.created}</StyledTableCell>
        <StyledTableCell>{row.updated}</StyledTableCell>
        <StyledTableCell><Button variant='outlined'  color='primary' size='small' onClick={saveUpdate}>Save</Button></StyledTableCell>
        <StyledTableCell><Button variant='outlined'  color='primary' size='small' onClick={cancelUpdate}>Cancel</Button></StyledTableCell>
        </StyledTableRow>
 
          ));

  return (
    <div>

    <FilterBox forOnChange={onChangeValue} forFilterEmail={searchByEmail} forFilterPhone={searchByPhone} />

    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
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
    
    {newItem && (
      <StyledTableRow className='row'>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell><TextField id='Email' onChange={onChangeValue}/></StyledTableCell>
              <StyledTableCell><TextField id='PhoneNumber' onChange={onChangeValue} /></StyledTableCell>
              <StyledTableCell><TextField id='Name' onChange={onChangeValue}/></StyledTableCell>
              <StyledTableCell>
                <Select defaultValue='client' name='Status' onChange={onChangeValue} >
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

    { !newItem && (
      <Button variant='contained'  color='primary' size='small' onClick={addItem}>Add item</Button>
    ) }

    {
      newItem && (
        <div>
          <Button variant='contained'  color='primary' size='small' onClick={saveNewItem}>Save new item</Button>
          <Button variant='contained'  color='primary' size='small' onClick={closeAddItem}>Cancel</Button>
        </div>
      )
    }

    {
      isCompressed && (
        <Button variant='outlined' color='primary' size='small' onClick={removeFilter}>Remove filter </Button>
      )
    }

    </div>
    
  )
}
