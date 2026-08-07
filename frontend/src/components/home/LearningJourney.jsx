import React from "react";
import "../../css/Home.css";
const steps = [
    {
        icon: "bi bi-filetype-html",
        title: "Learn HTML",
        desc: "Build the foundation of web development."
    },
    {
        icon: "bi bi-filetype-css",
        title: "Master CSS",
        desc: "Design beautiful and responsive website."
    },
    {
        icon: "bi bi-filetype-js",
        title: "JavaScript",
        desc: "Add interactivity and dynamic features."
    },
    {
        icon: "bi bi-box",
        title: "React & Node",
        desc: "Build modern full-stack application."
    },
    {
        icon: "bi bi-trophy-fill",
        title: "Build Projects",
        desc: "Create real-world portfolio projects."
    },
    {
        icon: "bi bi-briefcase-fill",
        title: "Get Job Ready",
        desc: "Prepare for internships and placements."
    }
];
function LearningJourney() {
    return (
        <section className="journey-section py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Your Learning Journey</h2>
                    <p className="text-muted">Follow a structured roadmap to become a skilled developer.</p>
                </div>
                <div className="row g-4">
                    {steps.map((step, index) => (
                        <div className="col-lg-4 col-md-6" key={index}>
                            <div className="journey-card">
                                <div className="journey-number">
                                    {index + 1}
                                </div>
                                <i
                                    className={`${step.icon} journey-icon`}></i>
                                <h4>{step.title}</h4>
                                <p>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default LearningJourney;