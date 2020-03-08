import React from 'react';
import './App.css';

class Nav extends React.Component {
  state = {
    list: []
  };

  componentDidMount() {
    fetch('list.json')
      .then(function(result) {
        return result.json();
      })
      .then(function(json) {
        console.log(json);
        this.setState({list: json});
      }.bind(this))
  }

  render() {
    let listTag = [];
    for(let i=0; i<this.state.list.length; i++) {
      let li = this.state.list[i];
      listTag.push(<li key={li.id}><a href={li.id}>{li.title}</a></li>)
    }
    return (
      <nav>
        <ul>
          {listTag}
          <h2>Hello</h2>
        </ul>
      </nav>
    );
  }
}

function App() {
  return (
    <div>
      <h1>WEB</h1>
      <Nav />
      <article>
        <h2>Welcome</h2>
        Hello, React &amp; Ajax
      </article>
    </div>
  );
}

export default App;
