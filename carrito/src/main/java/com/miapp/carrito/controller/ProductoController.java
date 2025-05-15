package com.miapp.carrito.controller;

import com.miapp.carrito.model.Producto;
import com.miapp.carrito.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoService productoService;

    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public List<Producto> listar() {
        return productoService.listar();
    }

    @PostMapping
    public Producto agregar(@RequestBody Producto producto) {
        return productoService.agregar(producto);
    }

    @PutMapping("/{id}")
    public Producto modificar(@PathVariable Long id, @RequestBody Producto producto) {
        return productoService.modificar(id, producto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        productoService.eliminar(id);
    }
}
