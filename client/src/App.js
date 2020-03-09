import React from 'react';
import './App.css';

class Article extends React.Component {
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    );
  }
}

class Nav extends React.Component {
  state = {
    list: []
  };

  render() {
    let listTag = [];
    for(let i=0; i<this.props.list.length; i++) {
      let li = this.props.list[i];
      listTag.push(
      <li key={li.id}>
        <a href={li.id} data-id={li.id} onClick={function(e) {
          e.preventDefault();
          console.log('trigger');
          this.props.onClick(e.target.dataset.id);
        }.bind(this)}>
          {li.title}
        </a>
      </li>)
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

class App extends React.Component {
  state = {
    article: {
      title: 'Welcome',
      desc: 'Hello, React &amp; Ajax'
    },
    list: []
  }

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
    return (
      <div>
        <h1>WEB</h1>
        <Nav list={this.state.list} onClick={function(id){
          fetch(id+'.json')
          .then(function(result) {
            return result.json();
          })
          .then(function(json) {
            this.setState({
              article: {
                title: json.title,
                desc: json.desc
              }
            })
          }.bind(this))
        }.bind(this)} />
        <Article title={this.state.article.title} desc={this.state.article.desc} />
      </div>
    );
  }
}

export default App;
