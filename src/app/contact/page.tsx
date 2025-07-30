import React from 'react';
import Header from "../../components/Header";
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto p-6 bg-[#FFFBD9] rounded shadow mt-10">
        <h1 className="text-2xl font-bold mb-4 text-[#1a124d]">Contact Us</h1>
        <p className="mb-6">Have questions, feedback, or concerns? Fill out the form below or email us directly at <a href="mailto:support@sarkariresultsnow.com" className="text-blue-600 underline">support@sarkariresultsnow.com</a>.</p>
        <form className="flex flex-col gap-4">
          <input type="text" name="name" placeholder="Your Name" className="border rounded px-3 py-2" required />
          <input type="email" name="email" placeholder="Your Email" className="border rounded px-3 py-2" required />
          <textarea name="message" placeholder="Your Message" className="border rounded px-3 py-2" rows={5} required />
          <button type="submit" className="bg-[#1a124d] text-white px-4 py-2 rounded hover:bg-[#2d1e6b]">Send Message</button>
        </form>
      </div>
      <Footer />
    </>
  );
} 