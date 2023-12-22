import React from "react";
import { Link } from "react-router-dom";

const downloadAppSectionStyles = {
  container: {
    backgroundColor: "#f0f0f0", 
    padding: "40px",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  appIcons: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  appIcon: {
    width: "150px",
    height: "200px",
    margin: "0 10px",
  },
};

const DownloadAppSection = () => {
    return (
      <div style={downloadAppSectionStyles.container}>
        <h2 style={downloadAppSectionStyles.heading}><b>Download Our App</b></h2>
        <div style={downloadAppSectionStyles.appIcons}>
          <Link to="/google">
            <img src="google.png" alt="Google Play" style={downloadAppSectionStyles.appIcon} />
          </Link>
          <br></br>
          <Link to="/apple">
            <img src="google.png" alt="App Store" style={downloadAppSectionStyles.appIcon} />
          </Link>
        </div>
      </div>
    );
  };

export default DownloadAppSection;
