import React, { Component } from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import './sign-in.styles.scss'
import {SignInWithGoogle} from '../../firebase/firebase.util'

export default class SignIn extends Component {
    constructor(){
        super();

        this.state={
            email:'',
            password:''
        }
    }

    handleSubmit = (event)=>{
        event.preventDefault();

        this.setState({email:'',password:''});
    }

    handleChange = (event)=>{
        const {name, value} = event.target;
        this.setState({[name]:value})
    }


    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account.</h2>
                <span className="title">Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                      type="email"
                      name="email"
                      value={this.state.email}
                      handleChange={this.handleChange}
                      label="Email"
                      required
                    />
                    <FormInput
                      type="password"
                      name="password"
                      value={this.state.password}
                      handleChange={this.handleChange}
                      label="Password"
                      required
                    />
                    <div className="buttons">
                        <CustomButton type="submit">
                            Sign in
                        </CustomButton>
                        <CustomButton onClick={SignInWithGoogle} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton> 
                    </div>
                   
                </form>
            </div>
        )
    }
}
