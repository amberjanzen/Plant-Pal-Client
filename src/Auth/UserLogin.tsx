import React from "react";
import '../StyleCSS/auth.css'

export class UserLogin extends React.Component {
    handleChange = (event : any) => {}
  handleSubmit = (event : any) => {}

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
                     <input type='email' name='email' onChange={this.handleChange}/>
                  </div>
                  <div className='password'>
                     <label htmlFor="password">Password</label>
                     <input type='password' name='password' onChange={this.handleChange}/>
                  </div>
                  <div className='admin'>
                     <label htmlFor="admin">Login as Admin</label>
                     <input type='checkbox' name='Admin' onChange={this.handleChange}/>
                  </div>
                  <div className='submit'>
                     <button>Login</button>
                  </div>
             </form>
         </div>
      </div>
        )

    }
}



