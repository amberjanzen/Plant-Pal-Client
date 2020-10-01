import React from "react";


export class UserCreate extends React.Component {
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
               <h2>Sign Up</h2>
               <form onSubmit={this.handleSubmit} noValidate >
                  <div className='firstname'>
                     <label htmlFor="firstname">First Name</label>
                     <input type='text' name='firstname' onChange=            {this.handleChange}/>
                  </div>
                  <div className='lastname'>
                     <label htmlFor="lastname">Last Name</label>
                     <input type='text' name='lastname' onChange=            {this.handleChange}/>
                  </div>
                  <div className='email'>
                     <label htmlFor="email">Email</label>
                     <input type='email' name='email' onChange={this.handleChange}/>
                  </div>
                  <div className='password'>
                     <label htmlFor="password">Password</label>
                     <input type='password' name='password' onChange={this.handleChange}/>
                  </div>
                  {/* <div className='admin'>
                     <label htmlFor="admin">Login as Admin</label>
                     <input type='checkbox' name='Admin' onChange={this.handleChange}/>
                  </div> */}
                  <div className='submit'>
                     <button>Sign up</button>
                  </div>
             </form>
         </div>
      </div>
        )

    }
}