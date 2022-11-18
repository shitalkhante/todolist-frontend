import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../httpservice";

export const Register = () => {
    const [state,setState] = useState({email:"",pass:"",conpass:""});
    console.log(state);
    const navigate = useNavigate();
    const registerwith = ()=>{
        if(state.email==="" || state.pass===""){
            alert("provide email and password")
        }else if(state.pass!==state.conpass){
            alert("password and confirm password should be same");
        }else{
        register({email:state.email,pass:state.pass}).then((data)=>{
           alert(data.data.msg);
            navigate("/");
        }).catch((err)=>{
            console.log(err);
        })
    }
    }
    return (
        <div>
            <div id="login-outer">
                <div className="inner-div">
                <div id="profile-pic"></div>
                    <h1 className="header-txt">Register</h1>
                    <input className="input-box" value={state.email} onChange={(event)=>{
                        setState({...state,email:event.target.value})
                    }} placeholder="username" type={"text"} />
                    <input className="input-box" value={state.pass} onChange={(event)=>{
                         setState({...state,pass:event.target.value})
                    }} placeholder="password" type={"password"} />
                    <input className="input-box" placeholder="conform password" value={state.conpass} onChange={(event)=>{
                        setState({...state,conpass:event.target.value})
                    }} type={"password"} />
                    <button id="login-btn" className="input-box" onClick={registerwith}>Register</button>
                    <button className="forget-pass" onClick={()=>{navigate("/")}}>Member Login</button>
                </div>

            </div>
        </div>
    )
}