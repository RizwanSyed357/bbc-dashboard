import React from 'react'; 
import './Search.css';
import SearchBar from '../SearchBar/SearchBar.js';
import ISiteDashboard from '../ISiteDashboard/ISiteDashboard.js';


const Search = ({searchIcon}) => {
    return (
        <div className='searchContainer'>
            <ISiteDashboard />
            <SearchBar searchIcon={searchIcon}/>
        </div>
    )
}

export default Search 
