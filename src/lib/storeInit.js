"use strict"
import axios from 'axios';

let getLogin = (userId,store)=> axios.get(`http://localhost:3000/api-cms/login/storeLogin/${userId}?appid=1&appkey=1`,{tokenIf:true})
   
export default (userId,store,axiosAll)=>[getLogin(userId,store),...axiosAll]