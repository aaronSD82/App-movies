import { leerDatos, datosCompletosId } from './fetching.js';

const INPUT_SEARCH = document.getElementById("floatingInputGroup1");
const PRINCIPAL_SLIDER = document.getElementById("content-inner");
const CONTROL = document.createElement("div");
const BOTON_BUSCAR = document.getElementById("buscar");
CONTROL.setAttribute("id", "control");
const CONTEO_PAG = document.getElementById("paginasTotales");
const API_KEY = "0ad23314ece0b463733dbb21c848fb80";
const BTN_ANTERIOR = document.getElementById('pagAnt');
const BTN_SIGUIENTE = document.getElementById('pagSig');
let page = 0;
let totalPaginas;
//let paginaActual = datos.page;

function cargarDatos(page) {
	CONTROL.innerHTML = "";
	let buscar = INPUT_SEARCH.value;
	const URL = `https://api.themoviedb.org/3/search/movie?query=${buscar}&language=es-ES&page=${page}&api_key=${API_KEY}`; //poner el español
	leerDatos(URL)
		.then(datos => {

			totalPaginas = datos.total_pages;
			console.log(datos);
			cargarDatosCompletos(datos);

		})
		.catch(err => { console.log(err) });



}


function cargarDatosCompletos(datos) {

	datos.results.forEach((pelis, index) => {
		let id = pelis.id;
		let sinop = pelis.overview;
		let titulo = pelis.title;
		let img = pelis.poster_path;
		let urlId = `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos&language=es-ES&api_key=${API_KEY}`;
		let youtube;
		let urlYoutube;

		datosCompletosId(urlId)
			.then(datosId => {

				datosId.videos.results.forEach(datoVideo => {

					youtube = datoVideo.type === "Trailer" ? datoVideo.key : youtube ? youtube : datoVideo.key;

				});


				urlYoutube = `https://www.youtube.com/embed/${youtube}`;

				let imagen = comprobarImgNull(img, index);


				//Elementos del slider----------------------
				let divUno = document.createElement("div");
				let divDos = document.createElement("div");
				let divTres = document.createElement("div");
				let etiqPoster = document.createElement("img");
				divTres.appendChild(etiqPoster);
				let divCuatro = document.createElement("div"); 
				let divCinco = document.createElement("div"); // Elemento del título y la descripcion.
				let parrafoSlider = document.createElement("p");
				let tituloSlider = document.createElement("h2");
				divCinco.appendChild(tituloSlider);
				divCinco.appendChild(parrafoSlider);
				let divSeis = document.createElement("div");
				let enlace = document.createElement("a");
				divSeis.appendChild(enlace);

				//Clases de los elementos-----------------------
				if (index === 0) {
					divUno.className = "carousel-item active col-12 h-100";
				} else divUno.className = "carousel-item col-12 h-100";

				divDos.className = "row h-100";
				divTres.className = "col-6 h-100 text-center";
				divCuatro.className = "col-6 h-100";
				divCinco.className = "row h-75 align-content-start text-start overflow-auto";
				divSeis.className = "row h-25";
				tituloSlider.className = "mt-3";
				enlace.className = "me-2 mt-5 mb-5";
				divUno.appendChild(divDos);
				divDos.appendChild(divTres);
				divDos.appendChild(divCuatro);
				divCuatro.appendChild(divCinco);
				divCuatro.appendChild(divSeis);
				CONTROL.className = "h-100 w-100";
				CONTROL.appendChild(divUno);
				PRINCIPAL_SLIDER.appendChild(CONTROL);
				etiqPoster.setAttribute("src", imagen);
				parrafoSlider.innerText = sinop;
				tituloSlider.innerText = titulo;
				CONTEO_PAG.innerText = `Página ${page} de ${totalPaginas}`;

				comprobarEnlaceNulo(youtube, urlYoutube, enlace);

			})
			.catch(err => { console.log(err) });

	});

}


function comprobarImgNull(imagen, index) {

	let urlImagen;

	if (imagen === null && index === 0) {

		imagen = imagen = "./images/connection-lost-3498366_640.png";
		return imagen;

	}
	else if (index === 0) {

		urlImagen = `https://image.tmdb.org/t/p/w500/${imagen}`;
		return urlImagen;
	}

	else if (imagen === null & index !== 0) {

		imagen = imagen = "./images/connection-lost-3498366_640.png";
		return imagen;
	}

	else {

		urlImagen = `https://image.tmdb.org/t/p/w500/${imagen}`;
		return urlImagen;
	}


}

function comprobarEnlaceNulo(key, url, enlace) {

	if (key !== undefined) {

		enlace.setAttribute("href", url);
		enlace.setAttribute("target", "_blank");
		enlace.innerText = "Pulse para ver el trailer";

	} else enlace.innerText = "No hay videos";

}

/* INPUT_SEARCH.addEventListener("change", ()=>{

	page = 0;
}) */



BOTON_BUSCAR.addEventListener("click", () => {

	page = 1;
	cargarDatos(page);

});

BTN_ANTERIOR.addEventListener("click", () => {

	page -= 1;

	if (page < 1){
		page = 1;
	}else{
		cargarDatos(page);
	}

});

BTN_SIGUIENTE.addEventListener("click", () => {

	page += 1;

	if (page > totalPaginas){
		page -= 1;
	}else{
		cargarDatos(page);
	}

});















/* btnSiguiente.addEventListener('click', () => { //Siguiente peli falta siguiente pagina
	//if (pagina < 1000) {
	//pagina += 1;
	//cargarPeliculas();


	//}
}); */

/* btnAnterior.addEventListener('click', () => { //Siguiente peli falta siguiente pagina
	if (pagina > 1) {
		pagina -= 1;
		//cargarPeliculas();
	}
}); */

//Completar LLamada a la Api con Fetch,consulta las páhinas


//La discover end-point me devuelve 20 pelis por pagina














