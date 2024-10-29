import { TaskCard } from '@/components/TaskCard';
import { prisma } from '@/libs/prisma';
export async function loadTask() {
  // Usando fetch
  // const res = await fetch('http://localhost:3000/api/tasks');
  // const data = await res.json();
  // console.log(data);

  //Usando la obtencion desde la base de datos

  return await prisma.task.findMany();

}

//export const revalidate = 60;

async function HomePage() {
  let tasks = await loadTask();
  console.log(tasks);

  return (
    <section className='container mx-auto mt-7 mb-7'>
      <div className='grid grid-cols-3 gap-3'>
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </section>
  );
}
export default HomePage;

// new Date(task.createAt): Convierte el valor de task.createAt (que probablemente es una cadena o número que representa una fecha) en un objeto Date. Esto permite trabajar con la fecha usando los métodos del objeto Date.

// .toLocaleDateString(): Es un método del objeto Date que convierte la fecha en una cadena legible para humanos, formateada según la configuración regional del usuario. Este método devuelve solo la parte de la fecha (día, mes, año) sin incluir la hora.

// React espera que sus hijos (lo que pones dentro de las etiquetas JSX, como <p>...</p>) sean datos que se puedan renderizar, como:

// Cadenas de texto (string)
// Números (number)
// Arrays de elementos renderizables