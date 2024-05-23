import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Providerr.css";

export default function docInfo() {
  const [docInfo, setDocInfo] = useState(null);
  const [newExperience, setNewExperience] = useState("");
  const [newCertificates, setNewCertificates] = useState("");

  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));
  const createDocInfo = () => {
    axios
      .post(
        `http://localhost:5000/docInfo`,
        { experience: newExperience, certificates: newCertificates },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        // console.log(result.data);
        setDocInfo(result.data.result);
        navigator("/provider");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Form">
      <p className="Title">Register:</p>
      <form onSubmit={createDocInfo}>
        <br />
        <input
          type="text"
          placeholder="Experience"
          onChange={(e) => setNewExperience(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="certificates"
          onChange={(e) => setNewCertificates(e.target.value)}
          required
        />
        <br />
        <button className="docRegBut" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
