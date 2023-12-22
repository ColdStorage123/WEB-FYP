import React from "react";
import { Link } from "react-router-dom";

const heroSectionStyles = {
  container: {
    position: "relative",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    background: "url('./image.jpg') no-repeat center center",
    backgroundSize: "cover",
    height: 'auto',
    
  },
  text: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '20px',
    borderRadius: '10px',
    backdropFilter: 'blur(10px)',
    height: 'auto',
    color: 'Black'
  },
  heading: {
    fontSize: "2.5rem",
  },
  paragraph: {
    fontSize: "1rem",
    marginTop: "10px",
  },
  button: {
    backgroundColor: "#00e676",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    margin: "10px",
    textDecoration: "none",
    fontSize: "1rem",
  },
};

// Media Queries
const mediaQueries = `
  @media (max-width: 768px) {
    .container {
      padding: 20px;
    }
    .text {
      padding: 10px;
    }
    .heading {
      font-size: 2rem;
    }
    .paragraph {
      font-size: 0.8rem;
    }
    .button {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 10px;
    }
    .text {
      padding: 5px;
    }
    .heading {
      font-size: 1.5rem;
    }
    .paragraph {
      font-size: 0.7rem;
    }
    .button {
      font-size: 0.7rem;
    }
  }
`;

const HeroSection = () => {
  return (
    <div style={heroSectionStyles.container}>
      

      <div style={heroSectionStyles.text}>
        <h2 style={heroSectionStyles.heading}><b>Empowering Farmers Preserving Harvests</b></h2>
        <h2 style={heroSectionStyles.heading}>Connect with local ColdStorages to preserve Crops</h2>
        <p style={heroSectionStyles.paragraph}>Join Now!!</p>
        <Link to="/register" style={heroSectionStyles.button}>Register</Link>
        <Link to="/login" style={heroSectionStyles.button}>Login</Link>
      </div>
      <style>{mediaQueries}</style>
    </div>
  );
};

export default HeroSection;
