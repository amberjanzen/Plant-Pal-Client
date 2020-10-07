import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './Components/Site/Header'
import Footer from './Components/Site/Footer'
import NavBar from './Components/Site/NavBar'

type SessionData = {
 token: string|null,
  authenticated: boolean
}
let currentToken = window.localStorage.getItem('token')
let newToken = currentToken? true:false

class App extends Component<{},SessionData> {
  constructor(props: {}){
      super(props)
  
      this.state = {
        authenticated: newToken,
        token: currentToken
      }
      this.updateToken = this.updateToken.bind(this)
    }
    updateToken (newToken:string, authenticated:boolean):void {
      this.setState({token: newToken, authenticated: authenticated})
      }
  
    // componentDidMount() {
    //   if(localStorage.getItem('token')){
    //     this.setState({
    //       sessionToken: localStorage.getItem('token')
    //     })
          
    //   }
    // }
  
    //  updateToken = (newToken: string) => {
    //   localStorage.setItem('token', newToken);
    //   this.setState({
    //     sessionToken: newToken
    //   })
    //   // console.log(sessionToken);
    // }
  
    //  clearToken =  () => {
    //   localStorage.clear();
    //   this.setState({
    //     sessionToken: ''
    //   })
    // }

render() {
  return (
    <div className="App">
      <Header />
      <Router>
        <NavBar updateToken={this.updateToken} sessionData={this.state}  />

      </Router>
      <Footer />
    </div>
  );
}
}
export default App;