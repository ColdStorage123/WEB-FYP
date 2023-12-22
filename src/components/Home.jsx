import React from "react";
import Navbar from "./Navbar"; 

import DownloadAppSection from "./MobileApp"
import Footer from "./Footer"


import FAQ from "./FAQs";
import ImageSlider from "./ImageSlider";
import FeaturesSection from "./FeaturesSection";
import ProblemSolutionSection from "./ProblemSolutionSection";
import WhyChooseUs from "./WhyChooseUs";
import CallToActionSection from "./CallToActionSection";
import SliderSection from "./SliderSection";

const Home = () => {
  return (
    <div>
      <Navbar />
      <ImageSlider />
      <ProblemSolutionSection />
   {/*  <PSLanding /> */ }
      <FeaturesSection />
   {/*    <Benefits /> */ }
      <WhyChooseUs />
      <CallToActionSection />
 
    
      <FAQ />
      <DownloadAppSection/>
      <Footer />

      
      
    </div>
  );
};

export default Home;