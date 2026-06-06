import Image from "next/image";
import { readData } from "@/lib/data";
import type { Worker } from "@/types";

export default function QuienesSomosPage() {
  const workers = readData<Worker>("workers.json");
  const activeWorkers = workers.filter((w) => w.active);
  const owner = activeWorkers.find((w) => w.isOwner);
  const team = activeWorkers.filter((w) => !w.isOwner);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Quiénes Somos</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Conozca a nuestro equipo de profesionales comprometidos con la calidad
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1E3A5F] mb-6">
                Alecoman - Taller Industrial
              </h2>
              <p className="text-gray-600 mb-4">
                Somos una empresa dedicada al sector industrial con más de 15 años de experiencia. 
                Nos especializamos en el mantenimiento de piladoras, construcción de galpones, 
                secadoras de arroz, infraestructura industrial y diseño personalizado de piladoras.
              </p>
              <p className="text-gray-600 mb-4">
                Nuestro equipo de profesionales altamente capacitados garantiza la calidad 
                y eficiencia en cada proyecto que realizamos.
              </p>
              <p className="text-gray-600">
                Nos comprometemos a ofrecer soluciones integrales que superen las expectativas 
                de nuestros clientes, con los más altos estándares de calidad y seguridad.
              </p>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-4xl font-bold text-[#1E3A5F]">15+</div>
                  <div className="text-gray-600 text-sm">Años de Experiencia</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-4xl font-bold text-[#1E3A5F]">200+</div>
                  <div className="text-gray-600 text-sm">Proyectos Realizados</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-4xl font-bold text-[#1E3A5F]">50+</div>
                  <div className="text-gray-600 text-sm">Clientes Satisfechos</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-4xl font-bold text-[#1E3A5F]">10+</div>
                  <div className="text-gray-600 text-sm">Profesionales</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Owner */}
      {owner && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#1E3A5F] mb-12 text-center">
              Director / Propietario
            </h2>
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-64 bg-gray-200">
                  <Image src={owner.photo} alt={owner.name} fill className="object-cover" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#1E3A5F]">{owner.name}</h3>
                  <p className="text-amber-500 font-semibold mb-3">{owner.role}</p>
                  <p className="text-gray-600 text-sm">{owner.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1E3A5F] mb-12 text-center">
            Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((worker) => (
              <div
                key={worker.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 bg-gray-200">
                  <Image src={worker.photo} alt={worker.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#1E3A5F]">{worker.name}</h3>
                  <p className="text-amber-500 font-semibold text-sm mb-2">{worker.role}</p>
                  <p className="text-gray-600 text-sm">{worker.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
