import '../node_modules/bootstrap/scss/bootstrap.scss';
import React from 'react';
import { render } from 'react-dom';
import Search from './components/Search';
import Plist from './components/Plist';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {"keyword": ""};
    this.refreshKeyword = this.refreshKeyword.bind(this);
  }

  refreshKeyword(name) {
    this.setState({"keyword": name});
  }

  render() {
    return (
      <div className="container">
        <section className="jumbotron">
          <h3 className="jumbotron-heading">Search Github Users</h3>
          <Search sendAction={this.refreshKeyword}/>
        </section>

        <Plist keyword={this.state.keyword}/>
    </div>
    );
  }
}

render(<App />, document.getElementById('app'));
