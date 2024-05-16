
import React, {useEffect, useState } from "react";
import "./User.css";
import axios from "axios";
 import { useDispatch, useSelector } from "react-redux";

import {setUsers} from "../../Service/Redux/Slice/Users"


const User = () => {
  // const [information, setInformation] = useState(null);

    const {users} = useSelector((state) => {
        return {   
            users: state.users.users 
        };
      });
      const { token } = useSelector((state) => ({
        token: state.auth.token
      }));

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
// setInformation(result.data)
            // console.log(result.data);
             dispatch(setUsers(result.data.result));
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
console.log(users);
  return (
  <>
  {users&& users.map((user,index)=>{
    <div key={index} className="users">
          <h1>{user[index].firstname}</h1>
          <h2>{user[index].lastname}</h2>
          <h3>{user[index].age}</h3>
          <h4>{user[index].email}</h4>
          <h5>{user[index].phone}</h5>
          
    </div>
  })}


   {message && <div>{message}</div>}
  </>
  )
}

export default User