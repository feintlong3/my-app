import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Ranking from './containers/Ranking';
import Nav from './containers/Nav';
import Reboot from 'material-ui/Reboot';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

class App extends Component {
  render() {
    return (
      <div style={{ paddingLeft: 240 }}>
        <Reboot />
        <AppBar style={{ left: 240 }}>
          <Toolbar>
            <Typography type="title" color="inherit">
              Yahoo!ショッピングランキング
          </Typography>
          </Toolbar>
        </AppBar>

        <Nav />

        <div style={{ marginTop: 64, padding: 32 }}>
          <Switch>
            <Route path="/all" component={Ranking} />
            {/* 各カテゴリーのランキングのルート */}
            <Route
              path="/category/:id"
              render={
                ({ match }) => < Ranking categoryId={match.params.id} />
              }
            />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;