import React, {Component} from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/hompage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.util'

class App extends Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }
  UnsubscribeFromAuth = null

  componentDidMount(){
    this.UnsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth){
        const userRef = createUserProfileDocument(userAuth);

         (await userRef).onSnapshot(snapshot =>{
           this.setState({
             currentUser:{
               id: snapshot.uid,
               ...snapshot.data()
             }
           });
         });
         
      }
      else{
        this.setState({currentUser:userAuth})
      }
    })
  }

  componentWillUnmount(){
    this.UnsubscribeFromAuth();
  }


  render(){
    return (
      <div className="App">
      <Header currentUser={this.state.currentUser}/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/shop' component={ShopPage}/>
        <Route exact path='/signin' component={SignInAndSignUp}/>
      </Switch>
      </div>
    );
  }
}

export default App;
