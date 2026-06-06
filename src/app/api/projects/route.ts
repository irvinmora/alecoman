import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";
import type { Project } from "@/types";

export async function GET() {
  const projects = readData<Project>("projects.json");
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json();
  const projects = readData<Project>("projects.json");

  const newProject: Project = {
    id: String(Date.now()),
    title: body.title,
    description: body.description,
    images: body.images || ["/images/project-placeholder.svg"],
    category: body.category,
    date: new Date().toISOString().split("T")[0],
    featured: body.featured || false,
  };

  projects.push(newProject);
  writeData("projects.json", projects);

  return NextResponse.json(newProject, { status: 201 });
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const body = await request.json();
  const projects = readData<Project>("projects.json");
  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  projects[index] = { ...projects[index], ...body };
  writeData("projects.json", projects);

  return NextResponse.json(projects[index]);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const projects = readData<Project>("projects.json");
  const filtered = projects.filter((p) => p.id !== id);

  if (filtered.length === projects.length) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  writeData("projects.json", filtered);

  return NextResponse.json({ success: true });
}
