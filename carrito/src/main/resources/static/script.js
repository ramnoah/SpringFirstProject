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
    const tbody = document.querySelector('#tabla-productos tbody');
    tbody.innerHTML = '';

    productos.forEach(p => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${p.id}</td>
            <td><input type="text" value="${p.nombre}" id="nombre-${p.id}"></td>
            <td><input type="text" value="${p.descripcion}" id="descripcion-${p.id}"></td>
            <td><input type="number" value="${p.precio}" id="precio-${p.id}"></td>
            <td><input type="number" value="${p.stock}" id="stock-${p.id}"></td>
            <td>
                <button onclick="editarProducto(${p.id})">Guardar</button>
                <button onclick="eliminarProducto(${p.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
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
