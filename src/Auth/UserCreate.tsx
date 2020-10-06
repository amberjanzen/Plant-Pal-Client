import React from "react";
import '../StyleCSS/auth.css';


//first and last name do not show up in pg admin
// how to set admin to true?

const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

interface UserCreateProps {
    updateToken: (token:string, authToken:boolean) => void
 }
 interface UserCreateState {
    firstName : string,
    lastName: string,
    email : string,
    password : string,
    admin: boolean,
    token: string,
    errors : {
       firstName : string,
       lastName : string
       email : string,
       password : string
    }
}

export class UserCreate extends React.Component<UserCreateProps, UserCreateState> {

    handleChange = (event : any) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'email':
                errors.email = Regex.test(value)? '': 'Email is not valid!';
                break;
            case 'password':
                errors.password = value.length < 8 ? 'Password must be eight characters long!': '';
                break;
            default:
            break;
                    }
                    this.setState(Object.assign(this.state, { errors,[name]: value }));
                    console.log(this.state.errors);
                }
                constructor(props: UserCreateProps) {
                    super(props);
                    const initialState = {
                        firstName: '',
                        lastName: '',
                        email : '',
                        password : '',
                        admin: true,
                        token: '',
                        errors: {
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: ''
                        }
                    }
                    this.state = initialState;
                    this.handleChange =this.handleChange.bind(this)
                }
                handleSubmit = (event : any) => {
                    event.preventDefault();
                    fetch(`http://localhost:4000/user/signup`, {
                        method: "POST",
                        body: JSON.stringify({
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
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
                          });
                        console.log(data.sessionToken);
                      })
                      .catch((err) => console.log(err));
                    // let validity = true;
                    // Object.values(this.state.errors).forEach(
                    //   (val) => val.length > 0 && (validity = false)
                    // );
                    // if(validity == true){
                    //    console.log("Registration successful!");
                    // }else{
                    //    console.log("Registration failed")
                    // }
                }

    render(){
        const {errors} = this.state
        return(
            <div className='wrapper'>
            <div className='form-wrapper'>
               <h2>Sign Up</h2>
               <form onSubmit={this.handleSubmit} noValidate >
                  <div className='firstname'>
                     <label htmlFor="firstname">First Name</label>
                     <input type='text' name='firstname' onChange={this.handleChange}/>
    
                  </div>
                  <div className='lastname'>
                     <label htmlFor="lastname">Last Name</label>
                     <input type='text' name='lastname' onChange={this.handleChange}/>
 
                  </div>
                  <div className='email'>
                     <label htmlFor="email">Email</label>
                     <input type='email' name='email' onChange={this.handleChange}/>
                     {errors.email.length > 0 &&  <span style={{color: "red"}}>{errors.email}</span>}
                  </div>
                  <div className='password'>
                     <label htmlFor="password">Password</label>
                     <input type='password' name='password' onChange={this.handleChange}/>
                     {errors.password.length > 0 &&  <span style={{color: "red"}}>{errors.password}</span>}
                  </div>
                  <div className='admin'>
                     <label htmlFor="admin">Login as Admin</label>
                     <input type='checkbox' name='Admin' onChange={this.handleChange}/>
                  </div>
                  <div className='submit'>
                     <button>Sign up</button>
                     <small>Already Have an Account? Click to Login here</small>
                  </div>
             </form>
         </div>
      </div>
        )

    }
}