# API Cliente — Referencia de Endpoints

Base URL: `http://localhost:3000/api/clientes`

---

## 1. Crear cliente

`POST /api/clientes`

Body (JSON):

```json
{
  "nombre": "Maria Perez",
  "email": "maria@empresa.com",
  "telefono": "+51 987 654 321",
  "tipoDocumento": "DNI",
  "numeroDocumento": "70544123",
  "direccion": "Av. Los Alamos 123, Miraflores, Lima"
}
```

`estado` es opcional (`"Activo"` / `"Inactivo"`, por defecto `Activo`).

Respuestas:
- `201` → cliente creado con sus datos
- `400` → validación falló (`{"message":"Datos inválidos","errors":{...}}`)
- `409` → email o documento ya existe (`{"message":"Ya existe un cliente con ese email"}`)

---

## 2. Listar todos

`GET /api/clientes`

Respuestas:
- `200` → array de clientes, ordenado por nombre ascendente

---

## 3. Obtener uno

`GET /api/clientes/{id}`

Respuestas:
- `200` → datos del cliente
- `404` → `{"message":"Cliente no encontrado"}`

---

## 4. Actualizar

`PUT /api/clientes/{id}`

Body (JSON, se envían solo los campos a cambiar):

```json
{
  "telefono": "+51 999 888 777"
}
```

Respuestas:
- `200` → cliente actualizado
- `400` → validación falló, o body vacío `{}` (`{"message":"No se enviaron campos para actualizar"}`)
- `404` → `{"message":"Cliente no encontrado"}`
- `409` → el email ya lo tiene otro cliente

---

## 5. Eliminar

`DELETE /api/clientes/{id}`

Respuestas:
- `200` → cliente eliminado
- `404` → `{"message":"Cliente no encontrado"}`

---

## Validaciones de campos

Errores de validación devuelven `400` con:
`{"message":"Datos inválidos","errors":{"campo":["motivo"]}}`

| Campo | Regla |
|---|---|
| `nombre` | obligatorio, no vacío |
| `email` | obligatorio, formato válido (algo@dominio.com) |
| `telefono` | obligatorio, formato `+xx xxx xxx xxx` (dígitos con prefijo opcional) |
| `tipoDocumento` | solo `"DNI"` o `"RUC"` |
| `numeroDocumento` | solo dígitos; 8 si es DNI, 11 si es RUC |
| `direccion` | obligatorio, no vacío |
| `estado` | opcional, solo `"Activo"` o `"Inactivo"` |

Nota: los `{id}` son UUIDs que devuelve el POST o el GET de listado.
