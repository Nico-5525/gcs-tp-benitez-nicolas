# Manual Técnico — Gestor de Clientes

## 1. Descripción general

Gestor de Clientes es una aplicación web del lado del cliente desarrollada con HTML, CSS y JavaScript. No requiere un servidor de aplicación ni una base de datos externa para las operaciones actuales. Los registros se conservan en `localStorage`.

## 2. Tecnologías

| Tecnología | Responsabilidad |
|---|---|
| HTML5 | Estructura de la interfaz, formulario, tabla y controles. |
| CSS3 | Presentación visual y adaptación a pantallas pequeñas. |
| JavaScript | Operaciones ABM, búsqueda, filtrado, resúmenes y validaciones. |
| `localStorage` | Persistencia de los registros en el navegador. |
| Node.js (`node:test`) | Ejecución de pruebas automatizadas sin instalar un framework externo. |
| Git y GitHub | Control de versiones y gestión de los cambios del práctico. |

## 3. Organización de archivos

### `src/index.html`

Define el formulario de alta y edición, los campos de cliente, las tarjetas de resumen, la búsqueda, el filtro de estado, la tabla y los mensajes de interfaz. Carga `styles.css` y `script.js`.

### `src/styles.css`

Define la presentación de la aplicación: encabezado, tarjetas de resumen, formulario, controles, tabla, botones, mensajes y reglas adaptables a distintos tamaños de pantalla.

### `src/script.js`

Contiene funciones reutilizables y la lógica de la interfaz. Las funciones puras se declaran fuera del bloque que depende del navegador, lo que permite importarlas desde Node.js sin acceder al DOM.

| Función | Responsabilidad actual |
|---|---|
| `validarTelefono(tel)` | En v1.0 devuelve `true` si el valor convertido a texto no está vacío después de quitar espacios exteriores. No comprueba que sean solo dígitos. |
| `estadoDe(cliente)` | Devuelve `activo`, `prospecto` o `inactivo` si el estado es válido; si falta o no es reconocido, devuelve `prospecto`. |
| `normalizar(texto)` | Convierte el texto a minúsculas, elimina tildes y devuelve texto vacío para valores nulos o indefinidos. |
| `filtrarClientes(lista, texto, estado)` | Filtra por estado y busca coincidencias en nombre, apellido, empresa, correo y teléfono. La búsqueda normaliza mayúsculas y tildes. |
| `contarPorEstado(lista)` | Calcula el total de registros y las cantidades de activos, prospectos e inactivos. |

El resto del código del navegador recupera los registros de `localStorage`, dibuja la tabla, administra alta/edición/eliminación, actualiza los resúmenes y responde a los eventos de búsqueda y filtrado.

### `tests/test_validacion.js`

Contiene 26 pruebas automatizadas usando los módulos integrados `node:test` y `node:assert/strict`. Comprueban el comportamiento actual de `validarTelefono`, `estadoDe`, `normalizar`, `filtrarClientes` y `contarPorEstado`.

### `docs/`

Incluye manual de usuario, manual técnico, plan de pruebas, índice de documentación y registro de cambios.

### `.gitignore`

Declara archivos y carpetas que Git debe ignorar, como dependencias futuras y registros de ejecución. No elimina ni modifica archivos que ya estén versionados.

## 4. Modelo de datos

Cada cliente se representa como un objeto JavaScript. Sus atributos actuales son:

| Atributo | Tipo habitual | Descripción |
|---|---|---|
| `id` | Cadena | Identificador del registro. |
| `nombre` | Cadena | Nombre del cliente. |
| `apellido` | Cadena | Apellido del cliente. |
| `correo` | Cadena | Correo electrónico. |
| `telefono` | Cadena | Teléfono ingresado; se conserva como texto. |
| `empresa` | Cadena | Empresa asociada, opcional. |
| `estado` | Cadena | `activo`, `prospecto` o `inactivo`. |
| `notas` | Cadena | Notas opcionales, con un máximo de 500 caracteres en el formulario. |

Los registros se serializan como JSON bajo la clave `gestorClientes` de `localStorage`. `estadoDe()` permite interpretar registros antiguos que no tengan un estado válido como prospectos.





