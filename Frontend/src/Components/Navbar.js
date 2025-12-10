function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            M
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-semibold text-gray-900">Max Pharma</span>
            <span className="text-xs text-gray-500 hidden sm:block">
              Complete Health Care & Pharmacy
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#home" className="hover:text-blue-600 transition-colors">Home</a>
          <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
          <a href="#location" className="hover:text-blue-600 transition-colors">Location</a>
        </div>


        {/* Actions */}
        <div className="flex items-center gap-3">
          <a href="tel:+916387873074">
              <button className="text-sm md:text-base text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-800 shadow-sm transition-colors">
                Call Now
              </button>
          </a>

          <a
            href="https://wa.me/916387873074?text=Hello%20Max%20Pharma"
            target="_blank"
            rel="noopener noreferrer">
          
              <button className="text-sm md:text-base text-green-600 border border-green-600 px-4 py-2 rounded-full hover:bg-green-600 hover:text-white transition-colors">
                WhatsApp
              </button>
          </a>
        </div>

      </nav>
    </header>
  );
}

export default Navbar;
