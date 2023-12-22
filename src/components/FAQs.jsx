import React, { useState } from 'react';
import './FAQ.css'; 

const FAQ = () => {
  const [faqs] = useState([
    { question: 'What is the Cold Store how does it work?', answer: 'The Cold Store is an online platform that connects farmers with available cold storage facilities. Farmers can search for nearby cold storages, view their details, and book storage slots for preserving their crops.' },
    { question: 'How can farmers benefit from using this platform?', answer: 'Farmers benefit by finding suitable and convenient cold storage facilities to preserve their crops, preventing loss due to spoilage. This platform provides a convenient way for farmers to locate storage spaces, ensuring the quality of their produce.' },
    { question: 'How can cold storage owners benefit from participating in this system?', answer: 'Cold storage owners can reach a wider audience and maximize their facility utilization. They can attract more customers by listing their services on the platform and ensuring that their storage spaces are efficiently utilized.' },
    { question: 'Is the platform available both as a website and a mobile app?', answer: 'Yes, the platform is available both as a website and a mobile app, providing users with flexibility and accessibility to find and book cold storage facilities.' },
    { question: 'Is there a cost associated with using this service for farmers or cold storage owners?', answer: 'The cost structure may vary, and it depends on the policies of individual cold storage owners. The platform itself may not charge farmers for using the service, but there could be charges associated with booking storage slots, which are set by the cold storage owners.' },
    { question: 'What crops can be stored in the cold storage facilities listed on the platform?', answer: 'Various types of crops such as fruits, vegetables, grains, and other perishable items can be stored in the cold storage facilities listed on the platform.' },

  ]);

  return (
    <div className="faq-container">

      <h1 className='heading'>Frequently Asked Questions  </h1>
  
      
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="question">{faq.question}</div>
          <div className="answer">{faq.answer}</div>
        </div>
      ))}
      <br></br>
     
    
    </div>
  );
};

export default FAQ;
