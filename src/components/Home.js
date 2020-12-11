import React from 'react';
import {useState, useEffect} from 'react';
import {TextField,Select, MenuItem, Container,Paper,Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Button, Grid, Typography, Breadcrumbs} from  '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FilterBox from './FilterBox';
import TableBox from './TableBox';
import DialogError from './DialogError';


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
  const [emailValidErr, setEmailValidErr] = useState(false);
  const [phoneNumberValidErr, setPhoneNumberValidErr] = useState(false);
  const [nameValidErr, setNameValidErr] = useState(false);
  const [open, setOpen] = useState(false);
  let errorArr = [emailValidErr, phoneNumberValidErr, nameValidErr];
  const tel = '+7 989 090 78 90'

  const currentPos = (id, arr) => {
    for( let i = 0; i < arr.length; i++ ){
      if(id == arr[i].id) return i
    }
  }

  const handleCloseDialogModal = () =>{
    setOpen(false);
  } 

  const handleClickOpenModal = () =>  setOpen(true); 

  const checkFieldValidation = (key) => {
    let nameExp = /^[A-ЯЁA-Z][а-яёa-z]+\s[A-ЯЁA-Z][а-яёa-z]/;
    let phoneExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    let emailExp = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;


    let checkKey = key.split();
    checkKey[0].toLowerCase();
    checkKey = checkKey.join();
    let str = eval(checkKey).value; 

    if(!nameExp.test(str) && !phoneExp.test(str) && !emailExp.test(str)){
      let validErr = 'set' + key + 'ValidErr' + '(' + true + ')';
      eval(validErr);
    }else{
      let validErr = 'set' + key + 'ValidErr' + '(' + false + ')';
      eval(validErr);
    }
  }
 
  const onChangeValue = (e) => {
    e.preventDefault();
    let key;
    if(e.target.id){
      key = 'set' + e.target.id + '("' + e.target.value + '")';
    }else{
      key = 'set' + e.target.name + '("' + e.target.value + '")';
    }

    let keyValid =  e.target.id ? e.target.id : e.target.name;
    checkFieldValidation(keyValid)
    
    setUpdated(new Date());
    eval(key);
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
      setStatus(store[pos].status);
      setCreated(store[pos].created);
      setUpdated(store[pos].updated);
  }

  const removeFilter = () => {
    let store = JSON.parse(localStorage.getItem('users'));
    setUsers(store);
    setSearchEmail('');
    setSearchPhone('');
    setIsCompressed(false);
  }



  const saveNewItem = () => {
    if(errorArr.includes(true)){
      setOpen(true)
    }else{
      let store = JSON.parse(localStorage.getItem('users'));
      let newId = store[store.length - 1].id + 1;
      store.push({id: newId,email: email, phoneNumber: phoneNumber, name: name, status: status, created: created, updated: updated});
      localStorage.setItem('users', JSON.stringify(store));
      setChangeUser(true)
      setNewItem(false)
      setOpen(false)
    }
   
  }

  useEffect (() => {
    if(changeUser){
      setUsers(JSON.parse(localStorage.getItem('users')))
      setChangeUser(false)
    }
  }, [changeUser])

   
  

  const addItem = () =>{
    cancelUpdate();
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
    localStorage.setItem('users', JSON.stringify(newStore));
    setChangeUser(true);
  }

   const cancelUpdate = () => {
    setIsUpdating(-1);
    setEmailValidErr(false) ;
    setPhoneNumberValidErr(false) ;
    setNameValidErr(false) ;
    setOpen(false);
  }

  const updateRow = (e) => {
    setChangeUser(true);
    e.preventDefault();
    let parent = e.target.closest('.row');
    let pos = parent.firstElementChild.innerHTML -1;
    rememberState(pos)
    setIsUpdating(pos);
    setChangeUser(true);
  }

   const saveUpdate = () => {
     if(errorArr.includes(false)){
       setOpen(true);
     }else{
       setOpen(false);
      let store = JSON.parse(localStorage.getItem('users'));
      store[isUpdating] = {id: id, email: email, name: name, phoneNumber: phoneNumber, created: created, updated: updated}
      localStorage.setItem('users', JSON.stringify(store));
      setIsUpdating(-1);
      setChangeUser(true);
     }
  }

  console.log(open)
  
  return (
    <div>

    <FilterBox forOnChange={onChangeValue} forFilterEmail={searchByEmail} forFilterPhone={searchByPhone} />

    {
      open && (
        
        <DialogError open={open} handleClose={handleCloseDialogModal} closeRedact={cancelUpdate} />
        
      )
    }

    <TableBox users={users} errArr={errorArr} forOnChange={onChangeValue} isUpd={isUpdating} newItm={newItem} updRow={updateRow} dltRow={deleteRow} saveUpd={saveUpdate} noUpd={cancelUpdate} />


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
