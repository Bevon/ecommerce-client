import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";

export default function UserDashboard(){

    const {user: {name, email, role}} = isAuthenticated();
   

    function UserInformation(){
        
        return (
            <div className='card mb-4' >
                <div className='card-header bg-primary'>User Information</div>
                <ul className='list-group'>
                    <li className='list-group-item list-group-item-action'>{name}</li>
                    <li className='list-group-item list-group-item-action'>{email}</li>
                    <li className='list-group-item list-group-item-action'>{role === 1 ? 'Admin' : 'Registered User'}</li>
                    
                </ul>
            </div>
        );
    }
 
    function PurchaseHistory(){
        return (
            <div className='card mb-5'>
                <div className='card-header bg-primary'>Purchase Information</div>
                <ul className='list-group'>
                    <li className='list-group-item list-group-item-action'>History</li>
                    
                </ul>
            </div>
        );
    }

    function userLinks(){
        
        return (
            <div className='card mb-5'>
                <div className='card-header bg-primary'>User Links</div>
                <ul className='list-group'>
                    <li className='list-group-item list-group-item-action'>
                        <Link to='/cart'>My Cart</Link>
                    </li>
                    <li className='list-group-item list-group-item-action'>
                        <Link to='/profile/update'>Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Layout title='DashBoard' description={`Howdy, ${name}`} className='container mt-5'>
            <div className='row'>
                <div className='col-md-3'>
                    {userLinks()}
                </div>
                <div className='col-md-9'>
                    {UserInformation()}
                    {PurchaseHistory()}
                </div>
            </div>
        </Layout>
    )
        
}