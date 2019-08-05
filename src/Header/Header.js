import React from 'react'; 
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({icon, userCount, adminCount}) => {
    return (
        <div className='headerContainer'>
            <FontAwesomeIcon className='usersIcon' icon={icon} />

            <div className='headerText'>
                <div>Programmes - Dr Who</div> <br/>
                <div className='headerUserNumberText'>This project has {userCount} users and {adminCount} admins.</div>
            </div>
        
        </div>
    )
}

export default Header