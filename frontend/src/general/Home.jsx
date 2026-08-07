import React from "react";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import FeaturedCourses from "../components/home/FeaturedCourses";
import LatestNotes from "../components/home/LatestNotes";
import Statistics from "../components/home/Statistics";
import LearningJourney from "../components/home/LearningJourney";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import CTASection from "../components/home/CTASection";

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedCourses />
      <LatestNotes />
      <Statistics />
      <LearningJourney />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
export default Home;