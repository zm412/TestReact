import React from 'react';
import {useState, useEffect} from 'react';
import {TextField,Select, MenuItem, Container,Paper,Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Button, Grid, Typography, Breadcrumbs} from  '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FilterBox from './FilterBox';
import TableBox from './TableBox';
import DialogError from './DialogError';
import Layout from './Header';


export default function Home() {

//  localStorage.setItem('users', JSON.stringify([ {id: 1, email: 'kjlj', phoneNumber: 'lkjljlj', name: 'ljljlk', status: 'ljljlkj', created: 'lkjljlk', updated: 'lj;ljkl'} ]))

  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')));
  const [changeUser, setChangeUser] = useState(false);
  const [newItem, setNewItem] = useState(false);
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('client');
  const [created, setCreated] = useState('');
  const [updated, setUpdated] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhoneNumber, setSearchPhoneNumber] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(-1);
  const [changed, setChanged] = useState(-1);
  const [isCompressed, setIsCompressed] = useState(false);
  const [emailValidErr, setEmailValidErr] = useState(false);
  const [phoneNumberValidErr, setPhoneNumberValidErr] = useState(false);
  const [nameValidErr, setNameValidErr] = useState(false);
  const [open, setOpen] = useState(false);
  let errorArr = [emailValidErr, phoneNumberValidErr, nameValidErr];
  const tel = '+7 989 090 78 90'
  console.log(searchStatus)

  const currentPos = (id, arr) => {
    for( let i = 0; i < arr.length; i++ ){
      if(id == arr[i].id) return i
    }
  }

  const ifLocalStorIsEmpty = () => {

  }

  const handleCloseDialogModal = () =>{
    setOpen(false);
  } 

  const handleClickOpenModal = () =>  setOpen(true); 

  const checkFieldValidation = (key) => {
    let nameExp = /^[A-ЯЁA-Z][а-яёa-z]+\s[A-ЯЁA-Z][а-яёa-z]/;
    let phoneExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    let emailExp = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;


    let checkKey = key.split('');
    checkKey[0] = checkKey[0].toLowerCase();
    checkKey = checkKey.join('');
    let str = eval(checkKey).value; 

    if(!nameExp.test(str) && !phoneExp.test(str) && !emailExp.test(str)){
      let validErr = 'set' + key + 'ValidErr' + '(' + true + ')';
      eval(validErr);
    }else{
      let validErr = 'set' + key + 'ValidErr' + '(' + false + ')';
      eval(validErr);
    }
  }

    const onChangeValueForFilter = (e) => {
    e.preventDefault();
    let key;
    if(e.target.id){
      key = 'set' + e.target.id + '("' + e.target.value + '")';
    }else{
      key = 'set' + e.target.name + '("' + e.target.value + '")';
    }
      console.log(key)
    setUpdated(new Date());
    eval(key);
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

  const filterBy = (e) => {

    e.preventDefault();
    let id = e.target.closest('.boxSearch').id;
    let key = id.split('');
    key[0] = key[0].toLowerCase();
    key = key.join('');
    
    let str = 'search' + id;
    let search = eval( str );
    let store = JSON.parse(localStorage.getItem('users'));
    let newStore = store.filter(item => {
      console.log(item[key]);
      console.log(search);
        return item[key] == search
    });
    console.log(newStore)
    setUsers(newStore);
    setNewItem(false);
    setIsCompressed(true);
    
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
    setSearchPhoneNumber('');
    setSearchStatus('client');
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
    setCreated(new Date()) ;
    setUpdated(new Date()); 
    }
   
  }

  useEffect (() => {
    if(changeUser){
      setUsers(JSON.parse(localStorage.getItem('users')))
      setChangeUser(false)
    }
  }, [changeUser])

   
  

  const addItem = () =>{
    removeFilter();
    cancelUpdate();
    setNewItem(true);
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

    <FilterBox forOnChange={onChangeValueForFilter} filterBy={filterBy} isCompressed={isCompressed} removeFilter={removeFilter} emailMeaning={searchEmail} phoneMeaning={searchPhoneNumber} />

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

    
    </div>
    
  )
}
