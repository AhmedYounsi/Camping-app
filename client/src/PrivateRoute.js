import React from 'react'
 // eslint-disable-next-line
import {Route, Redirect, Router }from 'react-router-dom'
import { useSelector} from 'react-redux'
export const PrivateRoute = ({component:Component,...rest}) => {
    const auth= useSelector((state )=> state.auth);
    return (
    
    <Route 
    {...rest} 
    render={props => 
    !auth.isAuth ?<Redirect to="/login"/>: 
    <component{...props}/>}/>
    )
}

export default PrivateRoute