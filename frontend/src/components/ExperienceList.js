import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./ExperienceList.css";

const ExperienceList = ({ experiences, fetchExperiences }) => {
  const { user } = useContext(AuthContext);
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const handleLike = async (id) => {
    if (!user) return alert("Please login to like a post.");

    try {
      const res = await axios.put(
        `${API_URL}/experiences/like/${id}`,
        {
          userId: user._id,
        }
      );

      console.log("Like response:", res.data);
      fetchExperiences(); // Refresh likes
    } catch (error) {
      console.error(
        "Error liking post:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="experience-list">
      {experiences.map((exp) => (
        <div key={exp._id} className="experience-card">
          <h3>{exp.title}</h3>
          <p>{exp.content}</p>
          <div className="like-section">
            <button onClick={() => handleLike(exp._id)} className="like-btn">
              <FaHeart
                color={user && (exp.likes?.includes(user._id) ? "red" : "gray")}
              />
              <span>{exp.likes?.length || 0}</span>
            </button>
          </div>
          <small>- By {exp.user.name}</small>
        </div>
      ))}
    </div>
  );
};

export default ExperienceList;
