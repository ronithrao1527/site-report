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
    maleLabour: "",
    femaleLabour: "",
    labourPayment: "",
    materialUsed: "",
    requiredMaterial: "",
    remarks: "",
    tomorrowSchedule: "",
    workStatus: ""
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const updateTime = () => {
      setDateTime(new Date().toLocaleString("en-IN"));
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
      setPreview(URL.createObjectURL(file));
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
        maleLabour: formData.maleLabour,
        femaleLabour: formData.femaleLabour,
        labourPayment: formData.labourPayment,
        materialUsed: formData.materialUsed,
        requiredMaterial: formData.requiredMaterial,
        remarks: formData.remarks,
        tomorrowSchedule: formData.tomorrowSchedule,
        workStatus: formData.workStatus,
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

      alert("✅ Report Submitted Successfully");

      setFormData({
        siteName: "",
        engineerName: "",
        expenses: "",
        completion: "",
        maleLabour: "",
        femaleLabour: "",
        labourPayment: "",
        materialUsed: "",
        requiredMaterial: "",
        remarks: "",
        tomorrowSchedule: "",
        workStatus: ""
      });

      setPhoto(null);
      setPreview(null);

    } catch (error) {

      console.error(error);

      alert("❌ Submission Failed");
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
              type="text"
              name="completion"
              value={formData.completion}
              onChange={handleChange}
              min="0"
              max="100"
              required
          />

          <label>Male Labour</label>
          <input
              type="number"
              name="maleLabour"
              value={formData.maleLabour}
              onChange={handleChange}
              min="0"
          />

          <label>Female Labour</label>
          <input
              type="number"
              name="femaleLabour"
              value={formData.femaleLabour}
              onChange={handleChange}
              min="0"
          />

          <label>Labour Payment (₹)</label>
          <input
              type="number"
              name="labourPayment"
              value={formData.labourPayment}
              onChange={handleChange}
              min="0"
          />

          <label>Material Used Today</label>
          <textarea
              name="materialUsed"
              value={formData.materialUsed}
              onChange={handleChange}
          />

          <label>Required Material</label>
          <textarea
              name="requiredMaterial"
              value={formData.requiredMaterial}
              onChange={handleChange}
          />

          <label>Remarks</label>
          <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
          />

          <label>Tomorrow Work Schedule</label>
          <textarea
              name="tomorrowSchedule"
              value={formData.tomorrowSchedule}
              onChange={handleChange}
          />

          <label>Work Status</label>
          <select
              name="workStatus"
              value={formData.workStatus}
              onChange={handleChange}
              required
          >
            <option value="">Select Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Delayed">Delayed</option>
            <option value="Material Pending">Material Pending</option>
          </select>

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