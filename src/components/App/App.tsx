import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router'
import Layout from '../Layout'
import AddItems from '../AddItems'
import CreateList from '../CreateList'
import LogIn from '../LogIn'
import Register from '../Register'
import MyLists from '../MyLists'
import ListView from '../ListView'
import UserItemsAndCategories from '../UserItemsAndCategories'
import ListEdit from '../ListEdit'
import './App.css'

function App() {

  let routes = (
    <Switch>
      <Route path="/login" component={LogIn}/>
      <Route path="/register" component={Register}/>
      <Route path="/" component={LogIn} />
      <Redirect to="/" />
    </Switch>
  )

  if ( localStorage.getItem('token') ) {
    routes = (
      <Switch>
        <Route path="/createlist" component={CreateList} />
        <Route path="/additems" component={AddItems} />
        <Route path="/login" component={LogIn}/>
        <Route path="/register" component={Register}/>
        <Route path="/useritems" component={UserItemsAndCategories} />
        <Route path="/mylists/use/:listId" component={ListView} />
        <Route path="/mylists/edit/:listId" component={ListEdit} />
        <Route path="/mylists" component={MyLists}/>
        <Route path="/" component={CreateList} />
        <Redirect to="/" />
    </Switch>
    )
  }

  return (
    <Layout>
      {routes}
    </Layout>
  );
}

export default withRouter( App );
