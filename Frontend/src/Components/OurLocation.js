

function OurLocation() {
  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-2 items-start">
        
        {/* Left side */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Location
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">
              Max Pharma - Maharajganj
            </h3>
            <p className="text-gray-600">
              <span className="font-medium">Address:</span> Jai Prakash Nagar, Ward no. 7
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Timings:</span> Monday - Sunday : 8:00 AM to 9:00 PM
            </p>
            <p className="text-gray-600">Open all 7 days a week</p>

            <a
              href="https://www.google.com/maps/place/Max+Pharma/@27.1384311,83.566769,19z"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-3 text-sm md:text-base text-white bg-blue-600 px-5 py-2.5 rounded-full hover:bg-blue-700 shadow-sm transition-colors"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

        {/* Right side - Map */}
        <div className="w-full h-[280px] md:h-[380px] rounded-2xl overflow-hidden shadow-md border border-gray-100">
          <iframe
            title="Max Pharma Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d887.6418605473403!2d83.56676898030652!3d27.138431139511006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996a96159a1ef65%3A0xbeef5aad35e7fa24!2sMax%20Pharma!5e0!3m2!1sen!2sin!4v1765218220104!5m2!1sen!2sin"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  );
}

export default OurLocation;
