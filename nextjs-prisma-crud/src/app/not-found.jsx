import Link from "next/link";
function NotFound(){
    return(
      <section className="flex h-[calc(100vh-7rem)] justify-center items-center">
        <div className="text-center">
            <h1 className="text-3xl font-bold ">Not Found</h1>
            <Link href="/" className="text-slate-300 text-1xl mt-5">
                Volver al Inicio
            </Link>
        </div>
      </section>
    );

}
export default NotFound;