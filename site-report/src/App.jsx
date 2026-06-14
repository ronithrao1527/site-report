import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// --- SVG Icons ---
const Icons = {
  Calendar: () => (
    <svg className="w-5 h-5 icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  MapPin: () => (
    <svg className="w-5 h-5 icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  User: () => (
    <svg className="w-5 h-5 icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Rupee: () => (
    <svg className="w-5 h-5 icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" d="M9 5h6M9 9h6M9 5a3 3 0 110 6h3m-3 0h6m-9 3l6 6" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5 icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Clipboard: () => (
    <svg className="w-5 h-5 icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5 icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Wrench: () => (
    <svg className="w-5 h-5 icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Camera: () => (
    <svg className="w-5 h-5 icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  UploadCloud: () => (
    <svg className="w-10 h-10 uploader-cloud-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
  Alert: () => (
    <svg className="w-5 h-5 icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  TrendUp: () => (
    <svg className="w-5 h-5 icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  CheckCircle: () => (
    <svg className="w-6 h-6 toast-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  XCircle: () => (
    <svg className="w-6 h-6 toast-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Sun: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  ),
  Moon: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  )
};

function App() {
  const [dateTime, setDateTime] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Submitted reports states
  const [activeTab, setActiveTab] = useState("submit"); // "submit" or "history"
  const [searchQuery, setSearchQuery] = useState("");
  const [activeReportModal, setActiveReportModal] = useState(null);
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem("vj_site_reports");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  });

  // Custom toast notification state
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success"
  });

  const [formData, setFormData] = useState({
    siteName: "",
    engineerName: "",
    expenses: "",
    completion: "0",
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

  // Sync theme attribute with HTML tag
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Live Date/Time updater
  useEffect(() => {
    const updateTime = () => {
      setDateTime(new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "medium"
      }));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

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

  // Drag & drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setPhoto(file);
        setPreview(URL.createObjectURL(file));
      } else {
        showToast("Only image files are accepted", "error");
      }
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPreview(null);
  };

  const deleteReport = (id, e) => {
    e.stopPropagation(); // Prevent card click / modal opening
    if (confirm("Are you sure you want to delete this report from your browser history?")) {
      const updated = reports.filter(r => r.id !== id);
      setReports(updated);
      localStorage.setItem("vj_site_reports", JSON.stringify(updated));
      showToast("Report deleted from local history", "success");
    }
  };

  const uploadImage = async () => {
    const imageData = new FormData();
    imageData.append("file", photo);
    imageData.append("upload_preset", "site-reports");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dkpftc51o/image/upload",
      imageData
    );

    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let photoUrl = "";
      if (photo) {
        photoUrl = await uploadImage();
      }

      const data = {
        id: Date.now(), // Add unique ID for listing/deleting
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
        "https://script.google.com/macros/s/AKfycbxTevxn9nrt4iVQtqwTUIVUhxwTFNuQHcukEbYxG9M2Q41dzmfDumkvlQCrpINED35zLQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain"
          },
          body: JSON.stringify(data)
        }
      );

      showToast("Report Submitted Successfully!", "success");

      // Save to localStorage list
      const updatedReports = [data, ...reports];
      setReports(updatedReports);
      localStorage.setItem("vj_site_reports", JSON.stringify(updatedReports));

      setFormData({
        siteName: "",
        engineerName: "",
        expenses: "",
        completion: "0",
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
      showToast("Submission Failed. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalLabour = Number(formData.maleLabour || 0) + Number(formData.femaleLabour || 0);

  // Helper to format other site expenses
  const formatExpenses = (val) => {
    if (!val) return "₹0";
    const num = Number(val);
    if (!isNaN(num)) {
      return `₹${num.toLocaleString("en-IN")}`;
    }
    // If it contains letters (e.g. "4500 (transport)"), return it as is
    return val;
  };

  // Status mapping for visual badge styling
  const getStatusBadgeClass = (status) => {
    if (!status) return "";
    const s = status.trim().toLowerCase();
    if (s.includes("complete")) return "badge-success";
    if (s.includes("progress")) return "badge-progress";
    if (s.includes("delay")) return "badge-delayed";
    if (s.includes("pending") || s.includes("material")) return "badge-pending";
    return "badge-default";
  };

  // Filter reports based on search query
  const filteredReports = reports.filter(report => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      (report.siteName && report.siteName.toLowerCase().includes(q)) ||
      (report.engineerName && report.engineerName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="container-wrapper">
      {/* Toast Notification */}
      <div className={`toast-container ${toast.visible ? "show" : ""} ${toast.type}`}>
        <div className="toast-icon">
          {toast.type === "success" ? <Icons.CheckCircle /> : <Icons.XCircle />}
        </div>
        <div className="toast-message">{toast.message}</div>
      </div>

      <div className="container">
        {/* Header Widget */}
        <header className="app-header">
          <div className="logo-container">
            <div className="logo-circle">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg">
                <path d="M25 25 L45 75 L55 75 L75 25" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M50 45 L60 45 L55 75" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" strokeDasharray="6 6"/>
              </svg>
            </div>
            <div className="brand-text">
              <h1>VJ Enterprises</h1>
              <p className="subtitle">Daily Progress Tracking System</p>
            </div>
          </div>

          <div className="header-actions">
            {/* Live Clock Widget */}
            <div className="live-clock">
              <span className="pulse-dot"></span>
              <Icons.Clock />
              <span className="clock-time">{dateTime || "Loading Time..."}</span>
            </div>
            
            {/* Theme Toggle Button */}
            <button 
              type="button" 
              className="theme-toggle-btn" 
              onClick={toggleTheme}
              aria-label="Toggle light/dark theme"
            >
              {theme === "light" ? <Icons.Moon /> : <Icons.Sun />}
            </button>
          </div>
        </header>

        {/* Tab Navigation Segment */}
        <div className="tab-navigation">
          <button
            type="button"
            className={`tab-btn ${activeTab === "submit" ? "active" : ""}`}
            onClick={() => setActiveTab("submit")}
          >
            <Icons.Clipboard /> Submit Report
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            <Icons.Calendar /> Submitted History
            <span className="tab-counter-badge">{reports.length}</span>
          </button>
        </div>

        {/* Dynamic Views */}
        {activeTab === "submit" ? (
          /* --- TAB 1: FORM --- */
          <form onSubmit={handleSubmit} className="dashboard-form">
            <fieldset disabled={isSubmitting} className="form-fieldset">
              
              <div className="form-grid">
                
                {/* --- CARD 1: GENERAL METADATA --- */}
                <div className="dashboard-card">
                  <div className="card-header">
                    <div className="card-icon-wrapper">
                      <Icons.Clipboard />
                    </div>
                    <h2>General Information</h2>
                  </div>
                  
                  <div className="card-body">
                    <div className="input-group">
                      <label htmlFor="dateTime">
                        <Icons.Calendar /> Date & Time (IST)
                      </label>
                      <input
                        id="dateTime"
                        type="text"
                        value={dateTime}
                        readOnly
                        className="readonly-input"
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="siteName">
                        <Icons.MapPin /> Site Name
                      </label>
                      <input
                        id="siteName"
                        type="text"
                        name="siteName"
                        value={formData.siteName}
                        onChange={handleChange}
                        placeholder="e.g., Green Valley Housing Block A"
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="engineerName">
                        <Icons.User /> Site Engineer Name
                      </label>
                      <input
                        id="engineerName"
                        type="text"
                        name="engineerName"
                        value={formData.engineerName}
                        onChange={handleChange}
                        placeholder="e.g., Rajesh Kumar"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* --- CARD 2: WORKFORCE & FINANCIALS --- */}
                <div className="dashboard-card">
                  <div className="card-header">
                    <div className="card-icon-wrapper">
                      <Icons.Rupee />
                    </div>
                    <h2>Workforce & Finances</h2>
                  </div>

                  <div className="card-body">
                    <div className="labor-grid">
                      <div className="input-group">
                        <label htmlFor="maleLabour">Male Labor</label>
                        <input
                          id="maleLabour"
                          type="number"
                          name="maleLabour"
                          value={formData.maleLabour}
                          onChange={handleChange}
                          placeholder="0"
                          min="0"
                        />
                      </div>
                      <div className="input-group">
                        <label htmlFor="femaleLabour">Female Labor</label>
                        <input
                          id="femaleLabour"
                          type="number"
                          name="femaleLabour"
                          value={formData.femaleLabour}
                          onChange={handleChange}
                          placeholder="0"
                          min="0"
                        />
                      </div>
                    </div>

                    {/* Dynamic Workforce Counter */}
                    <div className="total-workforce-display">
                      <div className="labor-label">
                        <Icons.Users /> Total Workforce Today
                      </div>
                      <div className="labor-badge">
                        {totalLabour} {totalLabour === 1 ? "Labourer" : "Labourers"}
                      </div>
                    </div>

                    <div className="input-group">
                      <label htmlFor="labourPayment">
                        Labour Payment Today (₹)
                      </label>
                      <input
                        id="labourPayment"
                        type="number"
                        name="labourPayment"
                        value={formData.labourPayment}
                        onChange={handleChange}
                        placeholder="e.g., 12500"
                        min="0"
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="expenses">
                        Other Site Expenses Today (₹)
                      </label>
                      <input
                        id="expenses"
                        type="text"
                        name="expenses"
                        value={formData.expenses}
                        onChange={handleChange}
                        placeholder="e.g., 4500 (cement transport)"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* --- CARD 3: MATERIAL TRACKING & REMARKS --- */}
                <div className="dashboard-card">
                  <div className="card-header">
                    <div className="card-icon-wrapper">
                      <Icons.Wrench />
                    </div>
                    <h2>Material & Logs</h2>
                  </div>

                  <div className="card-body">
                    <div className="input-group">
                      <label htmlFor="materialUsed">Material Used Today</label>
                      <textarea
                        id="materialUsed"
                        name="materialUsed"
                        value={formData.materialUsed}
                        onChange={handleChange}
                        placeholder="List cement bags, sand quantities, steel rods, bricks, etc..."
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="requiredMaterial">Required Material (Upcoming)</label>
                      <textarea
                        id="requiredMaterial"
                        name="requiredMaterial"
                        value={formData.requiredMaterial}
                        onChange={handleChange}
                        placeholder="Specify materials needed for the next construction phase..."
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="remarks">
                        <Icons.Alert /> Critical Remarks
                      </label>
                      <textarea
                        id="remarks"
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        placeholder="Mention weather delays, machinery breakdown, safety logs, etc..."
                      />
                    </div>
                  </div>
                </div>

                {/* --- CARD 4: PROGRESS & STATUS --- */}
                <div className="dashboard-card">
                  <div className="card-header">
                    <div className="card-icon-wrapper">
                      <Icons.TrendUp />
                    </div>
                    <h2>Progress & Verification</h2>
                  </div>

                  <div className="card-body">
                    {/* Status Text Input with Dynamic Badge */}
                    <div className="input-group">
                      <div className="status-label-row">
                        <label htmlFor="workStatus">Work Status</label>
                        {formData.workStatus && (
                          <span className={`status-badge-live ${getStatusBadgeClass(formData.workStatus)}`}>
                            {formData.workStatus}
                          </span>
                        )}
                      </div>
                      <input
                        id="workStatus"
                        type="text"
                        name="workStatus"
                        value={formData.workStatus}
                        onChange={handleChange}
                        placeholder="e.g., In Progress, Completed, Delayed..."
                        required
                      />
                    </div>

                    {/* Completion Text Input */}
                    <div className="input-group">
                      <div className="completion-label-row">
                        <label htmlFor="completion">Work Completion</label>
                        <span className="completion-percent-bubble">
                          {formData.completion || "0"}
                        </span>
                      </div>
                      <div className="completion-text-wrapper">
                        <input
                          id="completion"
                          type="text"
                          name="completion"
                          value={formData.completion}
                          onChange={handleChange}
                          placeholder="e.g., 75"
                          required
                        />
                        {/* Visual progress bar tracks typed value if it's a number */}
                        <div className="completion-bar-outer">
                          <div 
                            className="completion-bar-inner" 
                            style={{ 
                              width: `${Math.min(100, Math.max(0, parseInt(formData.completion) || 0))}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="input-group">
                      <label htmlFor="tomorrowSchedule">Tomorrow Work Schedule</label>
                      <textarea
                        id="tomorrowSchedule"
                        name="tomorrowSchedule"
                        value={formData.tomorrowSchedule}
                        onChange={handleChange}
                        placeholder="Outline core tasks scheduled for tomorrow..."
                      />
                    </div>

                    {/* Custom Drag & Drop Uploader */}
                    <div className="input-group">
                      <label><Icons.Camera /> Site Photo Verification</label>
                      
                      {!preview ? (
                        <div 
                          className={`drag-uploader-zone ${dragActive ? "drag-active" : ""}`}
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleDrag}
                          onDrop={handleDrop}
                        >
                          <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="file-hidden-input"
                          />
                          <label htmlFor="file-upload" className="uploader-label">
                            <Icons.UploadCloud />
                            <span className="uploader-primary-text">
                              Drag & Drop Photo Here
                            </span>
                            <span className="uploader-secondary-text">
                              or click to browse from device
                            </span>
                          </label>
                        </div>
                      ) : (
                        <div className="preview-image-card">
                          <img
                            src={preview}
                            alt="Uploaded Site Preview"
                            className="preview-image-previewed"
                          />
                          <div className="preview-overlay">
                            <button
                              type="button"
                              className="remove-photo-btn"
                              onClick={removePhoto}
                              title="Remove Photo"
                            >
                              <Icons.Trash /> Remove Photo
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

              </div>

              {/* Submit Bar */}
              <div className="submit-action-container">
                <button 
                  type="submit" 
                  className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Uploading & Submitting Report...
                    </>
                  ) : (
                    "Submit Daily Site Report"
                  )}
                </button>
              </div>

            </fieldset>
          </form>
        ) : (
          /* --- TAB 2: HISTORY LIST --- */
          <div className="history-view">
            {/* Search and Filters bar */}
            <div className="history-toolbar">
              <div className="search-bar-container">
                <span className="search-icon-wrapper">
                  <svg className="search-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search reports by site or engineer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Reports List Rendering */}
            {filteredReports.length === 0 ? (
              <div className="empty-history-card">
                <div className="empty-icon-wrapper">
                  <Icons.Clipboard />
                </div>
                <h3>No reports found</h3>
                <p>
                  {searchQuery 
                    ? "No logs match your search term. Try adjusting your query." 
                    : "You haven't submitted any daily progress reports from this device yet."}
                </p>
                {!searchQuery && (
                  <button 
                    type="button" 
                    className="goto-submit-btn" 
                    onClick={() => setActiveTab("submit")}
                  >
                    Submit First Report
                  </button>
                )}
              </div>
            ) : (
              <div className="history-grid">
                {filteredReports.map((report) => (
                  <div 
                    key={report.id || report.dateTime} 
                    className="history-card"
                    onClick={() => setActiveReportModal(report)}
                  >
                    <div className="history-card-header">
                      <div className="history-card-title-area">
                        <h3>{report.siteName}</h3>
                        <span className="history-card-date">{report.dateTime}</span>
                      </div>
                      <button 
                        type="button" 
                        className="delete-report-btn" 
                        onClick={(e) => deleteReport(report.id, e)}
                        title="Delete Log Entry"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                    
                    <div className="history-card-body">
                      <div className="history-meta-row">
                        <span className="meta-label">Site Engineer:</span>
                        <span className="meta-value">{report.engineerName}</span>
                      </div>

                      {/* Status */}
                      <div className="history-meta-row">
                        <span className="meta-label">Status:</span>
                        <span className={`status-badge-live ${getStatusBadgeClass(report.workStatus)}`}>
                          {report.workStatus}
                        </span>
                      </div>

                      {/* Completion progress bar */}
                      <div className="history-progress-section">
                        <div className="history-progress-label">
                          <span>Work Completion</span>
                          <span>{report.completion || "0"}</span>
                        </div>
                        <div className="history-progress-track">
                          <div 
                            className="history-progress-fill" 
                            style={{ 
                              width: `${Math.min(100, Math.max(0, parseInt(report.completion) || 0))}%` 
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Card Thumbnail */}
                      {report.photoUrl && (
                        <div className="history-card-thumbnail">
                          <img src={report.photoUrl} alt="Site Thumbnail" className="thumbnail-img" />
                        </div>
                      )}
                    </div>

                    <div className="history-card-footer">
                      <span className="view-details-link">
                        View Detailed Report &rarr;
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- DETAILED MODAL POPUP --- */}
      {activeReportModal && (
        <div className="modal-backdrop" onClick={() => setActiveReportModal(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
              <div className="modal-title-group">
                <h2>{activeReportModal.siteName}</h2>
                <p className="modal-subtitle">{activeReportModal.dateTime}</p>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setActiveReportModal(null)}
                title="Close Window"
              >
                &times;
              </button>
            </header>
            
            <div className="modal-body">
              <div className="modal-section-grid">
                {/* General Status Card */}
                <div className="modal-detail-card">
                  <h3>General Status</h3>
                  <div className="modal-detail-row">
                    <span className="detail-label">Engineer Name</span>
                    <span className="detail-value">{activeReportModal.engineerName}</span>
                  </div>
                  <div className="modal-detail-row">
                    <span className="detail-label">Work Status</span>
                    <span className={`status-badge-live ${getStatusBadgeClass(activeReportModal.workStatus)}`}>
                      {activeReportModal.workStatus}
                    </span>
                  </div>
                  <div className="modal-detail-row">
                    <span className="detail-label">Work Completion</span>
                    <span className="completion-percent-bubble">{activeReportModal.completion || "0"}</span>
                  </div>
                </div>

                {/* Workforce & Financials */}
                <div className="modal-detail-card">
                  <h3>Workforce & Finances</h3>
                  <div className="modal-detail-row">
                    <span className="detail-label">Total Labor force</span>
                    <span className="detail-value">
                      {Number(activeReportModal.maleLabour || 0) + Number(activeReportModal.femaleLabour || 0)} Labourers
                      <small className="detail-subtext">({activeReportModal.maleLabour || 0} M, {activeReportModal.femaleLabour || 0} F)</small>
                    </span>
                  </div>
                  <div className="modal-detail-row">
                    <span className="detail-label">Labour Payment</span>
                    <span className="detail-value">₹{Number(activeReportModal.labourPayment || 0).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="modal-detail-row">
                    <span className="detail-label">Other Site Expenses</span>
                    <span className="detail-value">{formatExpenses(activeReportModal.expenses)}</span>
                  </div>
                </div>
              </div>

              {/* Logs text blocks */}
              <div className="modal-detail-block">
                <h3>Material Used Today</h3>
                <p className="modal-text-content">{activeReportModal.materialUsed || "No materials logged today."}</p>
              </div>

              <div className="modal-detail-block">
                <h3>Required Material (Upcoming)</h3>
                <p className="modal-text-content">{activeReportModal.requiredMaterial || "No materials requested."}</p>
              </div>

              <div className="modal-detail-block">
                <h3>Tomorrow Work Schedule</h3>
                <p className="modal-text-content">{activeReportModal.tomorrowSchedule || "No work schedule logged."}</p>
              </div>

              <div className="modal-detail-block">
                <h3>Critical Remarks</h3>
                <p className="modal-text-content">{activeReportModal.remarks || "No remarks logged."}</p>
              </div>

              {/* Verification Image */}
              {activeReportModal.photoUrl && (
                <div className="modal-image-container">
                  <h3>Site Verification Photo</h3>
                  <div className="modal-image-wrapper">
                    <img 
                      src={activeReportModal.photoUrl} 
                      alt="Site Verification" 
                      className="modal-full-image"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;