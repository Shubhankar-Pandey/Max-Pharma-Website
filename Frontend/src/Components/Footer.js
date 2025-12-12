import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* left: branding / thanks */}
          <div className="md:col-span-1 text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-800">Congratulations on Visiting Max Pharma 👏</h3>
            <p className="text-sm text-gray-600 mt-1">We are delighted to serve you with authentic medicines and trusted healthcare products. Your well-being is our priority.</p>
          </div>

          {/* middle: contact / location */}
          <div className="md:col-span-1 text-center">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Customer Support</h4>
            <p className="text-sm text-gray-500">📞 +91 6387873074</p>
            <p className="text-sm text-gray-500 mt-2">📍 Ward No. 7, Jaiprakash Nagar, Maharajganj, Uttar Pradesh</p>
          </div>

          {/* right: hours + small actions */}
          <div className="md:col-span-1 text-center md:text-right">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Working Hours</h4>
            <p className="text-sm text-gray-500">Mon – Sun | 8:00 AM – 9:00 PM</p>

            <div className="mt-4 flex justify-center md:justify-end gap-3">
              <a href="tel:+916387873074" className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-gray-200 text-sm hover:shadow">
                Call Support
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-white text-sm hover:shadow">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Max Pharma. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
