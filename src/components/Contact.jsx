"use client";

import { useState } from "react";

export default function Contact({ personalInfo }) {
  const email = personalInfo?.email || "shakib.pharmacy@gmail.com";
  const linkedin = personalInfo?.linkedin || "https://linkedin.com/in/md-shakib-al-hasan";
  const researchgate = personalInfo?.researchgate || "https://www.researchgate.net/profile/Md-Shakib-Al-Hasan";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Full name is required.";
    
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format.";
    }
    
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required.";
    if (!formData.message.trim()) {
      tempErrors.message = "Message content is required.";
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.error || "Failed to submit message." });
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setErrors({ submit: "A network error occurred. Please try again." });
      setStatus("error");
    }
  };

  return (
    <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface" id="contact">
      <div className="max-w-container-max mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold mb-3">
                Connect With Me
              </div>
              <h2 className="font-display-lg text-3xl md:text-display-lg text-on-surface font-extrabold tracking-tight">
                Let's Collaborate
              </h2>
              <div className="h-1.5 w-24 bg-primary mt-4 rounded-full"></div>
              
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-6">
                Are you looking to collaborate on computational screening, pharmacy research initiatives, or professional training? Get in touch and let's discuss details.
              </p>
            </div>

            {/* Structured Contact info cards */}
            <div className="space-y-4">
              
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 p-4.5 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl hover:border-primary/40 hover:shadow-sm transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-xl">mail</span>
                </div>
                <div>
                  <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant block">Email Address</span>
                  <span className="font-body-sm text-body-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                    {email}
                  </span>
                </div>
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4.5 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl hover:border-primary/40 hover:shadow-sm transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-secondary text-xl">share</span>
                </div>
                <div>
                  <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant block">LinkedIn Network</span>
                  <span className="font-body-sm text-body-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                    Shakib's Profile
                  </span>
                </div>
              </a>

              <a
                href={researchgate}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4.5 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl hover:border-primary/40 hover:shadow-sm transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-xl">menu_book</span>
                </div>
                <div>
                  <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant block">Research Publications</span>
                  <span className="font-body-sm text-body-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                    ResearchGate Profile
                  </span>
                </div>
              </a>

            </div>

            {/* Professional Credentials Badge */}
            <div className="p-4 bg-surface-container border border-outline-variant/30 rounded-2xl flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-2xl animate-pulse">check_circle</span>
              <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                Hospital Rotations Verified &amp; CADD Trained
              </span>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6.5 md:p-8 clinical-shadow flex flex-col justify-between">
            
            {status === "success" ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 animate-[scaleIn_0.3s_ease-out]">
                <span className="material-symbols-outlined text-secondary text-7xl animate-[bounce_1.5s_infinite]">
                  check_circle
                </span>
                <h3 className="font-headline-md text-xl font-bold text-on-surface mt-6">
                  Message Sent Successfully!
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mt-2 leading-relaxed">
                  Thank you for reaching out. Shakib will review your message and reply via email as soon as possible.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 bg-primary text-on-primary font-label-md text-label-md px-6 py-2.5 rounded-xl hover:bg-primary-container font-semibold transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-headline-md text-lg font-bold text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-3 mb-6">
                  <span className="material-symbols-outlined text-primary">rate_review</span>
                  Send Message
                </h3>
                {status === "error" && (
                  <div className="p-4 bg-error/5 border border-error/20 text-error rounded-xl font-body-sm text-body-sm font-semibold animate-[fadeIn_0.3s_ease-out]">
                    {errors.submit || "An error occurred while submitting. Please check fields and try again."}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full p-3.5 border rounded-xl bg-surface text-on-surface font-body-sm text-body-sm focus:border-primary focus:outline-none transition-colors ${
                        errors.name ? "border-error" : "border-outline-variant"
                      }`}
                      placeholder="e.g. John Doe"
                    />
                    {errors.name && (
                      <p className="text-label-sm font-label-sm text-error font-semibold">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3.5 border rounded-xl bg-surface text-on-surface font-body-sm text-body-sm focus:border-primary focus:outline-none transition-colors ${
                        errors.email ? "border-error" : "border-outline-variant"
                      }`}
                      placeholder="e.g. name@domain.com"
                    />
                    {errors.errors && errors.email ? (
                      <p className="text-label-sm font-label-sm text-error font-semibold">
                        {errors.email}
                      </p>
                    ) : (
                      errors.email && (
                        <p className="text-label-sm font-label-sm text-error font-semibold">
                          {errors.email}
                        </p>
                      )
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1.5">
                  <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full p-3.5 border rounded-xl bg-surface text-on-surface font-body-sm text-body-sm focus:border-primary focus:outline-none transition-colors ${
                      errors.subject ? "border-error" : "border-outline-variant"
                    }`}
                    placeholder="e.g. Research Collaboration Proposal"
                  />
                  {errors.subject && (
                    <p className="text-label-sm font-label-sm text-error font-semibold">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Message Content
                    </label>
                    <span className="text-label-sm font-label-sm text-on-surface-variant">
                      {formData.message.length} chars
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full p-3.5 border rounded-xl bg-surface text-on-surface font-body-sm text-body-sm focus:border-primary focus:outline-none transition-colors resize-none ${
                      errors.message ? "border-error" : "border-outline-variant"
                    }`}
                    placeholder="Write details about your question, project proposal, or inquiry here..."
                  />
                  {errors.message && (
                    <p className="text-label-sm font-label-sm text-error font-semibold">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-md text-label-md uppercase tracking-widest font-bold shadow-md hover:bg-primary-container disabled:bg-outline-variant disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {status === "submitting" && (
                      <span className="material-symbols-outlined animate-spin text-lg">sync</span>
                    )}
                    {status === "submitting" ? "Sending Inquiry..." : "Submit Message"}
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
