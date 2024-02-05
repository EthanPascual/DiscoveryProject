import axios from "axios";
import React, { useEffect, useState } from 'react';

export default function Stats(props) {
    const [userList, setUserList] = useState([]);
    const [gameList, setGameList] = useState([]);
    const [sortedUsers, setSortedUsers] = useState(userList);
    const [sortNameOrder, setSortNameOrder] = useState('default');
    const [sortWinsOrder, setWinsSortOrder] = useState('default');
    const [sortLossOrder, setLossSortOrder] = useState('default');
    const [sortGuessOrder, setGuessSortOrder] = useState('default');


    useEffect(() => {
        axios.get('http://localhost:8000/users').then(res => {

            setUserList(res.data);
            setSortedUsers(res.data);

        });

        axios.get('http://localhost:8000/games').then(res => {
            setGameList(res.data);
        });

    }, []);

    console.log(userList);
    console.log(gameList);

    const handleSortUsers = (param) => {
        let sorted;

        if(param == 'Name'){

            switch (sortNameOrder) {
                case 'default':
    
                    sorted = [...userList].sort((a, b) => a.name.localeCompare(b.name));
                    setSortNameOrder('alphabetical');
                    break;
    
                case 'alphabetical':
    
                    sorted = [...userList].sort((a, b) => b.name.localeCompare(a.name));
                    setSortNameOrder('reverse');
                    break;
    
                case 'reverse':
    
                    sorted = userList;
                    setSortNameOrder('default');
                    break;
                default:
                    sorted = userList;
            }
    
            setSortedUsers(sorted);

        }
        
        if(param == 'Wins'){

            switch (sortWinsOrder) {
                case 'default':
    
                    sorted = [...userList].sort((a, b) => b.wins - a.wins);
                    setWinsSortOrder('Most');
                    break;
    
                case 'Most':
    
                    sorted = [...userList].sort((a, b) => a.wins - b.wins);
                    setWinsSortOrder('Least');
                    break;
    
                case 'Least':
    
                    sorted = userList;
                    setWinsSortOrder('default');
                    break;
    
                default:
                    sorted = userList;
            }
    
            setSortedUsers(sorted);

        }

        if(param == 'Losses'){
            switch (sortLossOrder) {
                case 'default':
    
                    sorted = [...userList].sort((a, b) => b.losses - a.losses);
                    setLossSortOrder('Most');
                    break;
    
                case 'Most':
    
                    sorted = [...userList].sort((a, b) => a.losses - b.losses);
                    setLossSortOrder('Least');
                    break;
    
                case 'Least':
    
                    sorted = userList;
                    setLossSortOrder('default');
                    break;
    
                default:
                    sorted = userList;
            }
    
            setSortedUsers(sorted);
        }

        if(param == 'Guesses'){
            switch (sortGuessOrder) {
                case 'default':
    
                    sorted = [...userList].sort((a, b) => b.totalGuess - a.totalGuess);
                    setGuessSortOrder('Most');
                    break;
    
                case 'Most':
    
                    sorted = [...userList].sort((a, b) => a.totalGuess - b.totalGuess);
                    setGuessSortOrder('Least');
                    break;
    
                case 'Least':
    
                    sorted = userList;
                    setGuessSortOrder('default');
                    break;
    
                default:
                    sorted = userList;
            }
    
            setSortedUsers(sorted);
        }
    
    };



    let currentUser = userList.find(user => user.name == props.user);
    console.log(currentUser);
    let currentTimestamp = new Date().getTime();

    return (
        <>
            <h1 class="home-container">Statistics</h1>
            <h2>{props.user}</h2>
            <div>
                <ul>
                    <li>
                        <strong>Wins:</strong> {currentUser ? currentUser.wins : "Loading..."}
                    </li>
                    <li>
                        <strong>Losses:</strong> {currentUser ? currentUser.losses : "Loading..."}
                    </li>
                    <li>
                        <strong>Total Guesses:</strong>{" "}
                        {currentUser ? currentUser.totalGuess : "Loading..."}
                    </li>
                </ul>

                <div className="lastHourContainer">
                    <div className="lastHourHeader">
                        Recently Played
                    </div>
                    <table className="lastHourTable">
                        <thead>
                            <tr>
                                <th>Player 1
                                </th>
                                <th></th>
                                <th>Player 2</th>
                                <th>Winner</th>
                                <th>Loser</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList ? (
                                gameList.length === 0 ? (
                                    <tr>
                                        <td colSpan="5">No games found</td>
                                    </tr>
                                ) : (
                                    gameList.filter((game) => {
                                        const gameTimestamp = new Date(game.date).getTime();
                                        return currentTimestamp - gameTimestamp < 3600000;
                                    }).map((game) => (
                                        <tr key={game._id}>
                                            <td>
                                                {userList.find((user) => user._id == game.players[0])?.name}
                                            </td>
                                            <td>
                                                vs
                                            </td>
                                            <td>
                                                {userList.find((user) => user._id == game.players[1])?.name}
                                            </td>
                                            <td>{userList.find((user) => user._id == game.winner)?.name}</td>
                                            <td>{userList.find((user) => user._id == game.loser)?.name}</td>
                                        </tr>
                                    ))
                                )
                            ) : (
                                <tr>
                                    <td colSpan="5">User data not available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

            </div>

            <div className="lastHourContainer">
                <div className="lastHourHeader">
                    All Games
                </div>
                <table className="lastHourTable">
                    <thead>
                        <tr>
                            <th>Player 1</th>
                            <th></th>
                            <th>Player 2</th>
                            <th>Winner</th>
                            <th>Loser</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList ? (
                            gameList.length === 0 ? (
                                <tr>
                                    <td colSpan="5">No games found</td>
                                </tr>
                            ) : (
                                gameList.map((game) => (
                                    <tr key={game._id}>
                                        <td>
                                            {userList.find((user) => user._id == game.players[0])?.name}
                                        </td>
                                        <td>
                                            vs
                                        </td>
                                        <td>
                                            {userList.find((user) => user._id == game.players[1])?.name}
                                        </td>
                                        <td>{userList.find((user) => user._id == game.winner)?.name}</td>
                                        <td>{userList.find((user) => user._id == game.loser)?.name}</td>
                                    </tr>
                                ))
                            )
                        ) : (
                            <tr>
                                <td colSpan="5">User data not available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="lastHourContainer">
                <div className="lastHourHeader">
                    Leaderboard
                </div>

                <div className="scrollable"></div>

                <table className="lastHourTable">
                    <thead>
                        <tr>
                            <th>Player Name
                                <button onClick={() => handleSortUsers('Name')}>
                                    {sortNameOrder === 'default' ? '>' : sortNameOrder === 'reverse' ? '=' : '<'}
                                </button>
                            </th>
                            <th>Wins
                                <button onClick={() => handleSortUsers('Wins')}>
                                    {sortWinsOrder === 'default' ? '>' : sortWinsOrder === 'Least' ? '=' : '<'}
                                </button>
                            </th>
                            <th>Losses
                            <button onClick={() => handleSortUsers('Losses')}>
                                    {sortLossOrder === 'default' ? '>' : sortLossOrder === 'Least' ? '=' : '<'}
                                </button>
                            </th>

                            <th>Total Guesses
                            <button onClick={() => handleSortUsers('Guesses')}>
                                    {sortGuessOrder === 'default' ? '>' : sortGuessOrder === 'Least' ? '=' : '<'}
                                </button>
                            </th>


                        </tr>
                    </thead>
                    <tbody className="scrollable">
                        {userList ? (
                            sortedUsers.map((user) => (
                                <tr >
                                    <td>
                                        {user.name}
                                    </td>
                                    <td>
                                        {user.wins}
                                    </td>
                                    <td>
                                        {user.losses}
                                    </td>
                                    <td>
                                        {user.totalGuess}
                                    </td>
                                </tr>
                            )
                            )
                        ) : (
                            <tr>
                                <td colSpan="5">User data not available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </>
    )
}