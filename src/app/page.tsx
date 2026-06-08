import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Flame,
  Mail,
  MapPin,
  PenTool,
  Phone,
  Settings,
  Thermometer,
  Warehouse
} from "lucide-react";
import { CONTACT } from "@/constants";
import { readData } from "@/lib/data";
import type { Product, Project, Service, Worker } from "@/types";
import { CotizacionForm } from "@/components/ui/CotizacionForm";

const iconMap: Record<string, React.ReactNode> = {
  Settings: <Settings className="w-8 h-8" />,
  Warehouse: <Warehouse className="w-8 h-8" />,
  Thermometer: <Thermometer className="w-8 h-8" />,
  Building2: <Building2 className="w-8 h-8" />,
  PenTool: <PenTool className="w-8 h-8" />,
  Flame: <Flame className="w-8 h-8" />
};

export default function HomePage() {
  const projects = readData<Project>("projects.json");
  const services = readData<Service>("services.json");
  const products = readData<Product>("products.json");
  const workers = readData<Worker>("workers.json");
  const featuredProjects = projects;
  const activeWorkers = workers.filter((worker) => worker.active);

  return (
    <div>
      <section id="inicio" className="relative min-h-[500px] bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] flex items-center">
        <div className="absolute inset-0 opacity-40 flex items-center justify-center pointer-events-none overflow-hidden">
          <Image src="/images/logo.png" alt="Fondo industrial" fill sizes="100vw" style={{ objectFit: "fill" }} unoptimized={true} loading="eager" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-amber-500/15 px-4 py-2 text-sm font-semibold text-amber-300 ring-1 ring-amber-400/30">
              Especialistas en industria arrocera
            </span>
            <h1 className="mt-6 text-5xl lg:text-7xl font-bold text-white leading-tight">
              ALECOMAN
              <span className="block text-amber-400 text-3xl lg:text-4xl font-semibold mt-3">
                Taller Industrial
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 mb-8">
              Especialistas en mantenimiento de piladoras, construcción de galpones,
              secadoras de arroz, infraestructura industrial y diseño de piladoras.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#cotizacion"
                className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
              >
                Solicitar Cotización <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#servicios"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1E3A5F] transition-colors"
              >
                Nuestros Servicios
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="quienes-somos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-500 font-semibold">Quiénes Somos</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1E3A5F] mt-2 mb-6">
                Construimos industria, garantizamos resultados.
              </h2>
              <p className="text-gray-600 mb-4">
                Alecoman es un taller industrial especializado en mantenimiento de piladoras,
                construcción de galpones, secadoras de arroz, infraestructura metálica y diseño
                de plantas para la industria arrocera.
              </p>
              <p className="text-gray-600">
                Trabajamos con soluciones a medida para productores, piladoras y empresas
                agroindustriales que necesitan maquinaria confiable, estructuras resistentes
                y acompañamiento técnico.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["15+", "Años de experiencia"],
                ["200+", "Proyectos realizados"],
                ["50+", "Clientes atendidos"],
                ["10+", "Profesionales"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl bg-gray-50 p-6 text-center shadow-sm">
                  <div className="text-4xl font-bold text-[#1E3A5F]">{value}</div>
                  <div className="text-sm text-gray-600">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1E3A5F] mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Soluciones integrales para el sector industrial y agroindustrial.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-[#1E3A5F] mb-4 group-hover:bg-[#1E3A5F] group-hover:text-white transition-colors">
                  {iconMap[service.icon] || <Settings className="w-8 h-8" />}
                </div>
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="productos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1E3A5F] mb-4">Productos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Maquinaria, estructuras y componentes para piladoras y plantas agroindustriales.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gray-100">
                  <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" unoptimized />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-amber-500 bg-amber-100 px-2 py-1 rounded">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#1E3A5F] mt-3 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="proyectos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1E3A5F] mb-4">
              Proyectos Destacados
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conozca algunos de nuestros proyectos más recientes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  <Image src={project.images[0]} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" unoptimized />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-amber-500 bg-amber-100 px-2 py-1 rounded">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#1E3A5F] mt-2 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="equipo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1E3A5F] mb-4">
              Equipo de Trabajo
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Personal activo del taller, incluyendo el propietario y técnicos especializados.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeWorkers.map((worker) => (
              <div key={worker.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-52 bg-gray-100">
                  <Image src={worker.photo} alt={worker.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" unoptimized />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#1E3A5F]">{worker.name}</h3>
                  <p className="text-amber-500 text-sm font-semibold mb-2">{worker.role}</p>
                  <p className="text-gray-600 text-sm line-clamp-3">{worker.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cotizacion" className="py-20 bg-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            ¿Necesita una Cotización?
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Complete el formulario y le responderemos a la brevedad para su proyecto.
          </p>
        </div>
        <div className="px-4">
          <CotizacionForm />
        </div>
      </section>

      <section id="contactos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <a href={`tel:${CONTACT.phone}`} className="rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <Phone className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="font-bold text-[#1E3A5F] mb-1">Teléfono</h3>
              <p className="text-gray-600">{CONTACT.phone}</p>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <Mail className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="font-bold text-[#1E3A5F] mb-1">Correo</h3>
              <p className="text-gray-600">{CONTACT.email}</p>
            </a>
            <div className="rounded-xl border border-gray-200 p-6">
              <MapPin className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="font-bold text-[#1E3A5F] mb-1">Ubicación</h3>
              <p className="text-gray-600">{CONTACT.address}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
