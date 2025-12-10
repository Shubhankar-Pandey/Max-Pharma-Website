// Import icons at top
import { GiMedicines } from "react-icons/gi";
import { MdLocalShipping } from "react-icons/md";
import { FaStethoscope, FaFirstAid, FaPhoneAlt } from "react-icons/fa";
import { BiTestTube } from "react-icons/bi";

export const Services = [
  {
    title: "Medicines",
    description: "Quality medicines at affordable prices with guaranteed authenticity.",
    icon: <GiMedicines className="text-4xl text-blue-600" />
  },
  {
    title: "Home Delivery",
    description: "Fast and secure doorstep delivery within Maharajganj.",
    icon: <MdLocalShipping className="text-4xl text-green-600" />
  },
  {
    title: "Doctor Consultations",
    description: "Connect instantly with certified doctors for reliable guidance.",
    icon: <FaStethoscope className="text-4xl text-purple-600" />
  },
  {
    title: "Pathology Partners",
    description: "Blood tests, health checkups and lab results with trusted partners.",
    icon: <BiTestTube className="text-4xl text-red-500" />
  },
  {
    title: "First Aid Supplies",
    description: "Everything you need for emergency and daily medical care.",
    icon: <FaFirstAid className="text-4xl text-teal-600" />
  },
  {
    title: "Call Appointment",
    description: "Book consultations and pharmacy support directly over phone.",
    icon: <FaPhoneAlt className="text-4xl text-gray-700" />
  }
];
