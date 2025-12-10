function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        
        <h3 className="text-lg font-semibold text-gray-800">
          Congratulations on Visiting Max Pharma 👏
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          We are delighted to serve you with authentic medicines and trusted healthcare products.
          Your well-being is our priority.
        </p>

        <div className="mt-6 text-sm text-gray-500">
          <p>📞 Customer Support: +91 6387873074</p>
          <p>📍 Location: Ward No. 7, Jaiprakash Nagar, Maharajganj, Uttar Pradesh</p>
          <p>🕒 Working Hours: Mon – Sun | 8:00 AM – 9:00 PM</p>
        </div>

        <p className="mt-8 text-xs text-gray-500">
          © {new Date().getFullYear()} Max Pharma. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
