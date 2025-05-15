package com.miapp.carrito.service;

import com.miapp.carrito.model.Producto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductoService {


    private List<Producto> productos = new ArrayList<>();
    private Long idActual = 1L;

    public List<Producto> listar() {
        return productos;
    }

    //Agregar

    public Producto agregar(Producto producto) {
        producto.setId(idActual++);
        productos.add(producto);
        return producto;
    }

    //Modificar

    public Producto modificar(Long id, Producto nuevoProducto) {
        for (Producto p : productos) {
            if (p.getId(). equals(id)) {
                p.setNombre(nuevoProducto.getNombre());
                p.setDescripcion(nuevoProducto.getDescripcion());
                p.setPrecio(nuevoProducto.getPrecio());
                p.setStock(nuevoProducto.getStock());
                return p;
            }
        }
        return null;
    }

    //Eliminar
    public boolean eliminar(Long id) {
        return productos.removeIf(p -> p.getId(). equals(id));
    }

}
