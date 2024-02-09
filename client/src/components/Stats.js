import axios from "axios";
import React, { useEffect, useState } from 'react';

export default function Stats(props) {
    const [userList, setUserList] = useState([]);
    const [gameList, setGameList] = useState([]);
    const [sortedUsers, setSortedUsers] = useState(userList);
    const [sortedGames, setSortedGames] = useState(gameList);
    const [sortedHourGames, setHourGames] = useState([]);




    
    const [sortNameOrder, setSortNameOrder] = useState('default');
    const [sortWinsOrder, setWinsSortOrder] = useState('default');
    const [sortLossOrder, setLossSortOrder] = useState('default');
    const [sortGuessOrder, setGuessSortOrder] = useState('default');

    const [sortAllTimeName, setAllTimeNameOrder] = useState('default');
    const [sortAllTimeName2, setAllTimeNameOrder2] = useState('default');
    const [sortAllTimeWinner, setAllTimeWinner] = useState('default');
    const [sortAllTimeLoser, setAllTimeLoser] = useState('default');

    const [sortHourName, setHourNameOrder] = useState('default');
    const [sortHourName2, setHourNameOrder2] = useState('default');
    const [sortHourWinner, setHourWinner] = useState('default');
    const [sortHourLoser, setHourLoser] = useState('default');



    useEffect(() => {
        axios.get('http://localhost:8000/users').then(res => {

            setUserList(res.data);
            setSortedUsers(res.data);

        });

        axios.get('http://localhost:8000/gamesAllInfo').then(res => {
            setGameList(res.data);
            setSortedGames(res.data);

            let hourList = res.data
            setHourGames(hourList.filter((game) => {
                const gameTimestamp = new Date(game.date).getTime();
                return currentTimestamp - gameTimestamp < 3600000;
            }));
        });

    }, []);


    console.log(userList);
    console.log(gameList);

    const handleSortHourGames = (param) => {
        let sorted;

        if(param == 'Name1'){

            switch (sortHourName){

                case 'default':
                    console.log("hi");
                    sorted = [...sortedHourGames].sort((a,b) => userList.find((user) => (user._id === a.players[0])).name.localeCompare(userList.find((user) => (user._id === b.players[0])).name));
                    setHourNameOrder("alphabetical");
                    break;
                case 'alphabetical':
                    sorted = [...sortedHourGames].sort((a,b) => userList.find((user) => (user._id === b.players[0])).name.localeCompare(userList.find((user) => (user._id === a.players[0])).name));
                    setHourNameOrder("reverse");
                    break;
                case 'reverse':
                    sorted = sortedHourGames;
                    setHourNameOrder('default');
                    break;
                default:
                    sorted = sortedHourGames;
                
                
            }

            setHourGames(sorted);

        }

        if(param == 'Name2'){

            switch (sortHourName2){
                case 'default':
                    sorted = [...sortedHourGames].sort((a,b) => userList.find((user) => (user._id === a.players[1])).name.localeCompare(userList.find((user) => (user._id === b.players[1])).name));
                    setHourNameOrder2("alphabetical");
                    break;
                case 'alphabetical':
                    sorted = [...sortedHourGames].sort((a,b) => userList.find((user) => (user._id === b.players[1])).name.localeCompare(userList.find((user) => (user._id === a.players[1])).name));
                    setHourNameOrder2("reverse");
                    break;
                case 'reverse':
                    sorted = sortedHourGames;
                    setHourNameOrder2('default');
                    break;
                default:
                    sorted = sortedHourGames;
                
                
            }

            setHourGames(sorted);

        }

        if(param == 'NameWin'){

            switch (sortHourWinner){
                case 'default':
                    sorted = [...sortedHourGames].sort((a, b) => {
                        if (!a.winner || !b.winner) return 1; 

                        return userList.find(user => user._id === a.winner).name.localeCompare(userList.find(user => user._id === b.winner).name);
                    });
                    setHourWinner("alphabetical");
                    break;
                case 'alphabetical':
                    sorted = [...sortedHourGames].sort((a, b) => {
                        if (!a.winner || !b.winner) return 1; 

                        return userList.find(user => user._id === b.winner).name.localeCompare(userList.find(user => user._id === a.winner).name);
                    });
                    setHourWinner("reverse");
                    break;
                case 'reverse':
                    sorted = sortedHourGames;
                    setHourWinner('default');
                    break;
                default:
                    sorted = sortedHourGames;
                
                
            }

            setHourGames(sorted);

        }

        if(param == 'NameLose'){

            switch (sortHourLoser){
                case 'default':
                    sorted = [...sortedHourGames].sort((a, b) => {
                        if (!a.winner || !b.winner) return 1; 

                        return userList.find(user => user._id === a.loser).name.localeCompare(userList.find(user => user._id === b.loser).name);
                    });
                    setHourLoser("alphabetical");
                    break;
                case 'alphabetical':
                    sorted = [...sortedHourGames].sort((a, b) => {
                        if (!a.winner || !b.winner) return 1; 

                        return userList.find(user => user._id === b.loser).name.localeCompare(userList.find(user => user._id === a.loser).name);
                    });
                    setHourLoser("reverse");
                    break;
                case 'reverse':
                    sorted = sortedHourGames;
                    setHourLoser('default');
                    break;
                default:
                    sorted = sortedHourGames;
                
                
            }

            setHourGames(sorted);

        }

        
    }

    const handleSortAllTimeGames = (param) => {
        let sorted;

        if(param == 'Name1'){
            console.log(gameList);
            switch (sortAllTimeName){

                case 'default':
                    sorted = [...gameList].sort((a,b) => userList.find((user) => (user._id === a.players[0])).name.localeCompare(userList.find((user) => (user._id === b.players[0])).name));
                    setAllTimeNameOrder("alphabetical");
                    break;
                case 'alphabetical':
                    sorted = [...gameList].sort((a,b) => userList.find((user) => (user._id === b.players[0])).name.localeCompare(userList.find((user) => (user._id === a.players[0])).name));
                    setAllTimeNameOrder("reverse");
                    break;
                case 'reverse':
                    sorted = gameList;
                    setAllTimeNameOrder('default');
                    break;

                default:
                    sorted = gameList;
                
                
            }

            setSortedGames(sorted);

        }

        if(param == 'Name2'){

            switch (sortAllTimeName2){
                case 'default':
                    sorted = [...gameList].sort((a,b) => userList.find((user) => (user._id === a.players[1])).name.localeCompare(userList.find((user) => (user._id === b.players[1])).name));
                    setAllTimeNameOrder2("alphabetical");
                    break;
                case 'alphabetical':
                    sorted = [...gameList].sort((a,b) => userList.find((user) => (user._id === b.players[1])).name.localeCompare(userList.find((user) => (user._id === a.players[1])).name));
                    setAllTimeNameOrder2("reverse");
                    break;
                case 'reverse':
                    sorted = gameList;
                    setAllTimeNameOrder2('default');
                    break;
                default:
                    sorted = gameList;
                
                
            }

            setSortedGames(sorted);

        }

        if(param == 'NameWin'){

            switch (sortAllTimeWinner){
                case 'default':
                    sorted = [...gameList].sort((a, b) => {
                        if (!a.winner || !b.winner) return 1; 

                        return userList.find(user => user._id === a.winner).name.localeCompare(userList.find(user => user._id === b.winner).name);
                    });
                    setAllTimeWinner("alphabetical");
                    break;
                case 'alphabetical':
                    sorted = [...gameList].sort((a, b) => {
                        if (!a.winner || !b.winner) return 1; 

                        return userList.find(user => user._id === b.winner).name.localeCompare(userList.find(user => user._id === a.winner).name);
                    });
                    setAllTimeWinner("reverse");
                    break;
                case 'reverse':
                    sorted = gameList;
                    setAllTimeWinner('default');
                    break;
                default:
                    sorted = gameList;
                
                
            }

            setSortedGames(sorted);

        }

        if(param == 'NameLose'){

            switch (sortAllTimeLoser){
                case 'default':
                    sorted = [...gameList].sort((a, b) => {
                        if (!a.loser || !b.loser) return 1; 
                        
                        return userList.find(user => user._id === a.loser).name.localeCompare(userList.find(user => user._id === b.loser).name);
                    });
                    setAllTimeLoser('alphabetical');
                    break;
                case 'alphabetical':
                    sorted = [...gameList].sort((a, b) => {
                        if (!a.loser || !b.loser) return 1; 
                        
                        return userList.find(user => user._id === b.loser).name.localeCompare(userList.find(user => user._id === a.loser).name);
                    });
                    setAllTimeLoser('reverse');
                    break;
                case 'reverse':
                    sorted = gameList;
                    setAllTimeLoser('default');
                    break;
                default:
                    sorted = gameList;
                
                
            }

            setSortedGames(sorted);

        }
    }

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
                                <button onClick={() => handleSortHourGames('Name1')}>
                                    {sortHourName === 'default' ? '>' : sortHourName === 'reverse' ? '=' : '<'}
                                </button>
                                </th>
                                <th></th>
                                <th>Player 2
                                <button onClick={() => handleSortHourGames('Name2')}>
                                    {sortHourName2 === 'default' ? '>' : sortHourName2 === 'reverse' ? '=' : '<'}
                                </button>
                                </th>
                                <th>Winner
                                <button onClick={() => handleSortHourGames('NameWin')}>
                                    {sortHourWinner === 'default' ? '>' : sortHourWinner === 'reverse' ? '=' : '<'}
                                </button>
                                </th>
                                <th>Loser
                                <button onClick={() => handleSortHourGames('NameLose')}>
                                    {sortHourLoser === 'default' ? '>' : sortHourLoser === 'reverse' ? '=' : '<'}
                                </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList ? (
                                sortedHourGames.length === 0 ? (
                                    <tr>
                                        <td colSpan="5">No games found</td>
                                    </tr>
                                ) : (
                                    sortedHourGames.map((game) => (
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
                            <th>Player 1
                            <button onClick={() => handleSortAllTimeGames('Name1')}>
                                    {sortAllTimeName === 'default' ? '>' : sortAllTimeName === 'reverse' ? '=' : '<'}
                            </button>
                            </th>
                            <th></th>
                            <th>Player 2
                            <button onClick={() => handleSortAllTimeGames('Name2')}>
                                    {sortAllTimeName2 === 'default' ? '>' : sortAllTimeName2 === 'reverse' ? '=' : '<'}
                            </button>
                            </th>
                            <th>Winner
                            <button onClick={() => handleSortAllTimeGames('NameWin')}>
                                    {sortAllTimeWinner === 'default' ? '>' : sortAllTimeWinner === 'reverse' ? '=' : '<'}
                            </button>
                            </th>

                            <th>Loser
                            <button onClick={() => handleSortAllTimeGames('NameLose')}>
                                    {sortAllTimeLoser === 'default' ? '>' : sortAllTimeLoser === 'reverse' ? '=' : '<'}
                            </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList ? (
                            gameList.length === 0 ? (
                                <tr>
                                    <td colSpan="5">No games found</td>
                                </tr>
                            ) : (
                                sortedGames.map((game) => (
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
                    <tbody>
                        {userList ? ( userList.length == 0 ? (
                                <tr>
                                    <td colSpan="5">No Users found</td>
                                </tr>
                            ) : (
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