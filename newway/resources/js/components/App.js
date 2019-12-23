import React, { Component } from 'react'
import Main from './Main';
import Editar from './Editar';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <div>
              <Switch>
                <Route exact path='/' component={Main} />
                <Route path='/editar' component={Editar} />
              </Switch>
            </div>
          </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))