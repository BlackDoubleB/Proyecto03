"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Asegúrate de importar useParams
import { revalidatePath } from 'next/cache'

function NewPage() {
    const router = useRouter();
    const params = useParams(); // Obtener los parámetros usando useParams
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (params.id) {
            fetch(`/api/tasks/${params.id}`)
                .then((res) => res.json())
                .then(data => {
                    setTitle(data.title);
                    setDescription(data.description);
                })
        }
    }, []);

    //Formulario para crear una nueva tarea
    const onSubmit = async (e) => {
        e.preventDefault();
        if (params.id) {
            const rest = await fetch(`/api/tasks/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({ title, description }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await rest.json();
            console.log(data);
        } else {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify({ title, description }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
        }
        router.refresh();
        router.push('/');
        //revalidatePath('/')
    };

    return (
        <div className="h-screen flex justify-center items-center">

            <form className="bg-slate-800 p-10 w-1/2 rounded-sm"
                onSubmit={onSubmit}
            >
                <label htmlFor="title"
                    className="font-bold text-sm">Titulo de la tarea</label>

                <input id="title"
                    type="text"
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <label htmlFor="description"
                    className="font-bold text-sm">Descripcion de la tarea</label>

                <textarea id="description"
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    rows="3"
                    name="Describe tu tarea"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                >
                </textarea>
                <div className="flex justify-between">
                    <button type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Create</button>

                    {
                        params.id && (
                            <button
                                type="button"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                                onClick={async () => {
                                    const rest = await fetch(`/api/tasks/${params.id}`,
                                        {
                                            method: 'DELETE'

                                        })
                                    const data = await rest.json();
                                    router.refresh();
                                    router.push('/');
                                }}
                            >
                                Delete
                            </button>
                        )
                    }
                </div>


            </form>

        </div >
    );
}

export default NewPage;