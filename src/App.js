import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router, Route,Switch,Redirect } from "react-router-dom";
import { Provider } from 'react-redux'
import history from "./History/History"
import store from "./Redux/ConfigureStore"

import Header from "./Component/Header/Header"

import Home from "./Component/Home/Home"
import Event from "./Component/Event/Event"
import Contact from "./Component/Contact/Contact"

const AppRouter = () =>{
  return <Router history={history}>
          <main>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/event" component={Event} />
              <Route exact path="/contact" component={Contact} />
              <Redirect to="/" />
            </Switch>
          </main>
        </Router>
}

class App extends React.Component{
  render(){
    return (
      <Provider store={store}>
      <React.Fragment>
        <CssBaseline />
        <AppRouter />
     </React.Fragment>
    </Provider>
      
    );
  }
}
 
export default App


