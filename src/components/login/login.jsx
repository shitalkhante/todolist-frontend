import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { login } from "../httpservice";
import "./logn.css";

export const Login = () => {
    const [state, setState] = useState({ email: "", pass: "" });
    const navigate = useNavigate();
    const loginwith = () => {
        if (state.email === "" || state.pass === "") {
            alert("provide email and password")
        } else {
            login({ email: state.email, pass: state.pass }).then((data) => {
                alert(data.data.msg);
                if (data.data.token) {
                    window.localStorage.setItem("token", data.data.token);
                    navigate("/home");
                }
            }).catch((err) => {
                console.log(err);
            })
        }

    }
    return (
        <div>
            <div id="login-outer">
                <div className="inner-div">
                    <div id="profile-pic"></div>
                    <h1 className="header-txt">Member Login</h1>
                    <input className="input-box" value={state.email} placeholder="username" type={"email"} onChange={(event) => {
                        setState({ ...state, email: event.target.value })
                    }} />
                    <input className="input-box" value={state.pass} placeholder=".........." type={"password"} onChange={(event) => {
                        setState({ ...state, pass: event.target.value })
                    }} />
                    <button id="login-btn" onClick={loginwith}>Login</button>
                    <button className="forget-pass">Forget Password?</button>
                    <span>/</span>
                    <button className="forget-pass" onClick={() => {
                        navigate("/register");
                    }}>Register</button>
                </div>

            </div>
        </div>
    )
}