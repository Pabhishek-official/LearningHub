import React, { useEffect, useState } from "react";
import "../css/BackToTop.css";
function BackToTop() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    return (
        visible && (
            <button
                className="back-to-top"
                onClick={scrollToTop}>
                <i className="bi bi-arrow-up"></i>
            </button>
        )
    );
}
export default BackToTop;