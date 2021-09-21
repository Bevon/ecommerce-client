import {Link, withRouter} from 'react-router-dom';
import {Fragment} from 'react';
import { signout , isAuthenticated} from '../auth';
import { itemTotal } from './CartHelpers';

function  Menu({history}){
    
    function isActive(history, path){
        if(history.location.pathname === path){
            return {color : '#ff9900'}
        }
        else{
            return {color : '#fff'}
        }
    }
    return (
        <div>
            <ul className='nav nav-tab bg-primary p-3' >
                <li className='nav-item'>
                    <Link className='nav-link' to='/' style={isActive(history, '/')}>Home</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/shop' style={isActive(history, '/shop')}>Shop</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/cart' style={isActive(history, '/cart')}>Cart  <sup><small className='badge rounded-pill bg-danger'>{itemTotal()}</small></sup></Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className='nav-item'>
                        <Link className='nav-link' to='/admin/dashboard' style={isActive(history, '/admin/dashboard')}>Dashboard</Link>
                    </li>
                )}
        
                {!isAuthenticated() && (
                    
                    <Fragment>
                        <li className='nav-item '>
                            <Link className='nav-link' to='/signin' style={isActive(history, '/signin')}>Signin</Link>
                        </li>
                         <li className='nav-item'>
                            <Link className='nav-link' to='/signup' style={isActive(history, '/signup')}>Signup</Link>
                        </li>
                    </Fragment>
                    
                )}
                <li className='nav-item'>
                    <span className='nav-link' onClick={() => signout(function(){history.push('/')})} style={{cursor:'pointer', color:'#ffffff', display : !isAuthenticated() ? 'none' :'' }}>Signout</span>
                </li>
            </ul>
        </div>
    );
}

export default withRouter(Menu);
