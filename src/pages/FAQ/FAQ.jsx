import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is VLSIGuru?",
      answer:
        "VLSIGuru is an online platform dedicated to providing free educational resources for learning VLSI (Very Large Scale Integration) design and related topics.",
    },
    {
      question: "How do I access courses on VLSIGuru?",
      answer:
        "To access courses, create a free account on VLSIGuru, explore the extensive library of VLSI-based courses, and start learning through video tutorials, practice exercises, and downloadable resources.",
    },
    {
      question: "Are all courses on VLSIGuru completely free?",
      answer:
        "Yes, all courses on VLSIGuru are free. Our mission is to make VLSI education accessible to everyone, regardless of financial circumstances.",
    },
    {
      question: "What types of courses are available on VLSIGuru?",
      answer:
        "VLSIGuru offers courses on topics such as digital design, Verilog HDL, SystemVerilog, ASIC design flow, FPGA design, semiconductor fundamentals, and more.",
    },
    {
      question: "Can I download VLSI course materials from VLSIGuru?",
      answer:
        "Yes, VLSIGuru allows you to download notes, PDFs, and other course materials, making it easy to continue learning offline.",
    },
    {
      question: "How can I track my learning progress on VLSIGuru?",
      answer:
        "After enrolling in a course, your learning progress is displayed on your dashboard, showing completed lessons, quizzes, and overall course completion status.",
    },
    {
      question: "Can I earn certificates on VLSIGuru?",
      answer:
        "Yes, upon completing specific courses, you will receive certificates of completion that can be shared on LinkedIn or included in your resume.",
    },
    {
      question: "Does VLSIGuru provide practical project-based learning?",
      answer:
        "Absolutely! VLSIGuru includes project-based learning to help you gain hands-on experience with VLSI design tools and workflows.",
    },
    {
      question: "Is there a community to interact with other VLSI learners?",
      answer:
        "Yes, VLSIGuru has a vibrant community forum where learners can ask questions, discuss concepts, and collaborate on projects with peers worldwide.",
    },
    {
      question: "Does VLSIGuru offer advanced courses for professionals?",
      answer:
        "Yes, VLSIGuru provides advanced courses for industry professionals, covering topics like physical design, timing analysis, and RTL-to-GDSII flow.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="main-faq-container main-faq">
      <h1 className="main-faq-container-header main-faq">
        Frequently Asked Questions
      </h1>
      <div className="main-faq-list main-faq">
        {faqs.map((faq, index) => (
          <div key={index} className="main-faq-item main-faq">
            <button
              className={`main-faq-question main-faq ${
                openIndex === index ? "open" : ""
              }`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="main-faq-icon main-faq">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="main-faq-answer main-faq">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
