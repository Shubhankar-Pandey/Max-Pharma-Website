import Navbar from "./Components/Navbar"
import HeroSection from "./Components/HeroSection";
import ProfileSection from "./Components/ProfileSection";
import OurServices from "./Components/OurServices";
import OurLocation from "./Components/OurLocation";
import PatientReview from "./Components/PatientReview";
import Footer from "./Components/Footer";
import ChatWidget from "./Components/ChatWidget";

function App() {
  return (
    <div className="w-full min-h-screen bg-[#ffff] scroll-smooth">
      <Navbar />

      <section id="home">
        <HeroSection />
      </section>

      <section id="profile">
        <ProfileSection />
      </section>

      <section id="services">
        <OurServices />
      </section>

      <section id="location">
        <OurLocation />
      </section>

      <section>
        <PatientReview></PatientReview>
      </section>

      <section>
        <Footer></Footer>
      </section>

      <ChatWidget></ChatWidget>
    </div>
  );
}


export default App;
