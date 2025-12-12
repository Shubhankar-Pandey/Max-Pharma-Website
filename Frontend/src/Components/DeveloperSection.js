import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaDownload,
  FaRegCopy,
} from "react-icons/fa";
import developerImage from "../Assets/shubhankar.jpeg"; // check path + case

function DeveloperSection() {
  const developer = {
    name: "Shubhankar Pandey",
    title: "Fullstack Developer",
    email: "shubhankarpandey1509@gmail.com",
    linkedin: "https://www.linkedin.com/in/shubhankarpandey/",
    github: "https://github.com/Shubhankar-Pandey",
    contact: "+91 9120371404",
    location: "India",
    shortBio:
      "Full-stack developer skilled in building scalable applications with modern frontend and backend technologies. I integrate AI-powered features into real-world projects, focusing on clean architecture, performance, and seamless user experiences.",
  };

  const handleCopy = async (text, label) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      // replace alerts with toasts if you have a toast library
      alert(`${label} copied to clipboard`);
    } catch (err) {
      console.error("Copy failed", err);
      alert("Failed to copy — please copy manually.");
    }
  };

  const handleDownloadVCard = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${developer.name}`,
      `TITLE:${developer.title || ""}`,
      `TEL;TYPE=WORK,VOICE:${developer.contact}`,
      `EMAIL;TYPE=PREF,INTERNET:${developer.email}`,
      `URL:${developer.github}`,
      `URL:${developer.linkedin}`,
      `ADR;TYPE=WORK:;;${developer.location || ""};;;;`,
      "END:VCARD",
    ].join("\n");

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${developer.name.replace(/\s+/g, "_")}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="developer" className="w-full bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* header */}
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-wider text-indigo-600 font-semibold">Meet the Team</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">Developer</h2>
          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            The developer behind this project — reach out for collaborations, fixes, or freelance work.
          </p>
        </div>

        {/* card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8 items-center">
            {/* LEFT: image + basic info + social */}
            <div className="flex flex-col items-center md:items-start gap-4 md:gap-6">
              {/* Zoomed avatar container: larger + object-cover + crop focus */}
              <div className="relative h-44 w-44 md:h-48 md:w-48 rounded-full overflow-hidden shadow-lg">
                <img
                  src={developerImage}
                  alt={developer.name}
                  // bigger container + object-cover for zoomed-in cropping
                  className="h-full w-full object-cover transform scale-110"
                />
                {/* subtle ring */}
                <div className="absolute inset-0 rounded-full ring-2 ring-white/30 pointer-events-none" />
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-900">{developer.name}</h3>
                <p className="text-sm text-indigo-600">{developer.title}</p>
                <p className="mt-1 text-sm text-gray-500">{developer.location}</p>
              </div>

              <div className="flex gap-3 mt-2">
                <a
                  href={developer.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 hover:shadow transition text-sm"
                  aria-label="GitHub"
                >
                  <FaGithub /> GitHub
                </a>

                <a
                  href={developer.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 hover:shadow transition text-sm"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              </div>
            </div>

            {/* RIGHT: bio + contact + actions (spans 2 cols on md+) */}
            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <p className="text-sm text-gray-700 leading-relaxed">{developer.shortBio}</p>

                <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <FaEnvelope className="mt-1 text-gray-500" />
                    <div>
                      <dt className="text-xs text-gray-500">Email</dt>
                      <dd className="text-sm text-gray-900 break-words">{developer.email}</dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaPhone className="mt-1 text-gray-500" />
                    <div>
                      <dt className="text-xs text-gray-500">Phone</dt>
                      <dd className="text-sm text-gray-900">{developer.contact}</dd>
                    </div>
                  </div>
                </dl>
              </div>

              {/* actions: responsive stacking on small screens */}
              <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap items-stretch gap-3">
                <button
                  onClick={() => (window.location.href = `mailto:${developer.email}`)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
                  aria-label="Send email"
                >
                  <FaEnvelope /> Email
                </button>

                <button
                  onClick={() => (window.location.href = `tel:${developer.contact.replace(/\s+/g, "")}`)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm hover:shadow transition"
                  aria-label="Call"
                >
                  <FaPhone /> Call
                </button>

                <button
                  onClick={() => handleCopy(developer.email, "Email")}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50 transition"
                  aria-label="Copy email"
                >
                  <FaRegCopy /> Copy Email
                </button>

                <button
                  onClick={() => handleCopy(developer.contact, "Phone number")}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50 transition"
                  aria-label="Copy phone"
                >
                  <FaRegCopy /> Copy Phone
                </button>

                <button
                  onClick={handleDownloadVCard}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50 transition"
                  aria-label="Download vCard"
                >
                  <FaDownload /> vCard
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* small footer note */}
        <p className="text-xs text-gray-400 mt-4 text-center">
          Want this section customized (profile picture, different CTA, more developers)? Tell me the details.
        </p>
      </div>
    </section>
  );
}

export default DeveloperSection;
