import { useState } from "react";

function PatientReview() {
  const patients = [
    {
      image: "", // add image URL here
      name: "Patient Name 1",
      tag: "Recovered from XYZ",
      review: "Lorem ipsum dolor sit amet 1. Dolor sit amet, consectetur adipiscing elit.",
    },
    {
      image: "",
      name: "Patient Name 2",
      tag: "Regular Checkup",
      review: "Lorem ipsum dolor sit amet 2. Sed do eiusmod tempor incididunt ut labore.",
    },
    {
      image: "",
      name: "Patient Name 3",
      tag: "Dental Care",
      review: "Lorem ipsum dolor sit amet 3. Ut enim ad minim veniam, quis nostrud.",
    },
    {
      image: "",
      name: "Patient Name 4",
      tag: "Eye Treatment",
      review: "Lorem ipsum dolor sit amet 4. Duis aute irure dolor in reprehenderit.",
    },
    {
      image: "",
      name: "Patient Name 5",
      tag: "Surgery",
      review: "Lorem ipsum dolor sit amet 5. Excepteur sint occaecat cupidatat non proident.",
    },
    {
      image: "",
      name: "Patient Name 6",
      tag: "Physiotherapy",
      review: "Lorem ipsum dolor sit amet 6. Sunt in culpa qui officia deserunt mollit.",
    },
    {
      image: "",
      name: "Patient Name 7",
      tag: "Cardiology",
      review: "Lorem ipsum dolor sit amet 7. Curabitur non nulla sit amet nisl tempus.",
    },
    {
      image: "",
      name: "Patient Name 8",
      tag: "Neurology",
      review: "Lorem ipsum dolor sit amet 8. Vivamus suscipit tortor eget felis porttitor.",
    },
    {
      image: "",
      name: "Patient Name 9",
      tag: "Orthopedic",
      review: "Lorem ipsum dolor sit amet 9. Pellentesque in ipsum id orci porta dapibus.",
    },
    {
      image: "",
      name: "Patient Name 10",
      tag: "Emergency Care",
      review: "Lorem ipsum dolor sit amet 10. Vestibulum ac diam sit amet quam vehicula.",
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
                      key={index}
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
