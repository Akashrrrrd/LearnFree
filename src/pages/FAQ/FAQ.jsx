import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is LearnFree?",
      answer:
        "LearnFree is an online platform offering a wide range of free educational resources to help you develop new skills in various subjects, from programming to arts.",
    },
    {
      question: "How do I access courses on LearnFree?",
      answer:
        "To access courses, simply create a free account, browse the course catalog, and start learning. You can access video tutorials, quizzes, and downloadable materials at no cost.",
    },
    {
      question: "Are all courses on LearnFree completely free?",
      answer:
        "Yes, all the courses on LearnFree are completely free. Our goal is to provide accessible education to everyone, regardless of their financial situation.",
    },
    {
      question: "How do I track my learning progress?",
      answer:
        "After enrolling in a course, you can track your learning progress through your dashboard, which shows completed lessons, quizzes, and course completion percentage.",
    },
    {
      question: "Can I download course materials?",
      answer:
        "Yes, LearnFree allows you to download PDFs, notes, and other course materials so you can continue learning offline.",
    },
    {
      question: "What types of courses are available?",
      answer:
        "LearnFree offers a wide variety of courses, including subjects like web development, data science, graphic design, business management, and more.",
    },
    {
      question: "Can I earn certificates on LearnFree?",
      answer:
        "Yes, upon completing certain courses, you can earn certificates of completion that you can share on social media or add to your resume.",
    },
    {
      question: "Is there a community to interact with other learners?",
      answer:
        "Yes, LearnFree has a vibrant community forum where you can discuss topics, share knowledge, and ask questions with fellow learners.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="main-faq-container main-faq">
      <h1 className="main-faq-container-header main-faq">Frequently Asked Questions</h1>
      <div className="main-faq-list main-faq">
        {faqs.map((faq, index) => (
          <div key={index} className="main-faq-item main-faq">
            <button
              className={`main-faq-question main-faq ${openIndex === index ? "open" : ""}`}
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
