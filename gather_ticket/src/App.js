import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from './routes';
import 'element-theme-default';
class App extends Component {
  componentDidMount() {
    sessionStorage.setItem('userType', '1');
    sessionStorage.setItem('username', 'NULL');
    sessionStorage.setItem('userId', 'NULL');
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
