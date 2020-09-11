import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import User from './User';
import Axios from 'axios'

function App() {
  const [users, setUsers] = useState([])
  useState(() => {
    Axios.get('http://localhost:5000/api/user/')
      .then(res => {
        debugger
        setUsers(res.data)
      })
      .catch(err => {
        debugger
      })
  }, [])
  return (
    <div className="App">
      {users.map(user => {
        return <User user={user} />
      })}
    </div>
  );
}

export default App;
