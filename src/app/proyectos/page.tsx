import Image from "next/image";
import { readData } from "@/lib/data";
import type { Project } from "@/types";

export default function ProyectosPage() {
  const projects = readData<Project>("projects.json");
  const categories = [...new Set(projects.map((p) => p.category))];

  return (
    <div>
      <section className="bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Nuestros Proyectos</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Conozca algunos de los proyectos que hemos realizado
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((p) => p.category === category)
                  .map((project) => (
                    <div
                      key={project.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="relative h-48 bg-gray-200">
                        <Image
                          src={project.images[0]}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="p-6">
                        <span className="text-xs font-semibold text-amber-500 bg-amber-100 px-2 py-1 rounded">
                          {project.category}
                        </span>
                        <h3 className="text-lg font-bold text-[#1E3A5F] mt-2 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{project.description}</p>
                        <p className="text-gray-400 text-xs mt-3">
                          {new Date(project.date).toLocaleDateString("es-EC", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
