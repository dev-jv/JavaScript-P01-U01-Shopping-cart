// Variables
    const carrito = document.querySelector('#carrito');
    const contenedorCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
    const listaCursos = document.querySelector('#lista-cursos');

    const card = document.querySelector('.card');

    let articuloscarrito = [];

    cargarEventListener();
    function cargarEventListener(){
        //Cuando agregas un curso presionando "Agregar al carrito"
        listaCursos.addEventListener('click', agregarCurso);

        // Eliminar cursos del carrito
        carrito.addEventListener('click', eliminarCurso);

        // vaciar el carrito
        vaciarCarritoBtn.addEventListener('click', () => {
            
                articuloscarrito = [];
                carritoHTML();
                // limpiarHTML();
        });

        
    } 

// Funciones
    function agregarCurso(event){
        event.preventDefault();
        if(event.target.classList.contains('agregar-carrito')){

        const cursoSeleccionado = event.target.parentElement.parentElement;

            leerDatosCurso(cursoSeleccionado);
        }
    }

    function eliminarCurso(event){
        if(event.target.classList.contains('borrar-curso')){
            
            const cursoId = event.target.getAttribute('data-id') // Determina la forma de representar al curso seleccionado
            articuloscarrito = articuloscarrito.filter( cursoAA => cursoAA.id !== cursoId );// Crea un nuevo arreglo con filter(), excluyendo al que no deseamos y almacena la nueva array en el mismo art..carrito!!

            carritoHTML();// Sube la nueva array
        }
    }

    // function vaciarCarrito(event){

    //         articuloscarrito = [];
    //         carritoHTML();

    // }

//lee el html al que le dimos click y extrae la información
function leerDatosCurso(cursoSe){
    // console.log(curso)
   
    //Crear un objeto con el contenido del curso actual
    const infoCurso = { // infoCurso es un objeto condicional
        imagen: cursoSe.querySelector('img').src,
        titulo: cursoSe.querySelector('h4').textContent,
        precio: cursoSe.querySelector('p span').textContent,
        id: cursoSe.querySelector('a').getAttribute('data-id'),
        cantidad: 1,

        
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articuloscarrito.some( cursoAC => cursoAC.id === infoCurso.id); // Existe puede ser true o false
    if(existe) { // Omitimos el ===True
        // Actualizamos la cantidad
        const cursos = articuloscarrito.map( cursoAC => {
            if(cursoAC.id === infoCurso.id){
                cursoAC.cantidad++;
                return cursoAC;
            }else{ 
                return cursoAC;
            }
        })

    }else{
    // Agrega elementos al arreglo del carrito
    articuloscarrito = [...articuloscarrito, infoCurso]
    }

    
    console.log(articuloscarrito);

    carritoHTML();
}

// Muestra el carrito de compras en el HTML
    function carritoHTML() {

        // Limpiar HTML
        limpiarHTML();

        articuloscarrito.forEach( cursoAA => { // Itera sobre el array actualizado con los objetos cursoAA
            const {imagen, titulo, precio, cantidad,id} = cursoAA; // Destructuring
            const row = document.createElement('tr'); // crea una variable en la que agrega propiedades por cada obj del array
            row.innerHTML = `
                <td><img src="${imagen}" width="100px"></td>
                <td>${titulo}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td><a href=# class="borrar-curso" data-id="${id}"> - </a></td>
            `;
            // Agrega el HTML del carrito en el tbody
            contenedorCarrito.appendChild(row);  // Aquí se agrega al carrito a mostrarse
        })
    } 

function limpiarHTML(){

    // contenedorCarrito.innerHTML="";

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

    /*
    <div> // Mientras haya un hijo elimina el primero
        <p>1</p> //Eliminar!
        <p>2</p>
        <p>3</p>
    </div>
    */
}





