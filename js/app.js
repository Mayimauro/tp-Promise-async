//1
const promise1 = () =>{
  return new Promise(resolve =>
    setTimeout(resolve, 2000));
}

promise1().then(resolve =>{console.log("me resolvi despues de 2 segundos")}).catch(console.error);

//2
const promise2 = (e) =>{
  return new Promise(resolve =>{
    setTimeout(resolve(e*2), 1000);
  });
}
promise2(2).then(resolve =>{console.log(resolve)}).catch(console.error);

//3

function promesa3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Promesa 1 resuelta");
    }, 3000); // 3 segundos
  });
}

function promesa4() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Promesa 2 resuelta");
    }, 3000); // 3 segundos
  });
}

Promise.all([promesa3(),promesa4()])
  .then((e) =>{
    console.log(e[0]);
    console.log(e[1]);
    console.log("ambas promesas resueltas");
  }).catch(console.error);
//4
function simulacionHTTPRequest() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const respuesta = {
        mensaje: "Solicitud completada con éxito",
        codigo: 200,
        datos: { usuario: "Juan", edad: 30 }
      };
      resolve(respuesta);
    }, 2000);
  });
}
simulacionHTTPRequest().then((respuesta) => {
  console.log("Respuesta recibida:", respuesta);
});
//5
function sumaNumeros(lista) {
  return new Promise((resolve) => {
    setTimeout(() => {resolve(
      lista.reduce((a,b) => a+b,0)
    );},1000);
  })
}
let lista = [1,2,3,4,5];
sumaNumeros(lista).then((e)=>console.log(e)).catch(console.error);
//6
async function obtenerPokemon(nombreP){
  const url = ` https://pokeapi.co/api/v2/pokemon/${nombreP}`;
  try{
    const respuesta = await fetch(url)
    if(!respuesta.ok){
      throw new Error("no se encontro el cokemon");
    }
    const datos = await respuesta.json();
    return datos;
  }catch(error){
    console.log(error)
  }
}
obtenerPokemon("magikarp").then((respuesta) => {console.log(respuesta)}).catch(console.error);
//7
async function obtenerTodosLosPosts(paginaTotal) {
  const postsPorPagina = 10;
  let todosLosPosts = [];
  let paginaActual = 1;

  while (paginaActual <= paginaTotal) {
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${paginaActual}&_limit=${postsPorPagina}`;

    try {
      const respuesta = await fetch(url);

      if (!respuesta.ok) {
        throw new Error(`Error en la solicitud: ${respuesta.status}`);
      }

      const posts = await respuesta.json();
      todosLosPosts = todosLosPosts.concat(posts);
      paginaActual++;
    } catch (error) {
      console.error("Hubo un problema con la solicitud:", error);
      break;
    }
  }
  return todosLosPosts;
}

obtenerTodosLosPosts(5).then((posts) => {
  console.log(`Se han recuperado ${posts.length} posts:`, posts);
});
