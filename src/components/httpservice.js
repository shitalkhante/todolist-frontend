import axios from "axios";
const url = "https://todo-list-api-nodejs.herokuapp.com"
const token = window.localStorage.getItem("token");
//window.localStorage.getItem("token");

export const register=async(data)=>{
    return await axios.post(url+"/register",data)
}

export const login=async(data)=>{
    return await axios.post(url+"/login",data)
}

export const addTodos=async(data)=>{
    return await axios.post(url+"/inserttodo",data,{headers:{
        key:token
    }})
}

export const getTodos=async()=>{
    return await axios.get(url+"/gettodos",{headers:{
        key:token
    }})
}

export const updateTodo=async(data,id)=>{
    return await axios.patch(url+"/update",data,{headers:{
        key:token,
        id:id
    }})
}