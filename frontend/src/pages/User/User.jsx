
import React, {useEffect, useState } from "react";
import "./User.css";
import axios from "axios";
 import { useDispatch, useSelector } from "react-redux";

import {setUsers} from "../../Service/Redux/Slice/Users"

const User = () => {
    const {users} = useSelector((state) => {
        return {   
            users: state.users.users 
        };
      });
      const {token,userId} =useSelector((state)=>{
        return{ auth: state.auth.auth
      }})

    const [message, setMessage] = useState("");
    

    const dispatch = useDispatch();
    
    const getUserInfo = async () => {
        try {
          const result = await axios.get("http://localhost:5000/users/info",
           {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          );
          if (result.data.success) {
            console.log(result.data);
             dispatch(setUsers(result.data));
            setMessage("");
          } else throw Error;
        } catch (error) {
          if (!error.response.data.success) {
            return setMessage(error.response.data.message);
          }
          setMessage("Error happened while Get Data, please try again");
        }
      };
      useEffect(() => {
        getUserInfo();
      }, []);

  return (
  <>
  {users&& users.map((users,index)=>{
    <div key={index} className="users">
          <h1>{users.firstName}</h1>
          <h2>{users.lastName}</h2>
          <h3>{users.age}</h3>
          <h4>{users.email}</h4>
          <h5>{users.phone}</h5>
    </div>
  })}


   {message && <div>{message}</div>}
  </>
  )
}

export default User