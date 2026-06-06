import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";
import type { Worker } from "@/types";

export async function GET() {
  const workers = readData<Worker>("workers.json");
  return NextResponse.json(workers);
}

export async function POST(request: Request) {
  const body = await request.json();
  const workers = readData<Worker>("workers.json");

  const newWorker: Worker = {
    id: String(Date.now()),
    name: body.name,
    role: body.role,
    description: body.description || "",
    photo: body.photo || "/images/worker-placeholder.svg",
    active: true,
    isOwner: false,
  };

  workers.push(newWorker);
  writeData("workers.json", workers);

  return NextResponse.json(newWorker, { status: 201 });
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const body = await request.json();
  const workers = readData<Worker>("workers.json");
  const index = workers.findIndex((w) => w.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Worker not found" }, { status: 404 });
  }

  workers[index] = { ...workers[index], ...body };
  writeData("workers.json", workers);

  return NextResponse.json(workers[index]);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const workers = readData<Worker>("workers.json");
  const filtered = workers.filter((w) => w.id !== id);

  if (filtered.length === workers.length) {
    return NextResponse.json({ error: "Worker not found" }, { status: 404 });
  }

  writeData("workers.json", filtered);

  return NextResponse.json({ success: true });
}
