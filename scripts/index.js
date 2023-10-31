

let carrito = [];
let subTotal = 0;
let total = 0;

const productos = [
    {
        nombreProducto: 'Buzo térmico',
        precioProducto: 7900,
        imgProducto: "./multimedia/20220528_142329.jpg",
    },
    {
        nombreProducto: 'Leggins personalizada crossfit verde',
        precioProducto: 5400,
        imgProducto: "./multimedia/20220528_150103.jpg",
    },
    {
        nombreProducto: 'Leggins personalizada crossfit lila',
        precioProducto: 5400,
        imgProducto: "./multimedia/20220528_150724.jpg",
    },
    {
        nombreProducto: 'Joggin',
        precioProducto: 6550,
        imgProducto: "./multimedia/20220528_152158.jpg",
    },
    {
        nombreProducto: 'Leggins personalizada ByN',
        precioProducto: 5400,
        imgProducto: "./multimedia/20220528_143914 (1).jpg",
    },
];

const agregarAlCarrito = (producto) => {
    carrito.push(producto);
    guardarCarrito();
    listarCarrito();
}

const listarProductos = () => {
    const listaProductos = document.getElementById("productos");

    productos.forEach(producto => {
        // Creo el div cartaProducto
        const cartaProducto = document.createElement('div');
        cartaProducto.classList.add('cartaProducto');


        const imagenProducto = document.createElement('img');
        imagenProducto.classList.add('imgProducto');
        imagenProducto.setAttribute('src', producto.imgProducto);

        const nombreProducto = document.createElement('p');
        nombreProducto.classList.add('Nombre');
        nombreProducto.textContent = producto.nombreProducto;

        const precioProducto = document.createElement('p');
        precioProducto.classList.add('Precio');
        precioProducto.textContent = "$" + producto.precioProducto;


        const btnAgregarCarrito = document.createElement('button');
        btnAgregarCarrito.textContent = 'Agregar al carrito';
        btnAgregarCarrito.classList.add('agregar-al-carrito');
        btnAgregarCarrito.onclick = () => agregarAlCarrito(producto);



        cartaProducto.appendChild(imagenProducto);
        cartaProducto.appendChild(nombreProducto);
        cartaProducto.appendChild(precioProducto);
        cartaProducto.appendChild(btnAgregarCarrito);

        listaProductos.appendChild(cartaProducto);
    });
}



const listarCarrito = () => {
    const lstCarrito = document.getElementById('carrito');
    lstCarrito.innerHTML = "";
    subTotal = 0;
    carrito.forEach((producto, key) => {
        const itemCarrito = document.createElement('li');
        itemCarrito.textContent = producto.nombreProducto;
        lstCarrito.appendChild(itemCarrito);
        subTotal += producto.precioProducto;

        const eliminar = document.createElement("button");
        eliminar.textContent = "X";
        eliminar.clasName = "eliminarProdcuto";

        
        eliminar.onclick = () => eliminarItemCarrito(key);
        itemCarrito.appendChild(eliminar);

    });
    const elementSubtotal = document.getElementById('subTotal');
    elementSubtotal.textContent = subTotal;

}


function eliminarItemCarrito(key) {
   
    carrito = carrito.filter((producto, pos) => {
    
        return key !== pos;
    });
    listarCarrito();

}


const aplicarDescuento = () => {
    const codigoDescuento = document.getElementById('cupon').value;
    total = subTotal;
    if (codigoDescuento == "INVIERNO2023") {
        const descuento = 0.25;
        total -= subTotal * descuento;
    }
    const elementTotal = document.getElementById('total');
    elementTotal.textContent = total;
}

const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const vaciarCarrito = () => {
    carrito = [];
    localStorage.removeItem("carrito");
    listarCarrito();
}

const init = () => {
    listarProductos();
    const lsCarrito = localStorage.getItem("carrito");
    if (lsCarrito) {
        carrito = JSON.parse(lsCarrito);
    }
    listarCarrito();
};

init();