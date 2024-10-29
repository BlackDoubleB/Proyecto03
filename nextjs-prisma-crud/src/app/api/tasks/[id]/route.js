import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { revalidatePath } from 'next/cache';

// A partir de Next.js 15, los parámetros dinámicos deben manejarse de manera asíncrona. Aquí te dejo un ejemplo de cómo podrías corregir este problema.

export async function GET(request, { params }) {
    const { id } = await params;


    const task = await prisma.task.findUnique({
        where: { id: parseInt(id, 10) },
    });

    if (!task) {
        return new Response("Task not found", { status: 404 });
    }

    return new Response(JSON.stringify(task), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function PUT(request, { params }) {
    const { title, description } = await request.json();
    const { id } = await params;

    const task = await prisma.task.update({
        where: { id: Number(id) },
        data: {
            title,
            description
        }
    });

    if (!task) {
        return new Response("Task not found", { status: 404 });
    }

    revalidatePath('/')

    return new Response(JSON.stringify(task), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });

}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const taskRemoved = await prisma.task.delete({
        where: {
            id: Number(id)
        },
    });
    console.log(taskRemoved);
    return NextResponse.json("Eliminando tarea" + id)
}

//Las consultas a la base de datos devuelven los resultados como objetos de JavaScript.