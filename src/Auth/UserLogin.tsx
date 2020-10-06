import React from "react";
import '../StyleCSS/auth.css'

//login as admin option??

interface LoginState {
   email : string,
   password : string,
   token: boolean,
}

interface UserLoginProps {
      updateToken: (token:string, authToken: boolean) => void

}

export class UserLogin extends React.Component<UserLoginProps, LoginState> {
                   constructor(props: UserLoginProps) {
                    super(props);
                    const initialState = {
                        email : '',
                        password : '',
                        token: true,
                    }
                    this.state = initialState;
                }

  handleSubmit = (event : any) => {
   event.preventDefault();
   fetch(`http://localhost:4000/user/login`, {
       method: "POST",
       body: JSON.stringify({
           email: this.state.email,
           password: this.state.password,
           admin: true,
       }),
       headers: new Headers({
         "Content-Type": "application/json",
       }),
     })
     .then((res) => {
       if (res.status !== 200) {
         res.json().then(err=> {alert(err.error)})
         throw new Error("fetch error");
       } else return res.json();
     })
     .then((data) => {
         this.setState({
            token: data.sessionToken
         })
         console.log(data.sessionToken);
     })
     .catch((err) => console.log(err));
  }

    // type userLogin = {
    //     login: {
    //         email: string,
    //         password: string,
    //     },
    render(){
        return(
            <div className='wrapper'>
            <div className='form-wrapper'>
               <h2>Login</h2>
               <form onSubmit={this.handleSubmit} noValidate >
                  <div className='email'>
                     <label htmlFor="email">Email</label>
                     <input type='email' name='email'/>
                  </div>
                  <div className='password'>
                     <label htmlFor="password">Password</label>
                     <input type='password' name='password'/>
                  </div>
                  <div className='admin'>
                     <label htmlFor="admin">Login as Admin</label>
                     <input type='checkbox' name='Admin'/>
                  </div>
                  <div className='submit'>
                     <button>Login</button>
                     <small>Not Registered? Click here to Signup</small>

                  </div>
             </form>
         </div>
      </div>
        )

    }
}



