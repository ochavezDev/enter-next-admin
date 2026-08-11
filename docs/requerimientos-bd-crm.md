# Requerimientos de Base de Datos — CRM de Ventas
## Fase 1: Cliente, Producto y Blog

**Alcance:** esta fase solo define Cliente, Producto y Blog. Ventas y
facturación se agregan en fases posteriores; las relaciones que esas
entidades tendrán más adelante se dejan anotadas para no cerrarle el
camino al diseño futuro.

**Convenciones generales (aplican a todas las entidades):**
- Cada registro lleva un identificador interno (ID) autogenerado, que no
  proviene de datos de negocio (ni el email, ni el número de documento,
  ni el nombre sirven como identificador).
- Cada registro guarda fecha de creación y fecha de última modificación.
- "Obligatorio" significa que el campo no puede quedar vacío ni en
  blanco (no se admiten espacios sueltos).
- Los datos se borran de forma lógica (un campo estado Activo/Inactivo),
  nunca se elimina un registro físico si tiene historial.
- No se guardan valores repetidos si una regla dice "único".

---

## 1. Cliente

### Definición
Registra a las personas o empresas que le compran o le pueden comprar al
negocio. Es la base de la cartera de contactos comerciales.

### Campos
| Campo | Tipo | ¿Obligatorio? | Ejemplo de valor |
|---|---|---|---|
| nombre | texto | Sí | "María Pérez" / "Inversiones Andina SAC" |
| email | texto | Sí | "mperez@empresa.com" |
| teléfono | texto | Sí | "+51 987 654 321" |
| tipo de documento | texto (lista cerrada) | Sí | "DNI" o "RUC" |
| número de documento | texto | Sí | "70544123" o "20511234567" |
| dirección | texto | Sí | "Av. Los Álamos 123, Miraflores, Lima" |
| estado | texto (lista cerrada) | No | "Activo" (valor por defecto) o "Inactivo" |
| fecha de creación | fecha | Sí (la asigna el sistema) | "2026-08-05" |

> Nota: el teléfono y el número de documento se guardan como texto
> aunque sean números, porque pueden llevar prefijos, guiones o ceros a
> la izquierda y nunca se hacen cálculos con ellos.

### Restricciones
1. El email es único: no se puede repetir entre clientes.
2. El email debe tener formato válido (algo@dominio.com).
3. El tipo de documento solo admite "DNI" o "RUC".
4. El número de documento solo contiene dígitos (sin letras ni símbolos).
5. Si el tipo de documento es DNI, el número tiene exactamente 8 dígitos;
   si es RUC, exactamente 11 dígitos.
6. La combinación tipo de documento + número de documento es única: dos
   clientes no pueden tener el mismo DNI (o el mismo RUC).
7. Ningún campo de texto puede quedar en blanco; se rechazan los
   espacios sueltos (ej: un nombre que es solo espacios no se acepta).
8. El teléfono debe tener un formato de número válido (cantidad de
   dígitos razonable, con prefijo opcional).

### Relaciones
- En esta fase, Cliente no se relaciona directamente con Producto ni con
  Blog.
- Relación futura (fase de ventas): **1 cliente → muchos pedidos/ventas**
  (relación 1 a muchos). Un cliente puede tener muchos pedidos, y cada
  pedido pertenece a un solo cliente.

---

## 2. Producto

### Definición
Registra todo lo que el negocio vende, con su precio y la cantidad
disponible para la venta.

### Campos
| Campo | Tipo | ¿Obligatorio? | Ejemplo de valor |
|---|---|---|---|
| nombre | texto | Sí | "Laptop ThinkPad X1" |
| descripción | texto largo | Sí | "Laptop de 14 pulgadas, 16 GB RAM, 512 GB SSD" |
| precio | número decimal | Sí | "1499.90" |
| stock | número entero | Sí | "25" |
| categoría | texto (lista cerrada) | Sí | "Tecnología" |
| imagen | texto (URL) | No | "https://cdn.empresa.com/productos/laptop-x1.jpg" |
| estado | texto (lista cerrada) | No | "Activo" (valor por defecto) o "Inactivo" |

### Restricciones
1. El precio siempre es mayor a 0 (no se admiten productos gratis ni
   precios negativos).
2. El stock nunca es negativo: admite 0 (producto agotado) o más.
3. El stock es un número entero (no se vende medio producto).
4. El nombre es obligatorio y no se puede repetir entre productos: dos
   productos no pueden llamarse igual.
5. La categoría solo admite valores de una lista predefinida de
   categorías (no se escribe una categoría nueva libremente).
6. El precio admite como máximo 2 decimales (ej: 1499.90, no 1499.905).
7. Si se carga una imagen, debe ser una URL válida; el campo puede estar
   vacío sin problema (imagen opcional por ahora).

### Relaciones
- **Categoría (por ahora):** es un campo de texto sobre una lista cerrada.
  Si en el futuro se necesita un catálogo jerárquico de categorías
  (subcategorías, secciones), pasará a ser una entidad propia con
  relación **1 categoría → muchos productos**.
- **Con Blog:** relación **muchos a muchos** (opcional): un producto puede
  aparecer en varios artículos del blog y un artículo puede mencionar
  varios productos.
- **Relación futura (fase de ventas):** 1 producto → muchos ítems de
  venta. Un producto puede venderse muchas veces y cada línea de venta
  corresponde a un solo producto.

---

## 3. Blog

### Definición
Guarda los artículos de contenido (notas, guías, noticias) que el
negocio publica para atraer y educar a sus clientes.

### Campos
| Campo | Tipo | ¿Obligatorio? | Ejemplo de valor |
|---|---|---|---|
| título | texto | Sí | "5 estrategias para cerrar más ventas" |
| contenido | texto largo | Sí | "En este artículo te mostramos..." |
| autor | texto | Sí | "Equipo Comercial" |
| fecha de publicación | fecha | Sí | "2026-08-05" |
| estado | texto (lista cerrada) | No | "Publicado" o "Borrador" |

### Restricciones
1. El título es obligatorio, no puede quedar en blanco y no se puede
   repetir entre artículos.
2. El contenido es obligatorio y no puede quedar en blanco.
3. El autor es obligatorio y no puede quedar en blanco.
4. La fecha de publicación es obligatoria.
5. Un artículo se considera publicado solo a partir de su fecha de
   publicación: si la fecha es futura, el artículo no se muestra hasta
   que llegue ese día.
6. Un artículo en estado "Borrador" no se muestra en el sitio público,
   aunque tenga fecha de publicación cargada.

### Relaciones
- **Autor (por ahora):** es un campo de texto. Si más adelante existe un
  módulo de usuarios/administradores, pasará a ser una relación
  **1 autor → muchos artículos** (relación 1 a muchos).
- **Con Producto:** relación **muchos a muchos** (opcional): un artículo
  puede referenciar varios productos y un producto puede mencionarse en
  varios artículos.
- **Con Cliente:** no existe relación en ninguna fase.

---

## Resumen del modelo conceptual

```
Cliente  (1) ──── (N) Pedido/Venta     [fase futura]
Producto (1) ──── (N) Línea de venta    [fase futura]
Producto (N) ──── (N) Blog              [opcional, muchos a muchos]
Categoría (1) ──── (N) Producto         [solo si se vuelve entidad]
Autor (1) ──────── (N) Blog             [solo si se vuelve entidad]
```

Reglas transversales:
- Ningún campo obligatorio acepta valores vacíos o en blanco.
- Email, número de documento (según tipo) y nombre de producto son únicos.
- Precio > 0, stock ≥ 0.
- Todos los borrados son lógicos (estado Activo/Inactivo).
