import { useState } from "react";

import p1 from "../Assets/p1.jpeg"
import p2 from "../Assets/p2.jpeg"
import p3 from "../Assets/p3.jpeg"
import p4 from "../Assets/p4.jpeg"
import p5 from "../Assets/p5.jpeg"
import p6 from "../Assets/p6.jpeg"
import p7 from "../Assets/p7.jpeg"
import p8 from "../Assets/p8.jpeg"
import p9 from "../Assets/p9.jpeg"
import p10 from "../Assets/p10.jpeg"

function PatientReview() {
  const patients = [
    {
      image: p1,
      name: "Adv. Satendra Patel",
      tag: "Recovered from Glucoma",
      review:
        "When I was diagnosed with glaucoma I was worried about losing vision, but Max Pharma guided me with calm expertise from day one. The consultation was thorough, the doctor explained each test and the treatment plan in plain language, and they set realistic expectations. The eye medications they prescribed were explained clearly and the follow-up schedule was meticulous. Within a few weeks my intraocular pressure improved and the discomfort reduced noticeably. The staff were always available for questions and they treated me with genuine empathy. I truly felt cared for — Max Pharma gave me confidence and excellent clinical care throughout my recovery.",
    },
    {
      image: p2,
      name: "Sameer Patel",
      tag: "Recovered from Sleep Disk",
      review:
        "After struggling with a slipped disk that ruined my sleep, Max Pharma provided a personalized, multi-pronged plan that brought relief faster than I expected. They combined careful medication, guided physiotherapy, and clear at-home exercises that were tailored to my condition. The therapists monitored my progress weekly and modified exercises to reduce pain and restore movement. I began sleeping through the night again and my mobility improved steadily. The team explained posture, ergonomics, and preventative steps so I could avoid re-injury. Their professionalism and follow-up care made a big difference — I’m back to normal activities and very grateful for their help.",
    },
    {
      image: p3,
      name: "Yogendra Prajapati",
      tag: "Diabetic Patient",
      review:
        "Managing diabetes felt overwhelming until I started treatment at Max Pharma — their approach is clinical, supportive, and practical. The nurses who administered my injections and drips were calm, skilled, and explained every step so I felt comfortable. The doctors reviewed my blood sugar trends closely and adjusted treatment in a measured way that improved my levels safely. I received helpful dietary and lifestyle advice that complemented the medical care and made daily management easier. Their follow-up and timely adjustments gave me stability and more energy throughout the day. I couldn’t be happier with the attentive, evidence-based care I received here.",
    },
    {
      image: p4,
      name: "Shivani Thakur",
      tag: "PCOS (Polycystic Ovary Syndrome)",
      review:
        "Dealing with PCOS was stressful, but Max Pharma’s team listened carefully and built a compassionate, individualized treatment plan. They explained hormonal tests, medication options, and lifestyle changes so I fully understood each step. The doctors coordinated with nutrition and wellness advice to help manage symptoms and regulate cycles. Over a few months I saw meaningful improvements in symptoms, energy, and mood. Appointments were handled sensitively and the staff made sure I felt comfortable discussing intimate concerns. I appreciate their holistic, respectful approach — it truly made a positive change in my life.",
    },
    {
      image: p5,
      name: "Renu Pandey",
      tag: "Regular Checkup",
      review:
        "I come to Max Pharma for my regular health checkups and they always deliver thorough, reassuring care. Each visit includes a detailed check, clear explanation of results, and practical advice for preventive health. The staff are punctual, courteous, and make the whole process smooth and stress-free. They flag potential issues early and suggest sensible next steps without unnecessary procedures. I feel confident that my health is being monitored by professionals who care. For routine health maintenance, Max Pharma is dependable and highly recommended.",
    },
    {
      image: p6,
      name: "Shivansh Kashyap",
      tag: "Sports Injury, Threapy",
      review:
        "After a sports injury I turned to Max Pharma for therapy and their multidisciplinary care got me back on my feet. The physiotherapists created a clear rehab plan with progressive exercises focused on strength and flexibility. Each session was hands-on, instructive, and updated based on my improving condition. Pain decreased significantly and my range of motion returned faster than I expected. The coordination between doctors and therapists ensured safe, effective recovery without rushing the process. Their expertise and encouragement helped me return to sport confidently — I highly recommend their sports injury services.",
    },
    {
      image: p7,
      name: "Yogesh Narayan",
      tag: "Seborrheic Dermatitis",
      review:
        "I had persistent skin flare-ups from seborrheic dermatitis and Max Pharma provided fast, professional relief. The dermatologist diagnosed the triggers accurately and prescribed a balanced treatment plan including topical care and lifestyle tips. The clinic explained how to manage flare-ups and recommended gentle skincare routines that actually worked for my skin type. Over several weeks the redness and itching reduced dramatically and my scalp became much calmer. Staff followed up to tweak treatment when needed and were always responsive to questions. Their caring, knowledgeable approach restored my confidence and comfort.",
    },
    {
      image: p8,
      name: "Adv. Avanish Tiwari",
      tag: "Thyphoid",
      review:
        "When I was diagnosed with typhoid I needed quick, reliable treatment and Max Pharma exceeded my expectations. They admitted me promptly, ran the necessary tests, and started targeted antibiotic therapy without delay. The nursing team monitored my vitals and hydration closely and provided supportive care that helped me recover faster. Doctors explained the medication plan and recovery milestones clearly so I knew what to expect each day. Their follow-up advice on diet and precautions prevented relapses and sped up my return to normal activity. I’m grateful for their calm, effective emergency and inpatient care.",
    },
    {
      image: p9,
      name: "Sarvan Nigam",
      tag: "Fatty Liver",
      review:
        "My fatty liver diagnosis felt intimidating, but Max Pharma provided a structured plan that was both practical and achievable. The doctor explained the condition in simple terms and set realistic goals for weight, diet, and medication. They provided a tailored nutrition plan and monitored liver markers regularly to track progress. Over a few months my test results improved and I felt more energetic overall. The staff kept me motivated with clear milestones and friendly check-ins. Their measured, evidence-based approach helped me make sustainable changes and improved my liver health significantly.",
    },
    {
      image: p10,
      name: "Sachin Singh",
      tag: "Ankylosing Spondylitis",
      review:
        "Living with ankylosing spondylitis is challenging, but the team at Max Pharma delivered empathetic, expert care that improved my quality of life. They combined medication management with physiotherapy and practical lifestyle advice to reduce pain and preserve mobility. The specialists explained the long-term treatment strategy clearly and adjusted therapy based on my response. Regular monitoring and tailored exercise plans helped maintain flexibility and reduce flare-ups. The staff’s patience and follow-through made me feel supported every step of the way. I highly recommend Max Pharma for anyone seeking comprehensive care for chronic musculoskeletal conditions.",
    },
  ];

  const size = patients.length;
  const [startIndex, setStartIndex] = useState(0);

  const visiblePatients = [
    patients[startIndex],
    patients[(startIndex + 1) % size],
    patients[(startIndex + 2) % size],
  ];

  function handleNext() {
    setStartIndex((prev) => (prev + 1) % size);
  }

  function handlePrev() {
    setStartIndex((prev) => (prev - 1 + size) % size);
  }

  return (
    <section className="w-full bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-500 font-semibold">
            Patient Stories
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
            What Our Patients Say
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            Real experiences from patients who trusted us with their health and well-being.
          </p>
        </div>

        {/* Slider Controls + Cards */}
        <div className="mt-10 flex items-center gap-4">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white shadow-sm hover:shadow-md hover:-translate-x-0.5 transition-all"
            aria-label="Previous reviews"
          >
            ←
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            {
              visiblePatients.map((patient, index) => 
                (
                    <article
                      key={patient.name}
                      className="relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-col gap-4 border border-slate-100">
                    
                      {/* Top Accent Line */}
                      <div className="absolute inset-x-0 -top-[2px] mx-6 h-1 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />

                      {/* Patient Info */}
                      <div className="flex items-center gap-4 mt-1">
                        {
                          patient.image ? (
                            <img
                              src={patient.image}
                              alt={patient.name}
                              loading="lazy"
                              className="h-12 w-12 rounded-full object-cover border border-slate-200"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white font-semibold text-lg">
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                          )
                        }

                        <div>
                          <h3 className="text-sm font-semibold text-slate-900">
                            {patient.name}
                          </h3>
                          <p className="text-xs text-blue-500 font-medium">
                            {patient.tag}
                          </p>
                        </div>
                      </div>

                      {/* Review Text */}
                      <div className="mt-1">
                        <span className="text-3xl leading-none text-blue-500">“</span>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                          {patient.review}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Verified Patient</span>
                        <span>★★★★★</span>
                      </div>
                    </article>
                  ))
            }
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white shadow-sm hover:shadow-md hover:translate-x-0.5 transition-all"
            aria-label="Next reviews"
          >
            →
          </button>
        </div>

        {/* Mobile Slider Controls */}
        <div className="mt-6 flex justify-center gap-4 md:hidden">
          <button
            onClick={handlePrev}
            className="h-9 px-4 rounded-full border border-slate-300 bg-white text-sm shadow-sm hover:shadow-md transition-all"
          >
            ← Prev
          </button>
          <button
            onClick={handleNext}
            className="h-9 px-4 rounded-full border border-blue-500 bg-blue-500 text-white text-sm shadow-sm hover:shadow-md transition-all"
          >
            Next →
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="mt-4 flex justify-center gap-2">
          {patients.map((_, idx) => {
            const isActive =
              idx === startIndex ||
              idx === (startIndex + 1) % size ||
              idx === (startIndex + 2) % size;

            return (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  isActive
                    ? "w-5 bg-blue-500"
                    : "w-2 bg-slate-300"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PatientReview;
