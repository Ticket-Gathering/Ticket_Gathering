import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from './routes';
import 'element-theme-default';
import Cookies from "js-cookie"

class App extends Component {
  componentDidMount() {
    Cookies.set('userType', '1');
    Cookies.set('username', 'NULL');
    Cookies.set('userId', 'NULL');
  }

  render() {
    return (
      <Router>
        {
          routes.map((r, ind) => {
            if (r.exact) {
              return <Route key={ind} path={r.path} component={r.component} exact />;
            }
            return <Route key={ind} path={r.path} component={r.component} />;
          })
        }
      </Router>
    );
  }
}

export default App;
