import RahulTiwari from "../Assets/RahulTiwari.jpeg";

function ProfileSection() {
  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start gap-14">
        
        {/* Left side */}
        <div className="flex-1 space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide">
            Max Pharma
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Your Health, Our Priority
          </h2>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl">
            Authentic medicines, fast home delivery, and trusted doctor consultations
            in Maharajganj.
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a href="tel:+916387873074">
                <button className="text-sm md:text-base text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-800 shadow-sm transition-colors">
                  Call Now
                </button>
            </a>

            <a
              href="https://wa.me/919120371404?text=Hello%20Max%20Pharma"
              target="_blank"
              rel="noopener noreferrer">
                <button className="text-sm md:text-base text-green-600 border border-green-600 px-4 py-2 rounded-full hover:bg-green-600 hover:text-white transition-colors">
                  Message on WhatsApp
                </button>
            </a>
          </div>


          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl pt-2">
            At Max Pharma, we are dedicated to providing exceptional pharmaceutical 
            care and personalized service to meet your health needs.
            Our experienced team is here to support you every step on the way.
          </p>

        </div>

        {/* Right side */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center gap-5 max-w-sm w-full">
            <img
              src={RahulTiwari}
              alt="Rahul Tiwari - Owner of Max Pharma"
              className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-3xl shadow-md"
            />
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-semibold text-gray-900">
                Dr. Rahul Tiwari
              </h3>
              <p className="text-sm text-gray-500">Consultant Pharmacist</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ProfileSection;
