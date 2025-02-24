import { NextResponse } from 'next/server'; // para crear respuestas en el server
import { getAllPosts } from '../../../lib/getAllPost';// para obtener los posts

//se ejecuta cuando se hace una peticion a la api, WOOOOOOOOOOOOOOOOOOOW PEDRO
export async function GET() {
    try {
        const posts = await getAllPosts();
        console.log("Posts obtenidos:", posts); 
        return NextResponse.json({ posts });//retorna un json con los posts
    } catch (error) {
        console.error("Error al obtener los posts:", error); 
        return NextResponse.json({ error: 'Error al obtener los posts' }, { status: 500 });
    }
}

//En este caso se usa un API REST porque no puede ser un use client en page y no en getallapost porque se usa fetch
//asi que dividimos responsabilidades, y esto puede ser utilizado muchas veces para obtener datos del server y darselos
//a cliente