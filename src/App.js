import React, {Component} from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import HomePage from './pages/homepage/hompage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.util'
import {setCurrentUser} from './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selectors'

class App extends Component {
  
  UnsubscribeFromAuth = null

  componentDidMount(){

    const {setCurrentUser} = this.props;
    this.UnsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth){
        const userRef = createUserProfileDocument(userAuth);

         (await userRef).onSnapshot(snapshot =>{
           setCurrentUser({
               id: snapshot.id,
               ...snapshot.data()
           });
         });
         
      }
      else{
        setCurrentUser(userAuth);
        
      }
    })
  }

  componentWillUnmount(){
    this.UnsubscribeFromAuth();
  }


  render(){
    return (
      <div className="App">
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route  path='/shop' component={ShopPage}/>
        <Route  path='/checkout' component={CheckoutPage} />
        <Route  path='/signin' render={()=> this.props.currentUser ? <Redirect to='/'/> : <SignInAndSignUp/> } />
      </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
