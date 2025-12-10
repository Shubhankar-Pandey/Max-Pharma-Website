import heroImage from "../Assets/heroSectionImage.png";

function HeroSection() {
  return (
    <div
      className="w-full h-[70vh] bg-cover bg-center flex items-center text-white relative"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Text */}
      <div className="relative z-10 pl-10 md:pl-20">
        <h1
          className="text-3xl md:text-5xl font-bold"
          style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
        >
          Max Pharma - Complete Health Care
        </h1>
        <h1
          className="text-3xl md:text-5xl font-bold"
          style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
        >
          & Pharmacy Services
        </h1>
      </div>
    </div>
  );
}

export default HeroSection;
