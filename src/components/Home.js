import { React, useState, useEffect } from 'react'

export default function Home() {



  localStorage.setItem('users', JSON.stringify([[ 'email', 'phoneNumber', 'name', 'status', 'createdData', 'updatedData' ], [1,2,3,4,5,6]]
  )) 
  
  const updateStore = (arr) => {
    let store = await JSON.parse( localStorage.getItem('users')) ;
    await store.push(arr); 
    await localStorage.setItem('users', JSON.stringify(store))
  }


  const getUsers = () => {
    return JSON.parse(localStorage.getItem('users'));
  }

  let style = { table: {
    border: '1px solid black'
  } }

  let users = getUsers();

  let tableTr = users.map((item, indexTr) =>{
    let tableTd = item.map((current, indexTd) => <td key={indexTd}>{current}</td>) ;
    return <tr key={indexTr}>{tableTd}</tr>
  } )

   

  return (
    <table className={style.table}>{tableTr}</table>
    <button onClick={addItem}>Добавить</button>
  )
}
