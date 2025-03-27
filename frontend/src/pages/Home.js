import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import ExperienceList from "../components/ExperienceList";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [experiences, setExperiences] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const fetchExperiences = async () => {
    try {
      const res = await axios.get(`${API_URL}/experiences`);
      setExperiences(res.data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <div className="home-container">
      <h1>Experiences Shared</h1>
      <ExperienceList experiences={experiences} fetchExperiences={fetchExperiences}/>

      {user && (
        <button className="create-btn" onClick={() => navigate("/create")}>
          <FaPlus size={24} />
        </button>
      )}
    </div>
  );
};

export default Home;
