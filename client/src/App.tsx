import React from "react";
import ResumeTool from "./components/ResumeTool";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 cursor-default">StandOut</h1>
          {/* Navigation */}
          <nav className="space-x-6 flex items-center">
            <a
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:underline cursor-pointer transition"
            >
              Home
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:underline cursor-pointer transition"
            >
              Features
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:underline cursor-pointer transition"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-200 py-20 text-center flex-grow">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Build a Resume That Gets You Hired</h2>
          <p className="text-gray-700 text-lg mb-6">
            Use AI to instantly critique and improve your resume so you stand out to recruiters.
          </p>
          <a
            href="#tool"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Try It Now
          </a>
        </div>
      </section>

      {/* Resume Tool */}
      <section id="tool" className="px-4 max-w-4xl mx-auto w-full mb-16">
        <ResumeTool />
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid gap-8 md:grid-cols-3 text-center">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Instant Feedback</h3>
          <p className="text-gray-600 text-sm">
            Receive detailed, AI-powered suggestions to improve your resume instantly.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Tailored for Tech</h3>
          <p className="text-gray-600 text-sm">
            Designed to help aspiring developers and IT pros break into the industry.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">No Signup Needed</h3>
          <p className="text-gray-600 text-sm">
            Just paste your resume and hit “Analyze” – no account required.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} StandOut. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
