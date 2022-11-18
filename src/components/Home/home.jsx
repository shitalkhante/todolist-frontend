import { useState } from "react";
import "./home.css";
import { addTodos, updateTodo } from "../httpservice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Home = () => {
    const [activity, setActivity] = useState("");
    const [todolist, setTodoList] = useState([]);
    const navigate = useNavigate();

    async function fetchData(){
       await axios.get("https://todo-list-api-nodejs.herokuapp.com/gettodos",{headers:{
            key:window.localStorage.getItem("token")
        }}).then(async(data) => {
            return data;
           // window.location.reload();
       }).then((data)=>{
           setTodoList(data.data.msg);
       })
           .catch(err => {
               alert(err);
           })
        // await getTodos()
    }

    useEffect(() => {
            fetchData();
            return()=>{
                setTodoList([]);
            } 
            
        }, [])

    const addtask=async()=> {
        await axios.post("https://todo-list-api-nodejs.herokuapp.com/inserttodos",{todo:activity},{headers:{
            key:window.localStorage.getItem("token")
        }}).then((res) => {
            console.log(res);
            alert("activity added Successfully")
        }).catch((error) => {
            alert(error);
        });
        setActivity("");
        document.location.reload();
    }

    function startActivity(event) {
        var date = new Date();
        // eslint-disable-next-line
        if ((todolist.filter((r) => { if (r.status === 'ongoing') return r })).length > 0) {
            alert("finish or pause ongoing activity first")
        } else {
            updateTodo({ status: "ongoing", date: date }, event.target.id).then(msg => {
                alert("activity started");
                document.location.reload();
            })
        }
    }

    function endActivity(event) {
        // eslint-disable-next-line
        var pre = todolist.filter((r) => { if (r._id === event.target.id) return r })
        var date = new Date();
        var diff = (date - new Date(pre[0].date)) / 1000;
        var time = pre[0].timetaken + diff;
        updateTodo({ status: "completed", timetaken: time }, event.target.id).then(msg => {
            alert("activity marked as completed");
            document.location.reload();
        })
    }
    function pauseActivity(event) {
        var pre = todolist.filter((r) => { if (r._id === event.target.id) return r })
        var date = new Date();
        var diff = Math.abs(date - new Date(pre[0].date)) / 1000;
        var time = pre[0].timetaken + diff;
        updateTodo({ status: "pending", timetaken: time }, event.target.id).then(msg => {
            alert("activity paused");
            document.location.reload();
        })
    }
    function resumeActivity(event) {
        var date = new Date();
        // eslint-disable-next-line
        if (todolist.filter((r) => { if (r.status === 'ongoing') return r }).length > 0) {
            alert("finish or pause ongoing activity first")
        } else {
            updateTodo({ status: "ongoing", date: date }, event.target.id).then(msg => {
                alert("activity resumed");
                document.location.reload();
            })
        }
    }
    function convertSec(sec) {
        let secInHr = 60*60;
        let secInMin = 60;
        var hour = Math.floor(sec/secInHr);
        let remaningSec = sec-(hour*secInHr);
        var min = Math.floor(remaningSec/secInMin);
        remaningSec = remaningSec - (min*secInMin);
        var second = Math.floor(remaningSec);
       
        return `${hour}:${min}:${second}`;
    }
    return (
        <div id="outer">
            <div id="header">{todolist.length>0 && todolist[0].uid}</div>
            <div id="hero">
                <h2 id="txt-todolist">To do List</h2>
                <h2 id="history">History</h2>
                <button id="btn-logout" onClick={()=>{
                    setTodoList([]);
                    window.localStorage.clear();
                    delete axios.defaults.headers.common['token'];
                    navigate("/");
                }}>Logout</button>
            </div>
            <div id="body">
                <div id="addtodo">
                    <input id="search" type={"text"} onChange={(event) => {
                        setActivity(event.target.value)
                    }} placeholder="Add new activity" />
                    <button id="add" onClick={addtask}>Add</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>
                                Activity
                            </th>
                            <th>
                                Status
                            </th>
                            <th>
                                Time taken<br />
                                (Hrs:Min:Sec)
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    {
                        todolist.length > 0 &&
                        <tbody>
                            {todolist.map((row) => {
                                return (<tr>
                                    <td>{row.activity}</td>
                                    <td>{row.status}</td>
                                    <td><span style={{ display: row.status === 'completed' ? "inline" : "none" }}>{convertSec(row.timetaken)}</span></td>
                                    <td><button className="btngroup" style={{ display: row.timetaken === 0 && row.status === 'pending' ? "inline" : "none" }} id={row._id} onClick={(event) => { startActivity(event) }}>start</button>
                                        <button className="btngroup" style={{ display: row.status === 'ongoing' ? "inline" : "none" }} id={row._id} onClick={(event) => { endActivity(event) }}>End</button>
                                        <button className="btngroup" style={{ display: row.status === 'ongoing' ? "inline" : "none" }} id={row._id} onClick={(event) => { pauseActivity(event) }}>Pause</button>
                                        <button className="btngroup" style={{ display: row.timetaken > 0 && row.status === 'pending' ? "inline" : "none" }} id={row._id} onClick={(event) => { resumeActivity(event) }}>Resume</button></td>
                                </tr>)
                            })}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}