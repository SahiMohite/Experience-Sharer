import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ExperienceForm.css";

const ExperienceForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/experiences`,
        { title, content },
        { headers: { Authorization: token } }
      );

      navigate("/"); // Redirect back to Home after submission
    } catch (error) {
      console.error("Failed to post experience", error);
    }
  };

  return (
    <div className="main-form-container">
      <div className="form-container">
        <h2>Post Experience</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Your experience"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;
