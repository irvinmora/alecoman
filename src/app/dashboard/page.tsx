"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Users,
  FolderOpen,
  Plus,
  Trash2,
  Edit,
  Upload,
  LogOut,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
} from "lucide-react";

interface Worker {
  id: string;
  name: string;
  role: string;
  photo: string;
  description: string;
  active: boolean;
  isOwner?: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  date: string;
  featured: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"workers" | "projects">("workers");
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showWorkerForm, setShowWorkerForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [workerForm, setWorkerForm] = useState({
    name: "",
    role: "",
    description: "",
    photo: "/images/worker-placeholder.svg",
  });
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    category: "",
    featured: false,
    images: ["/images/project-placeholder.svg"],
  });

  useEffect(() => {
    const auth = localStorage.getItem("alecoman_auth");
    if (!auth) {
      router.push("/login");
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    const workersRes = await fetch("/api/workers");
    const projectsRes = await fetch("/api/projects");
    if (workersRes.ok) setWorkers(await workersRes.json());
    if (projectsRes.ok) setProjects(await projectsRes.json());
  };

  const handleLogout = () => {
    localStorage.removeItem("alecoman_auth");
    router.push("/login");
  };

  const handleWorkerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWorker) {
      await fetch(`/api/workers?id=${editingWorker.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workerForm),
      });
    } else {
      await fetch("/api/workers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workerForm),
      });
    }
    setShowWorkerForm(false);
    setEditingWorker(null);
    setWorkerForm({ name: "", role: "", description: "", photo: "/images/worker-placeholder.svg" });
    fetchData();
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      await fetch(`/api/projects?id=${editingProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectForm),
      });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectForm),
      });
    }
    setShowProjectForm(false);
    setEditingProject(null);
    setProjectForm({
      title: "",
      description: "",
      category: "",
      featured: false,
      images: ["/images/project-placeholder.svg"],
    });
    fetchData();
  };

  const handleDeleteWorker = async (id: string) => {
    if (confirm("¿Está seguro de eliminar este trabajador?")) {
      await fetch(`/api/workers?id=${id}`, { method: "DELETE" });
      fetchData();
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("¿Está seguro de eliminar este proyecto?")) {
      await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      fetchData();
    }
  };

  const handleToggleWorker = async (worker: Worker) => {
    await fetch(`/api/workers?id=${worker.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !worker.active }),
    });
    fetchData();
  };

  const startEditWorker = (worker: Worker) => {
    setEditingWorker(worker);
    setWorkerForm({
      name: worker.name,
      role: worker.role,
      description: worker.description,
      photo: worker.photo,
    });
    setShowWorkerForm(true);
  };

  const startEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      category: project.category,
      featured: project.featured,
      images: project.images,
    });
    setShowProjectForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-[#1E3A5F] text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard - Alecoman</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("workers")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "workers"
                ? "bg-[#1E3A5F] text-white"
                : "bg-white text-[#1E3A5F] hover:bg-gray-100"
            }`}
          >
            <Users className="w-5 h-5" /> Trabajadores ({workers.length})
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "projects"
                ? "bg-[#1E3A5F] text-white"
                : "bg-white text-[#1E3A5F] hover:bg-gray-100"
            }`}
          >
            <FolderOpen className="w-5 h-5" /> Proyectos ({projects.length})
          </button>
        </div>

        {/* Workers Tab */}
        {activeTab === "workers" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#1E3A5F]">Trabajadores</h2>
              <button
                onClick={() => {
                  setEditingWorker(null);
                  setWorkerForm({ name: "", role: "", description: "", photo: "/images/worker-placeholder.svg" });
                  setShowWorkerForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Plus className="w-4 h-4" /> Agregar Trabajador
              </button>
            </div>

            {/* Worker Form Modal */}
            {showWorkerForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                  <h3 className="text-xl font-bold text-[#1E3A5F] mb-4">
                    {editingWorker ? "Editar Trabajador" : "Agregar Trabajador"}
                  </h3>
                  <form onSubmit={handleWorkerSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        required
                        value={workerForm.name}
                        onChange={(e) => setWorkerForm({ ...workerForm, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Cargo *
                      </label>
                      <input
                        type="text"
                        required
                        value={workerForm.role}
                        onChange={(e) => setWorkerForm({ ...workerForm, role: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Descripción
                      </label>
                      <textarea
                        rows={3}
                        value={workerForm.description}
                        onChange={(e) => setWorkerForm({ ...workerForm, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        URL de Foto
                      </label>
                      <input
                        type="text"
                        value={workerForm.photo}
                        onChange={(e) => setWorkerForm({ ...workerForm, photo: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#2563EB] transition-colors"
                      >
                        {editingWorker ? "Guardar Cambios" : "Agregar"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowWorkerForm(false);
                          setEditingWorker(null);
                        }}
                        className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Workers List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workers.map((worker) => (
                <div
                  key={worker.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                    !worker.active ? "opacity-50" : ""
                  }`}
                >
                  <div className="relative h-32 bg-gray-200">
                    <Image src={worker.photo} alt={worker.name} fill className="object-cover" />
                    {worker.isOwner && (
                      <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                        Dueño
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#1E3A5F]">{worker.name}</h3>
                    <p className="text-amber-500 text-sm">{worker.role}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Estado: {worker.active ? (
                        <span className="text-green-500">Activo</span>
                      ) : (
                        <span className="text-red-500">Inactivo</span>
                      )}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => startEditWorker(worker)}
                        className="flex-1 flex items-center justify-center gap-1 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-sm"
                      >
                        <Edit className="w-3 h-3" /> Editar
                      </button>
                      <button
                        onClick={() => handleToggleWorker(worker)}
                        className="flex-1 flex items-center justify-center gap-1 py-1 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200 transition-colors text-sm"
                      >
                        {worker.active ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        {worker.active ? "Desactivar" : "Activar"}
                      </button>
                      {!worker.isOwner && (
                        <button
                          onClick={() => handleDeleteWorker(worker.id)}
                          className="flex items-center justify-center gap-1 py-1 px-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors text-sm"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#1E3A5F]">Proyectos</h2>
              <button
                onClick={() => {
                  setEditingProject(null);
                  setProjectForm({
                    title: "",
                    description: "",
                    category: "",
                    featured: false,
                    images: ["/images/project-placeholder.svg"],
                  });
                  setShowProjectForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Plus className="w-4 h-4" /> Agregar Proyecto
              </button>
            </div>

            {/* Project Form Modal */}
            {showProjectForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <h3 className="text-xl font-bold text-[#1E3A5F] mb-4">
                    {editingProject ? "Editar Proyecto" : "Agregar Proyecto"}
                  </h3>
                  <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Título *
                      </label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Descripción *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Categoría *
                      </label>
                      <select
                        required
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Seleccione una categoría</option>
                        <option value="Piladoras">Piladoras</option>
                        <option value="Galpones">Galpones</option>
                        <option value="Secadoras">Secadoras</option>
                        <option value="Infraestructura">Infraestructura</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        URL de Imagen
                      </label>
                      <input
                        type="text"
                        value={projectForm.images[0]}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, images: [e.target.value] })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={projectForm.featured}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, featured: e.target.checked })
                        }
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor="featured" className="text-sm font-semibold text-gray-700">
                        Proyecto Destacado
                      </label>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#2563EB] transition-colors"
                      >
                        {editingProject ? "Guardar Cambios" : "Agregar"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowProjectForm(false);
                          setEditingProject(null);
                        }}
                        className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="relative h-32 bg-gray-200">
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    {project.featured && (
                      <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                        Destacado
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold text-amber-500 bg-amber-100 px-2 py-1 rounded">
                      {project.category}
                    </span>
                    <h3 className="font-bold text-[#1E3A5F] mt-2">{project.title}</h3>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(project.date).toLocaleDateString("es-EC")}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => startEditProject(project)}
                        className="flex-1 flex items-center justify-center gap-1 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-sm"
                      >
                        <Edit className="w-3 h-3" /> Editar
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="flex items-center justify-center gap-1 py-1 px-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors text-sm"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
