import React from 'react'
import UserAPI from '../api'
import { Link } from 'react-router-dom'

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
const UserInfo = (props) => {
  const user = UserAPI.get(
    parseInt(props.match.params.id, 10)
  )
  if (!user) {
    return <div>Sorry, but the user was not found</div>
  }
  return (
    <div>
      <h1>{user.name} (#{user.id})</h1>
      <h2>Role: {user.status}</h2>
      <Link to='/roster'>Back</Link>
    </div>
  )
}

export default UserInfo 
