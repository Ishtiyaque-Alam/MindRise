import { useState } from "react";
import "./Accordion.css"
const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="accordion-item">
      <button className={`accordion-header ${isOpen ? "active" : ""}`} onClick={onClick}>
        {title}
        <span className={`icon ${isOpen ? "rotate" : ""}`}>▼</span>
      </button>
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <p>{content}</p>
      </div>
    </div>
  );
};

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    { title: "Who are the therapists?", content: "Our therapists are certified professionals with years of experience." },
    { title: "Who will be helping me?", content: "You’ll be matched with a therapist based on your preferences and needs." },
    { title: "Is this service right for me?", content: "If you're seeking therapy to improve your well-being, this might be for you!" },
    { title: "How much does it cost?", content: "Therapy sessions range from $70 to $100 per week, billed monthly." },
    { title: "How long until I’m matched?", content: "Matching typically takes a few hours to a couple of days." },
    { title: "How will I communicate?", content: "You can chat, message, call, or video conference with your therapist." },
    { title: "Can this replace in-person therapy?", content: "While helpful, this does not replace in-person therapy in all cases." },
    { title: "How long can I use this service?", content: "The duration is entirely up to you based on your needs." },
  ];

  return (
    <div className="accordion-container">
      <h2 className="accordion-heading">Frequently Asked Questions</h2>
      <div className="accordion">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
      <div className="accordion-footer">
        <a className="faq-link" href="/faq/">More FAQs</a>
        <a className="btn-primary" href="/get-started/">Get Started</a>
      </div>
    </div>
  );
};

export default Accordion;
