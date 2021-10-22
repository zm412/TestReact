// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const UserAPI = {
  users: JSON.parse(localStorage.getItem('users')),
  all: function() { return this.users},
  get: function(id) {
    return this.users.find(p => p.id == id)
  }
}

export default UserAPI
