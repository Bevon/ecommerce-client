import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Signin from './user/Signin';
import Signup from './user/Signup';
import dotenv from 'dotenv';
import { PrivateRoute } from './auth/privateRoutes';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import { AdminRoute } from './auth/adminRoutes';
import AddCategory from './admin/AddCategory';
import CreateProduct from './admin/CreateProduct';


dotenv.config();



function Routes(){
    return (
        <BrowserRouter>
        <Menu/>
        <Switch>
            <Route path={'/'} exact component={Home}/>
            <PrivateRoute path={'/user/dashboard'} exact component={UserDashboard}/>
            <AdminRoute path={'/admin/dashboard'} exact component={AdminDashboard}/>
            <Route path={'/signin'} exact component={Signin}/>
            <Route path={'/signup'} exact component={Signup}/>
            <AdminRoute path={'/create/category'} exact component={AddCategory}/>
            <AdminRoute path={'/create/product'} exact component={CreateProduct}/>
            
        </Switch>
        </BrowserRouter>
    );
}

export default Routes;