import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [dateTime, setDateTime] = useState("");

  const [formData, setFormData] = useState({
    siteName: "",
    engineerName: "",
    expenses: "",
    completion: "",
    remarks: "",
    requiredMaterial: ""
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {

    const updateTime = () => {
      setDateTime(
          new Date().toLocaleString("en-IN")
      );
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handlePhotoChange = (e) => {

    const file = e.target.files[0];

    if (file) {
      setPhoto(file);
      setPreview(
          URL.createObjectURL(file)
      );
    }

  };

  const uploadImage = async () => {

    const imageData = new FormData();

    imageData.append("file", photo);

    imageData.append(
        "upload_preset",
        "site-reports"
    );

    const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dkpftc51o/image/upload",
        imageData
    );

    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      let photoUrl = "";

      if (photo) {
        photoUrl = await uploadImage();
      }

      const data = {
        dateTime,
        siteName: formData.siteName,
        engineerName: formData.engineerName,
        expenses: formData.expenses,
        completion: formData.completion,
        remarks: formData.remarks,
        requiredMaterial: formData.requiredMaterial,
        photoUrl
      };

      await fetch(
          "https://script.google.com/macros/s/AKfycby7Plc-AShY6xingSbXWxNc-zNuTy2Kpel1LTVXWVPf2qk-T7-RVUBoVkDeYnrgTs-n3Q/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "text/plain"
            },
            body: JSON.stringify(data)
          }
      );

      alert("Report Submitted Successfully");

      setFormData({
        siteName: "",
        engineerName: "",
        expenses: "",
        completion: "",
        remarks: "",
        requiredMaterial: ""
      });

      setPhoto(null);
      setPreview(null);

    } catch (error) {

      console.error(error);

      alert("Submission Failed");
    }
  };

  return (
      <div className="container">

        <h1>🏗 Site Daily Report</h1>

        <p className="subtitle">
          Daily Progress Tracking System
        </p>

        <form onSubmit={handleSubmit}>

          <label>Date & Time</label>
          <input
              type="text"
              value={dateTime}
              readOnly
          />

          <label>Site Name</label>
          <input
              type="text"
              name="siteName"
              value={formData.siteName}
              onChange={handleChange}
              required
          />

          <label>Engineer Name</label>
          <input
              type="text"
              name="engineerName"
              value={formData.engineerName}
              onChange={handleChange}
              required
          />

          <label>Work Expenses (₹)</label>
          <input
              type="number"
              name="expenses"
              value={formData.expenses}
              onChange={handleChange}
              required
          />

          <label>Work Completion (%)</label>
          <input
              type="number"
              min="0"
              max="100"
              name="completion"
              value={formData.completion}
              onChange={handleChange}
              required
          />

          <label>Remarks</label>
          <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
          />

          <label>Required Material</label>
          <textarea
              name="requiredMaterial"
              value={formData.requiredMaterial}
              onChange={handleChange}
          />

          <label>Site Photo</label>

          <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
          />

          {preview && (
              <img
                  src={preview}
                  alt="Preview"
                  className="preview-image"
              />
          )}

          <button type="submit">
            Submit Report
          </button>

        </form>

      </div>
  );
}

export default App;