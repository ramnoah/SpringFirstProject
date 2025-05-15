const API_URL = '/api/productos';

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();

    document.getElementById('formulario').addEventListener('submit', async (e) => {
        e.preventDefault();

        const producto = {
            nombre: document.getElementById('nombre').value,
            descripcion: document.getElementById('descripcion').value,
            precio: parseFloat(document.getElementById('precio').value),
            stock: parseInt(document.getElementById('stock').value)
        };

        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });

        e.target.reset();
        cargarProductos();
    });
});

async function cargarProductos() {
    const res = await fetch(API_URL);
    const productos = await res.json();
    const contenedor = document.getElementById('productos-container');
    contenedor.innerHTML = '';

    productos.forEach(p => {
        const card = document.createElement('div');
        card.className = 'producto-card';

        card.innerHTML = `
            <input type="text" value="${p.nombre}" id="nombre-${p.id}">
            <input type="text" value="${p.descripcion}" id="descripcion-${p.id}">
            <input type="number" value="${p.precio}" id="precio-${p.id}">
            <input type="number" value="${p.stock}" id="stock-${p.id}">
            <div class="acciones">
                <button class="editar" onclick="editarProducto(${p.id})">Guardar</button>
                <button class="eliminar" onclick="eliminarProducto(${p.id})">Eliminar</button>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

async function editarProducto(id) {
    const nombre = document.getElementById(`nombre-${id}`).value;
    const descripcion = document.getElementById(`descripcion-${id}`).value;
    const precio = parseFloat(document.getElementById(`precio-${id}`).value);
    const stock = parseInt(document.getElementById(`stock-${id}`).value);

    const producto = { nombre, descripcion, precio, stock };

    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    });

    alert('Producto actualizado');
    cargarProductos();
}

async function eliminarProducto(id) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        cargarProductos();
    }
}
