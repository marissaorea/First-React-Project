import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import AuthorForm from './AuthorForm'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      authors: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.addMessage = this.addMessage.bind(this);
  } //end of constructor

  handleSubmit(name, message) {
    fetch('http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: {
        real_name: name,
        message: message,
      }
      })
    })
    .then((response) => {
      return response.json()
    })
    .then((authorObj) => {
      this.addMessage(authorObj)
    })
  } //handles the POST FETCH

  addMessage(author) {
    this.setState({
      authors: this.state.authors
    })
  }

  handleDelete(authorId) {
    fetch(`http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages/${authorId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log('Item was deleted')
    })
  }//handleDelete function

  componentDidMount() {
    fetch('http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages')
      .then((response) => {
        return response.json()
      })
      .then((authorObj) => {
          let authors = authorObj.map((author) => {
            return (
              <div key={author.id}>
                <p>Author: {author.real_name}</p>
                <p>Message: {author.message}</p>
                <button onClick={ () => this.handleDelete(author.id)}> Delete</button>
              </div>
          )
        })
        this.setState({authors: authors}) //updates the state
      })
  } //end of function

  render() {
    return (
      <div>
        <h1 className="App">Author list</h1>
          <AuthorForm handleSubmit={this.handleSubmit} />
          <br></br>
          {this.state.authors}
      </div>
    );
  } //end of render function
}

export default App;
