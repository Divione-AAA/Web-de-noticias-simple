"use client";
//se usa cliente porque se usan hooks
import React, { useEffect, useState } from 'react';

//definiendo la constante home 
const Home: React.FC = () => {
  //usamos el hooks para la variable de estado en este caso post o error dentro de un arreglo
  const [posts, setPosts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  //usamos useEffect para ejecutar una funcion cuando se renderice la pagina
  useEffect(() => {
    //se ejecuta una vez cuando se renderice la pagina
    //se usa fetch para obtener los posts de forma asíncrona
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/get-posts');//se usa el path de la api
        if (!response.ok) {
          throw new Error('Error al obtener los posts');//se lanza un error si no se obtuvo 200
        }
        const data = await response.json();//se obtiene el json ya en su formato
        console.log("Data recibida:", data);
        setPosts(data.posts);//actualizamos el estado de posts con los datos recibidos
      } catch (error) {
        console.error("Error al obtener los posts:", error);
        setError('Error al obtener los posts');//se hace push en el otro estado de error
      }
    };

    fetchPosts();//la llamamos aqui
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <img className="shadow-md" src="./images/BlogsTimes.png" alt="Logo" width={500} height={500} />
      {error ? (
        <p>{error}</p>//ternario para mostrar el error
      ) : (
        <ul>
          {posts.map((post, index) => (
            <li key={index} className="card w-128 h-64 p-6 rounded-lg hover:shadow-xl" dangerouslySetInnerHTML={{ __html: post }} />//inyecta el html en el componente
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;//lo exporta de manera mas bacana
