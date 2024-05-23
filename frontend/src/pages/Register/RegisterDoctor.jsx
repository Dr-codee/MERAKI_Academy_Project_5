import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterDoctor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [speciality, setSpeciality] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [specialities, setSpecialities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
   
    axios
      .get("http://localhost:5000/specialty")
      .then((result) => {
        setSpecialities(result.data.result);
        console.log(result.data.result)
      })
      .catch((error) => {
        console.error("Error fetching specialties:", error);
        setMessage("Error fetching specialties. Please try again.");
      });
  }, []);

  const addNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users/registerDoctor", {

        firstName, lastName, age, specialty:speciality, address, email, password, phone

      });
      if (result.data.success) {
        setStatus(true);
        setMessage(result.data.message);
        navigate("/docInfo");
      } else {
        throw new Error(result.data.message);
      }
    } catch (error) {
      console.error("Error registering doctor:", error);
      setStatus(false);
      setMessage(error.message || "Error happened while registering. Please try again.");
    }
  };

console.log(speciality)

  return (
    <>
      <div className="Form">
        <p className="Title">Register:</p>
        <form onSubmit={addNewDoctor}>
          <br />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <br />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <br />
          <select
            value={speciality}
            onChange={(e) => {setSpeciality(e.target.value)
              console.log(e.target.value)
            }
          }
            required
          >
            <option> Select Speciality </option>
            {specialities && 
                        specialities.map((spe) => (
              <option key={spe.specialty_id} value={spe.specialty_id}>
                {spe.specialty}
              </option>
            ))}
          </select>
          <br />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <br />
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button className="docRegBut" type="submit">Register</button>
        </form>
        {status ? (
          <div className="SuccessMessage">{message}</div>
        ) : (
          <div className="ErrorMessage">{message}</div>
        )}
      </div>
    </>
  );
};

export default RegisterDoctor;
