function ServiceCard({ service }) {
  const { icon, title, description } = service;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default ServiceCard;
