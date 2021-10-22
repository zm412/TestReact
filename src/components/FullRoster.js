import React from 'react'
import UserAPI from '../api'
import { Link } from 'react-router-dom'

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
const FullRoster = () => { 
  console.log(UserAPI.all(), 'all')
  return(
  <div>
  <ul>
  {
    UserAPI.all().map(p => (
      <li key={p.id}>
      <Link to={`/roster/${p.id}`}>{p.name}</Link>
      </li>
    ))
  }
  </ul>
  </div>
)
}
export default FullRoster
