import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import img from"./profile.png";
import { useDispatch, useSelector } from 'react-redux'; 
import { setProvider } from '../../Service/Redux/Slice/Provider';
import "./Landing.css";
import { setProviderId } from '../../Service/Redux/Slice/ProviderId';


function Landing() {
  const specialtiesWithPhotos = [
    { photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTngziubU1VMp8hywubnwQVzHNakgYqzKPk49cZmaQeA&s' },
    {  photo: 'https://www.nm.org/-/media/northwestern/healthbeat/images/health%20library/nm-ten-signs-cardiologist_preview.jpg' },
    { photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy7-3yBtxzWkhPmQQ2VNRIEEgJGlc9j-akT5Zv38tHQA&s' },
    { photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6E8xzYvzO0Lk7IcGqAoo-vxVJiYgASeZwQasDsK6sBw&s' },
    
  ];
  const articles = [
    { id: 1, title: "Biological standard of living", imageUrl: "https://www.investopedia.com/thmb/mxy4kAXcyjvx0J4pM1jg0aJFuyk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1153697801-575a3cdd2f2448a68677dde062945ac2.jpg", link: "https://en.wikipedia.org/wiki/Biological_standard_of_living" },
    { id: 2, title: "Childbirth", imageUrl: "https://images.ctfassets.net/6m9bd13t776q/4Kb0NVb6LR2hFDTYsrbYKh/a66fc371ea7c49eb8f5a40c4356e7105/Sopotnicki-hero.webp?fm=webp&q=75&w=660", link: "https://en.wikipedia.org/wiki/Childbirth" },
    { id: 3, title: "Diet (nutrition)", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvjgVGZelgcup37Qh1sZYDs-pywUEgOlFyz2G6wqBAw&s", link: "https://en.wikipedia.org/wiki/Diet_(nutrition)" },
    { id: 4, title: "Disease", imageUrl: "https://hms.harvard.edu/sites/default/files/media/pathogenesis%20main.jpg", link: "https://en.wikipedia.org/wiki/Disease#Terminology" }
    
  ];
  const [specialties, setSpecialties] = useState([]);
  const [show, setShow] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const {provider} = useSelector((state) => ({
    provider: state.provider.provider,
  }));

  useEffect(() => {
    axios.get('http://localhost:5000/specialty')
      .then((result) => {
        if (result.data) {
          setSpecialties(result.data.result);
        }
      })
      .catch((error) => {
        console.error('Error fetching specialties:', error);
      });
  }, []);
  
const getDocbySpecialty = (id) => {
    axios.get(`http://localhost:5000/users/provBySpec/${id}`)
      .then((result) => {
        if (result.data.success) {
          dispatch(setProvider(result.data.result));
          setShow(true); 
        } else {
          console.error('Error fetching doctors:', result.data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  };

  useEffect(() => {
    getDocbySpecialty();
  }, []);

  const handleArticleClick = (link) => {
    window.open(link, "_blank");
  };
console.log(provider);
  return (
    <div className="home-container">
      <div className="slideshow">
        <h2>Healthcare</h2>
        <div className="slideshow-container">
          {articles.map((article,i) => (
            <div key={article.id} className="slide" onClick={() => handleArticleClick(article.link)}>
              <img src={articles[i].imageUrl} alt={articles[i].title} />
              <p>{articles[i].title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="user-experience">
      <h2>Join Us</h2>
  <p>
    To use our health app, simply log in with your credentials or register if you are new. Once logged in, you can book appointments with specialized doctors, receive notifications, and manage your health journey seamlessly.
  </p>
  <h3>Are you a Doctor?</h3>
  <p>
    Doctors play a crucial role in our platform. If you're a doctor looking to join our community, we welcome you! After registering, please navigate to the <mark>My Info</mark> page to add your professional details, including your experience and certifications. Your profile completeness ensures that patients can trust and connect with you more effectively. Thank you for choosing to be a part of our community!
  </p>
      </div>
<>
      <div className="specialties">
        <h2>Doctors specialties</h2>
        <div className="specialties-container">
          {specialties.map((specialty,i) => (
            <div key={specialty.specialty_id} className="specialty">
              <img src={specialtiesWithPhotos[i].photo} alt={"img"}  onClick={()=>{
                getDocbySpecialty(specialty.specialty_id);
                setShow(true); 
              }}/>
              <h3>{specialty.specialty}</h3>
            </div>
          ))}
        </div>
      </div>
</><div className='mainSp'>
      {show?provider && provider.map((pro,i) => (
    
            <div key={i} id="card">
              <img 
                id="avatar"
                src={img}
                alt="avatar"
              />
              <div id="info">
                <p id="name">{pro.firstname} {pro.lastname}</p>
                <p id="activity"> </p>
                <div id="stats">
                  <p className="stats-text">
                    <span>📞</span>{pro.phone}
                  </p>
                  <p className="stats-text">
                    <span>📧</span>{pro.email}
                  </p>
                </div>
                <p id="btn" onClick={()=>{
              
              dispatch(setProviderId(pro)); 
              navigate("/providers");
                }}>visit</p>
              </div>
            </div>
          )):<></>}
        </div>
      
    </div>
  );
}

export default Landing;
