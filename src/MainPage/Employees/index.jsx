/**
 * Crm Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AddClients from '../../_components/forms/AddClients';
import AddClient from '../../_components/modelbox/Addclient';

import Clients from './clients';
import ClientsList from './clientslist';
import EditClient from './editclient';
import Leades from './leades';
import Tickets from './tickets';
import TicketView from './ticketview';

const EmployeeRoute = ({ match }) => (
   <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/clients`} />
      <Route path={`${match.url}/clients`} component={Clients} />
      <Route path={`${match.url}/addclients`} component={AddClients} />
      <Route path={`${match.url}/edit-client/:uid`} component={EditClient} />
      <Route path={`${match.url}/clients-list`} component={ClientsList} />
      <Route path={`${match.url}/leads`} component={Leades} />
      <Route path={`${match.url}/tickets`} component={Tickets} />
      <Route path={`${match.url}/ticket-view`} component={TicketView} />
   </Switch>
);

export default EmployeeRoute;
