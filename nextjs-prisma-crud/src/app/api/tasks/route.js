import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"
import { revalidatePath } from "next/cache";

export async function GET() {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
}

export async function POST(request) {
    const { title, description } = await request.json();//obtener el cuerpo de la solicitud en formato JSON
    const newTask = await prisma.task.create({
        data: {
            title,
            description
        }
    });
    
    revalidatePath('/')
    return NextResponse.json("Tarea creada con éxito");
}