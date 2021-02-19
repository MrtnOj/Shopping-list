import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router';
import Layout from '../Layout';
import AddItems from '../AddItems';
import CreateList from '../CreateList/CreateList';
import './App.css';

function App() {

  let routes = (
    <Switch>
      <Route path="/createlist" component={CreateList} />
      <Route path="/" component={AddItems} />
      <Redirect to="/" />
    </Switch>
  )

  return (
    <Layout>
      {routes}
    </Layout>
  );
}

export default withRouter( App );
