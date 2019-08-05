import React from 'react'; 
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({icon}) => {
    return (
        <div className='headerContainer'>
            <FontAwesomeIcon className='usersIcon' icon={icon} />

            <div className='headerText'>
                <div>Programmes - Dr Who</div> <br/>
                <div className='headerUserNumberText'>This project has x users and y admin.</div>
            </div>
        
        </div>
    )
}

export default Header