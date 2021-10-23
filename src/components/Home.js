import React from 'react';
import {useState, useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FilterBox from './FilterBox';
import TableBox from './TableBox';
import AddItems from './AddItems';
import UpdateItems from './UpdateItems';
import DialogError from './DialogError';
import Layout from './Header';


export default function Home() {

  if(!localStorage.getItem('users')){
    localStorage.setItem('users', JSON.stringify([ {id: 1, email: 'email', phoneNumber: '+7 8235352575', name: 'Firstname Lastname', status: 'client', created: new Date(), updated: new Date()} ]))
  }

  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')));

  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('client');
  const [created, setCreated] = useState();
  const [updated, setUpdated] = useState();


  const [newItem, setNewItem] = useState(false);
  const [changeUser, setChangeUser] = useState(false);
  const [updatingRow, setUpdatingRow] = useState(-1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCompressed, setIsCompressed] = useState(false);
  const [open, setOpen] = useState(false);

  const [emailValidErr, setEmailValidErr] = useState(false);
  const [statusValidErr, setStatusValidErr] = useState(false);
  const [phoneNumberValidErr, setPhoneNumberValidErr] = useState(false);
  const [nameValidErr, setNameValidErr] = useState(false);

  let errorArr = [emailValidErr, phoneNumberValidErr, nameValidErr, statusValidErr];

  const cleanStates = () => {
    setEmail('');
    setPhoneNumber('');
    setName('');
    setStatus('client');
  }

  useEffect(() => {
    updatingRow > -1 ? setIsUpdating(true) : setIsUpdating(false);
  }, [updatingRow]);

  const handleCloseDialogModal = () =>{
    setOpen(false);
  } 


  const handleClickOpenModal = () =>  setOpen(true); 

  const checkFieldValidation = (key) => {

      let nameExp = /^[A-ЯЁA-Z][а-яёa-z]+\s[A-ЯЁA-Z][а-яёa-z]/;
      let phoneExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
      let emailExp = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;
      let statusExp = ['client', 'partner', 'admin'];


      let checkKey = key.split('');
      checkKey[0] = checkKey[0].toLowerCase();
      checkKey = checkKey.join('');
      let str = eval(checkKey);

      if(!nameExp.test(str) && !phoneExp.test(str) && !emailExp.test(str) && !statusExp.includes(str) ){
        let validErr = 'set' + key + 'ValidErr' + '(' + true + ')';
        eval(validErr);
      }else{
        let validErr = 'set' + key + 'ValidErr' + '(' + false + ')';
        eval(validErr);
      }
  }

    const onChangeValueForFilter = (e) => {
    e.preventDefault();
    let key = 'set' + e.target.name + '("' + e.target.value + '")';
    eval(key);
  }

 
  const onChangeValue = (e) => {
    e.preventDefault();
    let key = 'set' + e.target.name + '("' + e.target.value + '")';

    let keyValid = e.target.name;
    checkFieldValidation(keyValid)
    
    setUpdated(new Date());
    eval(key);
  }

  const filterBy = (e) => {

    e.preventDefault();
    let idBox = e.target.closest('.connect').dataset.connect.toLowerCase();
    let key = idBox.toLowerCase();
    
    let search = eval( key );
    let store = JSON.parse(localStorage.getItem('users'));
    let newStore = store.filter(item => item[key] == search
    );
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
      setCreated(store[pos].created);
      setStatus(store[pos].status);
  }

  const removeFilter = () => {
    let store = JSON.parse(localStorage.getItem('users'));
    setUsers(store);
    setIsCompressed(false);
    cleanStates();
  }

   const saveUpdate = () => {
     if(errorArr.includes(true)){
       setOpen(true);
     }else{
       setOpen(false);
      let store = JSON.parse(localStorage.getItem('users'));
      store[updatingRow] = {id: id, email: email, name: name, phoneNumber: phoneNumber,status: status, created: created, updated: new Date()}
      localStorage.setItem('users', JSON.stringify(store));
      setUpdatingRow(-1);
      setIsUpdating(false);
      setChangeUser(true);
      setUpdated(new Date()); 
     }
  }


  const addItem = () =>{
    removeFilter();
    cancelUpdate();
    setNewItem(true);
  } 
 

  const saveNewItem = () => {
    if(errorArr.includes(true) || name == '' || email == '' || phoneNumber == ''){
      setOpen(true)
    }else{
      setUpdated(new Date()); 
      setCreated(new Date()); 
      setOpen(false)

      let store = JSON.parse(localStorage.getItem('users'));
      let newId = store[store.length - 1].id + 1;
      store.push({id: newId,email: email,  name: name,phoneNumber: phoneNumber, status: status, created: new Date(), updated: new Date()});
      localStorage.setItem('users', JSON.stringify(store));
      setChangeUser(true)
      setNewItem(false)
      setStatus('client')
    }
   
  }

  useEffect (() => {
    if(changeUser){
      setUsers(JSON.parse(localStorage.getItem('users')))
      setChangeUser(false)
    }
  }, [changeUser])

   
  
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
    setUpdatingRow(-1);
    setIsUpdating(false);
    setEmailValidErr(false) ;
    setPhoneNumberValidErr(false) ;
    setNameValidErr(false) ;
    setOpen(false);
  }

  const updateRow = (e) => {
    setChangeUser(true);
    e.preventDefault();
    let parent = e.target.closest('.row');
    let id = parent.firstElementChild.innerHTML;
    
    let store = JSON.parse(localStorage.getItem('users'));
    let pos;
    for(let i = 0; i < store.length; i++){
      if(store[i].id == id){
        pos = i;
      }
    }

       
    rememberState(pos)
    setUpdatingRow(pos);
    setChangeUser(true);
  }
  
  return (
    <div>

    <FilterBox forOnChange={onChangeValue} filterBy={filterBy} isCompressed={isCompressed} removeFilter={removeFilter} emailMeaning={email} phoneMeaning={phoneNumber} />

    { open && (
        
        <DialogError open={open} handleClose={handleCloseDialogModal} closeRedact={cancelUpdate} />
        
      ) }

    <TableBox users={users} handleClose={handleCloseDialogModal} errArr={errorArr} forOnChange={onChangeValue} isUpd={updatingRow} newItm={newItem} updRow={updateRow} closeAdd={closeAddItem} dltRow={deleteRow} addItem={addItem} saveItm={saveNewItem} saveUpd={saveUpdate} noUpd={cancelUpdate} />

    {
      isUpdating && (
        <UpdateItems indexRow={updatingRow} forOnChange={onChangeValue} errArr={errorArr} open={isUpdating} handleClose={cancelUpdate}  saveUpd={saveUpdate}/>
      )
    }

    
    </div>
    
  )
}
