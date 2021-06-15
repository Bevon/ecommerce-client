import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";

export default function AdminDashboard(){

    const {user: {name, email, role}} = isAuthenticated();
   

    function AdminInformation(){
        
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
 

    function AdminLinks(){
        
        return (
            <div className='card mb-5'>
                <div className='card-header bg-primary'>Admin Linkss</div>
                <ul className='list-group'>
                    <li className='list-group-item list-group-item-action'>
                        <Link to='/create/category'>Create Category</Link>
                    </li>
                    <li className='list-group-item list-group-item-action'>
                        <Link to='/create/product'>Create Product</Link>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Layout title='DashBoard' description={`Howdy, ${name}`} className='container mt-5'>
            <div className='row'>
                <div className='col-md-3'>
                    {AdminLinks()}
                </div>
                <div className='col-md-9'>
                    {AdminInformation()}
                    
                </div>
            </div>
        </Layout>
    )
        
}