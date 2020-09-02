import React from 'react';

// Only the Signin component really cares about whether the email/password combination is correct (email/password validation should exist in a separate sphere from the rest of the components),
// so make it a smart component
class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onSubmitSignIn = () => {
        // console.log(this.state);
        fetch('http://localhost:3000/signin', { // fetch() by default does a GET request, but we can pass in a custom method to make it do a POST request
            method: 'post',
            headers: {'Content-Type': 'application/json'}, // We wrap Content-Type in quotes because it has a hyphen (standard Javascript Object stuff)
            body: JSON.stringify({ // Need to convert it to JSON to send it 
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json()) // Get whatever the server responds with - in this case, with a "success" (see server code)
            .then(data => {
                console.log(data);
                if (data === 'success') {
                    // this.props.onRouteChange('home');
                }
            })
        // this.props.onRouteChange('home');
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                onChange={this.onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                onChange={this.onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input 
                            onClick={this.onSubmitSignIn}
                            // onClick={() => onRouteChange('home')} // If you just had onRouteChange('home'), it'd call the function (you want to pass a function reference). So, pass in an anonymous arrow function.
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </form>
                </main>
            </article>
        )
    }
}

export default Signin;