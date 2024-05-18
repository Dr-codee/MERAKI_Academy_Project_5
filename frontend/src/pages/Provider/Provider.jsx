import "./Providerr.css"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Provider.css";
import img from "./profile.png";
import { setProvider } from "../../Service/Redux/Slice/Provider"
function Provider() {
  const dispatch = useDispatch();
  const [docInfo, setDocInfo] = useState(null);
  const [editExperience, setEditExperience] = useState(false); 
  const [editCertificates, setEditCertificates] = useState(false); 
  const [newExperience, setNewExperience] = useState(""); 
  const [newCertificates, setNewCertificates] = useState("");

  const { token,provider } = useSelector((state) => ({
    token: state.auth.token,
    provider: state.provider.provider,
  }));

  const getInfo = () => {
    axios
      .get(`http://localhost:5000/users/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.result);
        dispatch(setProvider(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDocInfo = () => {
    axios
      .get(`http://localhost:5000/docInfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.result);
        setDocInfo(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInfo();
    getDocInfo();
  }, []);

console.log(provider);
  return (
    <>
      <div className="infoContainer">
        {provider && provider.map((provider,index)=>{
return  (
          <div className="providerImg">
            <img style={{ width: "200px" }} src={img} alt="Provider Image" />
            <div className="infoo">
              <div>
                {provider.firstname} {provider.lastname}
                <br />
              </div>
              Contact Information: <br />
              <div>
                <span>📞</span>
                {provider.phone}
              </div>
              <div>📧{provider.email}</div>
            </div>
          </div>
        )})}

        {docInfo && (
          <div className="info">
            <div>Specialty: {docInfo[0].specialty}</div>
            {editExperience ? (
              <div>
                <input
                  type="text"
                  autoFocus
                  value={newExperience}
                  onChange={(e)=>{setNewExperience(e.target.value)}}
                  placeholder="Update your Experience"
                />
                <button onClick={()=>{
axios
.put(`http://localhost:5000/docInfo/`,{experience:newExperience}, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then((result) => {
  setDocInfo(result);
})
.catch((err) => {
  console.log(err);
});
                }}>Save</button>
              </div>
            ) : (
              <div
                onClick={() => {
                  setEditExperience(!editExperience); 
                }}
              >
                ✏️ Experience: {docInfo[0].experience}
              </div>
            )}

            {editCertificates ? (
              <div>
                <input
                  type="text"
                  autoFocus
                  value={newCertificates}
                  onChange={(e)=>{setNewCertificates(e.target.value)}}
                  placeholder="Update your Certificates"
                />
                <button onClick={()=>{axios
.put(`http://localhost:5000/docInfo/`,{certificates:newCertificates}, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then((result) => {
  setDocInfo(result);
})
.catch((err) => {
  console.log(err);
});}}>Save</button>
              </div>
            ) : (
              <div
                onClick={() => {
                  setEditCertificates(!editCertificates);
                }}
              >
                ✏️ Certificates: {docInfo[0].certificates}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Provider;
