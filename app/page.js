'use client'

import React from "react";
import { motion } from "framer-motion";
import PrimaryButton from "./components/primary-button";
import Card from "./components/card";

// import { generateFlashCards } from "./actions";

export default function Home() {
  return (
    <div>
      {/* <button onClick={() => generateFlashCards(10, "Revelation", null)}>Do Stuff</button> */}

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Transform Your Study Sessions with AI
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            EduMorph helps you create personalized, AI-powered study sets for any
            topic, making learning efficient and engaging.
          </p>
          <PrimaryButton text={"Get Started"} />
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card title={"AI-Powered Sets"} text={"Quickly generate study materials for any subject with the power of AI."}/>
        <Card title={"Customizable Content"} text={"Tailor your study sets to your unique learning needs and preferences."}/>
        <Card title={"Track Your Progress"} text={"Monitor your improvement and stay motivated with in-app insights."}/>
      </div>

    </div>
  );
}
