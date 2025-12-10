import { Services } from "../Data/Services";
import ServiceCard from "./ServiceCard";

function OurServices() {
  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Services
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            Everything you need in one trusted pharmacy – from medicines to consultations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Services.map((service, index) => (
            <ServiceCard
              key={service.title || index}
              service={service}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurServices;
