CREATE DATABASE IF NOT EXISTS inventario_abarrotes CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE inventario_abarrotes;

INSERT IGNORE INTO categorias (id_categoria, nombre_categoria, descripcion) VALUES
(1, 'Lácteos', 'Leche, yogurt y quesos'),
(2, 'Abarrotes', 'Arroz, pasta y enlatados'),
(3, 'Bebidas', 'Refrescos, aguas y jugos'),
(4, 'Limpieza', 'Detergentes, cloro y desinfectantes');

INSERT IGNORE INTO proveedores (id_proveedor, nombre_empresa, telefono, correo, direccion) VALUES
(1, 'Distribuidora La Esperanza', '5551234567', 'ventas@laesperanza.com', 'Av. Central 100'),
(2, 'Abarrotes del Sur', '5557654321', 'contacto@abarrotesdelsur.com', 'Calle Juárez 55'),
(3, 'Bebidas Fresh', '5559876543', 'fresh@bebidas.com', 'Boulevard 20');

INSERT IGNORE INTO usuarios (id_usuario, nombre, usuario, contrasena, rol, activo) VALUES
(1, 'Ana Morales', 'ana', '123456', 'administrador', 1),
(2, 'Luis Pérez', 'luis', '123456', 'cajero', 1),
(3, 'Sofía Ruiz', 'sofia', '123456', 'almacén', 1);

INSERT IGNORE INTO productos (id_producto, id_categoria, id_proveedor, nombre_producto, precio_compra, precio_venta, stock_actual, stock_minimo, activo) VALUES
(1, 1, 1, 'Leche Lala 1L', 18.50, 24.00, 40, 10, 1),
(2, 1, 1, 'Yoghurt Danone 1L', 22.00, 28.50, 25, 8, 1),
(3, 2, 2, 'Arroz Diana 1kg', 8.50, 11.50, 60, 20, 1),
(4, 2, 2, 'Pasta Lucchetti 500g', 10.00, 13.50, 35, 12, 1),
(5, 3, 3, 'Coca-Cola 600ml', 12.00, 18.00, 30, 10, 1),
(6, 4, 2, 'Detergente Ace 1kg', 24.00, 31.00, 20, 6, 1);

INSERT IGNORE INTO ventas (id_venta, id_usuario, fecha, total) VALUES
(1, 2, '2026-07-31 09:30:00', 48.00),
(2, 2, '2026-07-31 11:15:00', 36.00);

INSERT IGNORE INTO detalle_venta (id_detalle, id_venta, id_producto, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 1, 2, 24.00, 48.00),
(2, 2, 3, 3, 12.00, 36.00);

UPDATE productos SET stock_actual = stock_actual - 2 WHERE id_producto = 1;
UPDATE productos SET stock_actual = stock_actual - 3 WHERE id_producto = 3;
