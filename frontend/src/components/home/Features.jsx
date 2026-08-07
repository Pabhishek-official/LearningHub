import React from "react";
import "../../css/Home.css";
const features = [
    {
        icon: "bi bi-mortarboard-fill",
        title: "Expert Mentors",
        description: "Learn from experienced instructors with practical industry knowledge."
    },
    {
        icon: "bi bi-journal-richtext",
        title: "Free Study Notes",
        description: "Download high-quality notes and PDFs for every subject."
    },
    {
        icon: "bi bi-laptop",
        title: "Live Projects",
        description: "Work on real-world MERN Stack and programming projects."
    },
    {
        icon: "bi bi-patch-check-fill",
        title: "Certificates",
        description: "Earn Certificates after completing courses and projects."
    },
];
function Features() {
    return (
        <section className="features-section py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Why Choose LearningHub?</h2>
                    <p className="text-muted">
                        Everything you need to start your learning journey.
                    </p>
                </div>
                <div className="row g-4">
                    {features.map((feature, index) => (
                        <div className="col-lg-3 col-md-6" key={index}>
                            <div className="feature-card">
                                <i className={`${feature.icon} feature-icon`}></i>
                                <h4>{feature.title}</h4>
                                <p>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default Features;