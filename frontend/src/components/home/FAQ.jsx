import React from "react";
import "../../css/Home.css";
function FAQ() {
    return (
        <section className="faq-section py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Frequently Asked Questions</h2>
                    <p className="text-muted">Everything you need to know about LearningHub.</p>
                </div>
                <div className="accordion" id="faqAccordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#faq1">Are the courses free?</button>
                        </h2>
                        <div
                            id="faq1"
                            className="accordion-collapse collapse show"
                            data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                                We provide both free and premium learning resources to help students at every level.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#faq2">
                                Can I download study notes?
                            </button>
                        </h2>
                        <div
                            id="faq2"
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                                Yes. Every uploaded note can be downloaded directly as a PDF.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#faq3">
                                Can I access LearningHub on mobile?
                            </button>
                        </h2>
                        <div
                            id="faq3"
                            className="accordion-collapse collapse"
                            data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                                Yes. LearningHub is fully responsive and works on desktops, tablets, and smartphones.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default FAQ;