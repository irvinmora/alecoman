import Image from "next/image";
import { Settings, Warehouse, Thermometer, Building2, PenTool, Flame } from "lucide-react";
import { readData } from "@/lib/data";
import type { Service } from "@/types";

const iconMap: Record<string, React.ReactNode> = {
  Settings: <Settings className="w-12 h-12" />,
  Warehouse: <Warehouse className="w-12 h-12" />,
  Thermometer: <Thermometer className="w-12 h-12" />,
  Building2: <Building2 className="w-12 h-12" />,
  PenTool: <PenTool className="w-12 h-12" />,
  Flame: <Flame className="w-12 h-12" />,
};

export default function ServiciosPage() {
  const services = readData<Service>("services.json");

  return (
    <div>
      <section className="bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Nuestros Servicios</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Soluciones integrales para el sector industrial
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-12">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 items-center bg-white rounded-2xl shadow-lg overflow-hidden`}
              >
                <div className="relative w-full lg:w-1/2 h-64 lg:h-80">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-8 lg:w-1/2">
                  <div className="w-20 h-20 bg-blue-100 rounded-xl flex items-center justify-center text-[#1E3A5F] mb-4">
                    {iconMap[service.icon] || <Settings className="w-12 h-12" />}
                  </div>
                  <h2 className="text-2xl font-bold text-[#1E3A5F] mb-4">{service.title}</h2>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
