import React from 'react'; 
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = ({searchIcon}) => {
    return (
        <span> 
            <FontAwesomeIcon className='searchIcon' icon={searchIcon}/>
            <input className='searchBar' type='search' placeholder='Programmes - Dr Who'></input>
        </span>
    )
}

export default SearchBar