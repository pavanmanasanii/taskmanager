import {Component} from 'react'
import {Link,Redirect} from 'react-router-dom'
import Cookie from "js-cookie"
import './index.css'

const apiconstants = {
    success: 'SUCCESS',
    failure: 'FAILURE',
    initial: 'INITIAL',
    inprogress: 'INPROGRESS'
}

class Login extends Component{
    state = {
        loginapistatus: apiconstants.initial,
        email: 'sara@example.com',
        password: 'user123',
        showErr: false,
        errMsg: '',
        apimessage: ''
    }
    
    onFormsubmit = async (event) => {
        event.preventDefault()
        const {email,password} = this.state
        this.setState({loginapistatus: apiconstants.inprogress})
        if(email==="" || password===""){
                this.setState({
                    showErr: true,
                    errMsg: "Email and password are required",
                    loginapistatus: apiconstants.failure
                })
                return;
            }
                this.setState({
                    showErr: false,
                    errMsg: ""
                })
            
        
        const loginUrl=`https://csyibgv5y0.execute-api.eu-north-1.amazonaws.com/api/auth/signin`
        const userdata ={
            email: email,
            password: password
        }
        const options ={
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(userdata) 
        }
        try{
            const response = await fetch(loginUrl,options)
            const data = await response.json() 
            if(response.ok === true){
                this.setState({loginapistatus: apiconstants.success,apimessage: "Login successfull",showErr: false,errMsg: ""})
                const { status,token,user } = data;
                console.log(status)
                Cookie.set("jwt_token", token, { expires: 1 })
            }  
            else{
                this.setState({loginapistatus: apiconstants.failure,apimessage: data.message,showErr: true,errMsg: "Invalid email or password",email: "",password: ""})
            }
        }
        catch(e){
          this.setState({
          loginapistatus: apiconstants.failure,
          showErr: true,
          errMsg: "Something went wrong. Please try again."
  })
        }
    }

    render(){
        const {showErr,errMsg,password,email,apimessage,loginapistatus} = this.state
        const token = Cookie.get("jwt_token")
        if(token){
           return <Redirect to={'/'} />
        }
        return(
            <div>
                <div>
                    <i className="fa-solid fa-note-sticky"></i>
                </div>
                <div>
                   <form onSubmit={this.onFormsubmit}>
                     <h1>Welcome Back</h1>
                     <p>Use your email and password to continue</p>
                     <div>
                     <label htmlFor="email">Email</label>
                     <input type="text" id="email" value={email} onChange={(event) => this.setState({email: event.target.value})}/>
                     </div>
                     <div>
                     <label htmlFor="password">Password</label>
                     <input type="password" id="password" value={password} onChange={(event) => this.setState({password: event.target.value})}/>
                     </div>
                    
                    
                     {showErr && <p>{errMsg}</p>}
                     <button type="submit" disabled={loginapistatus === apiconstants.inprogress}>Sign In</button>

                    </form> 
                    
                </div> 
            </div>
        )
    }
}


export default Login