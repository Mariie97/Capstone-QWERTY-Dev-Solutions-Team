import './App.css';
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {msg: undefined}
  }

  componentDidMount() {
    fetch("/index").then(response => response.json().then(obj => this.setState({msg: obj[0][1]})));

  }
  render() {

  return (
      <div className="App">
        <header className="App-header">
        {this.state.msg}
        </header>
      </div>
    );
  }
}

export default App;
