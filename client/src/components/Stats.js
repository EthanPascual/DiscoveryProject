import axios from "axios";
import React, { useEffect, useState } from 'react';

export default function Stats(props){
    const [userList, setUserList] = useState([]);

  
    useEffect(() => {
        axios.get('http://localhost:8000/users').then(res => {
      
            setUserList(res.data);

        });
    }, []);


    console.log(userList);

    return(
        <>
        <h1>Statistics</h1>

        <div>
            Total Wins:
            <ul>
            {
            [...userList].sort((a, b) => b.wins - a.wins).map((user) => (
                <li key={user._id}>{user.name} - Wins: {user.wins}</li>
            ))
            }
            </ul>
        </div>

        <div>
            Total Losses:
            <ul>
            {
            [...userList].sort((a, b) => b.losses - a.losses).map((user) => (
                <li key={user._id}>{user.name} - Losses: {user.losses}</li>
              ))
            }
            </ul>
        </div>

        <div>
            Total Guesses:
            <ul>
            {
            [...userList].sort((a, b) => b.totalGuess - a.totalGuess).map((user) => (
                <li key={user._id}>{user.name} - Total Guesses: {user.totalGuess}</li>
              ))
            }
            </ul>
        </div>
        </>
    )
}