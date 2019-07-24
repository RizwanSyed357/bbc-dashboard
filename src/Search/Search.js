import React from 'react'; 
import './Search.css';
import SearchBar from '../SearchBar/SearchBar.js';
import ISiteDashboard from '../ISiteDashboard/ISiteDashboard.js';

const Search = () => {
    return (
        <div className='searchContainer'>
            <ISiteDashboard />
            <SearchBar />
        </div>
    )
}

export default Search 
