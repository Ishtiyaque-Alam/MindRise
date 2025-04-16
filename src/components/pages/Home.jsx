import React, { useState } from "react"
import AnimatedCard from "../cards/Frontcard";
import couples1 from "../../assets/illustrations/hp_illustrated_buttons_desktop_couples_default.png"
import couples2 from "../../assets/illustrations/hp_illustrated_buttons_desktop_couples_movement.png"
import "./home.css"
import teen1 from "../../assets/illustrations/teen1.png"
import teen2 from "../../assets/illustrations/teen2.png"

import ind1 from "../../assets/illustrations/individual1.png"
import ind2 from "../../assets/illustrations/individual2.png"

import thera1 from "../../assets/therapist1.jpeg"
import thera2 from "../../assets/therapist2.jpeg"
import thera3 from "../../assets/therapist3.jpeg"
import thera4 from "../../assets/therapist4.jpeg"
import thera5 from "../../assets/therapist5.jpeg"
import mainthera from "../../assets/mainthera.jpg"
import image from "../../assets/btw.png"
import ChatBot from "../chatbot/ChatBot";
import Accordion from "../cards/Accordion";
const Home = () => {
  const [bot,setbot] =useState(false);
  return (
    <>
      <div className="heroparent" >
        <h1 style={{ textAlign: "center", color: "white" }}>You deserve to be happy.</h1>
        <h2 style={{ textAlign: "center", color: "white" }}>What type of therapy are you looking for?</h2>
        <div className="hero">
          <div className="cards">
            <AnimatedCard
              title="Couples"
              subtitle="For me and my partner"
              images={[
                couples1, couples2
              ]}
            />
          </div>
          <div className="cards">
            <AnimatedCard
              title="Kids"
              subtitle="For me and my Kid"
              images={[
                teen1, teen2
              ]}
            />
          </div>
          <div className="cards">
            <AnimatedCard
              title="Individual"
              subtitle="For myself"
              images={[
                ind1, ind2
              ]}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="text-content">
          <h1>Professional and qualified therapists who you can trust</h1>
          <p>Tap into the world's largest network of qualified and experienced therapists who can help you with a range of issues including depression, anxiety, relationships, trauma, grief, and more. With our therapists, you get the same professionalism and quality you would expect from an in-office therapist, but with the ability to communicate when and how you want.</p>
          <button className="btn">Get matched to a therapist</button>
        </div>

        <div className="image-grid">
          <div className="main-image">
            <img src={mainthera} alt="Main Therapist" />
            <div className="decorative-lines"></div>
          </div>
          <div className="small-images">
            <img src={thera1} alt="Therapist 1" />
            <img src={thera2} alt="Therapist 2" />
            <img src={thera3} alt="Therapist 3" />
            <img src={thera4} alt="Therapist 4" />
            <img src={thera5} alt="Therapist 5" />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={image} style={{ maxHeight: "500px", width: "100%" }} />
      </div>
     <Accordion/>
    <button className="bot" onClick={()=>{setbot(!bot)}}>let's talk</button>
    {bot?<ChatBot />:()=>{setbot(false)}}
    </>
  );
};

export default Home;

