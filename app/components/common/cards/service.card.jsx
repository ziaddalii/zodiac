export default function ServiceCard({ service }) {
  return (
    <div className="col-span-1 text-center space-y-2">
      {/* ICON */}
      {service.icon}
      {/* TITLE */}
      <h2 className="text-2xl">{service.title}</h2>

      {/* DESC */}
      <p className="text-SecondaryText">{service.desc}</p>
    </div>
  );
}
