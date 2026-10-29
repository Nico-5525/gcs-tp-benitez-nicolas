# Plan de Pruebas — Gestor de Clientes

## 1. Objetivo

Definir las verificaciones para el Gestor de Clientes y comprobar que los cambios futuros no rompan las funciones existentes. El plan diferencia las pruebas funcionales manuales de la interfaz y las pruebas automatizadas de funciones JavaScript.

## 2. Alcance

- Alta, consulta, modificación y eliminación de clientes.
- Validación de campos obligatorios y formato general del correo electrónico.
- Búsqueda y filtrado por estado.
- Conteo de clientes por estado.
- Validación del teléfono
- Persistencia de los registros en `localStorage`.

## 3. Entorno de pruebas

| Elemento | Descripción |
|---|---|
| Aplicación | Gestor de Clientes |
| Interfaz | HTML y CSS en navegador moderno |
| Lógica | JavaScript |
| Persistencia | `localStorage` del navegador |
| Pruebas automatizadas | Node.js y módulo `node:test` |
| Archivo automatizado | `tests/test_validacion.js` |
| Comando | `node --test tests/test_validacion.js` |

## 4. Casos funcionales manuales

Estos casos deben ejecutarse en el navegador. No se consideran automáticamente aprobados por el hecho de que pasen las pruebas de Node.js.

| ID | Caso | Procedimiento | Resultado esperado |
|---|---|---|---|
| CP-01 | Registrar cliente | Completar los campos obligatorios y guardar. | El cliente aparece en la tabla y se actualizan los resúmenes. |
| CP-02 | Campo obligatorio vacío | Omitir un campo obligatorio e intentar guardar. | El formulario impide el registro. |
| CP-03 | Correo inválido | Ingresar un correo con formato incorrecto. | El navegador impide enviar el formulario. |
| CP-04 | Consulta | Revisar un cliente registrado. | Sus datos aparecen correctamente en la tabla. |
| CP-05 | Modificar cliente | Editar un registro y guardar. | Se actualiza el registro seleccionado. |
| CP-06 | Cancelar modificación | Entrar en edición y cancelar. | Se abandona la edición sin guardar los cambios. |
| CP-07 | Eliminar cliente | Confirmar la eliminación. | El registro desaparece de la tabla. |
| CP-08 | Cancelar eliminación | Rechazar la confirmación. | El registro permanece. |
| CP-09 | Persistencia | Guardar un cliente y recargar la página. | El cliente sigue disponible en el mismo navegador y origen. |
| CP-10 | Buscar por nombre o apellido | Escribir una parte del nombre o apellido. | Se muestran las coincidencias. |
| CP-11 | Buscar sin distinguir tildes | Buscar `Nicolas` para un cliente llamado `Nicolás`. | Se encuentra el registro. |
| CP-12 | Buscar por empresa, correo o teléfono | Introducir una parte de uno de esos campos. | Se muestran las coincidencias correspondientes. |
| CP-13 | Filtrar por estado | Elegir Activos, Prospectos o Inactivos. | La tabla muestra solo los clientes de ese estado. |
| CP-14 | Combinar búsqueda y estado | Ingresar un texto y seleccionar un estado. | Se aplican ambos criterios a la vez. |
| CP-15 | Resumen por estado | Agregar clientes con distintos estados. | Las tarjetas muestran cantidades y total coherentes. |
| CP-16 | Cliente sin estado válido | Cargar un registro antiguo sin estado, si se dispone de uno. | Se interpreta como Prospecto. |

## 5. Pruebas automatizadas actuales: versión inicial

El archivo `tests/test_validacion.js` contiene **26 pruebas**. Se agrupan por función de la siguiente manera:

### 5.1. `validarTelefono()` — 5 pruebas

| Caso | Entrada | Resultado actual esperado |
|---|---|---|
| Teléfono con dígitos | `2801234567` | `true` |
| Teléfono con letras (defecto conocido) | `ABC123` | `true` |
| Cadena vacía | `""` | `false` |
| Solo espacios | `"   "` | `false` |
| Valor numérico | `2801234567` como número | `true` |

### 5.2. `estadoDe()` — 3 pruebas

- Devuelve correctamente los estados válidos `activo`, `prospecto` e `inactivo`.
- Considera prospecto a un cliente sin estado.
- Considera prospecto a un cliente con estado desconocido.

### 5.3. `normalizar()` — 2 pruebas

- Convierte a minúsculas y elimina tildes.
- Devuelve texto vacío para `undefined` y `null`.

### 5.4. `filtrarClientes()` — 14 pruebas

Comprueba: lista completa sin filtros; filtrado por activo; filtrado por inactivo; clientes sin estado válido como prospectos; búsqueda por nombre ignorando tildes; búsqueda por apellido; búsqueda por nombre y apellido juntos; búsqueda por empresa; búsqueda por correo; búsqueda por teléfono; normalización de mayúsculas y espacios exteriores; combinación de texto y estado; resultado vacío cuando no hay coincidencias; y que la función no modifique la lista original.

### 5.5. `contarPorEstado()` — 2 pruebas

- Cuenta el total y la cantidad de clientes por estado.
- Devuelve todos los contadores en cero para una lista vacía.

## 6. Corrección prevista para el Issue #101

La versión inicial acepta `ABC123`, lo que representa el defecto a corregir. Durante la parte correspondiente del práctico, se actualizará la función y también la prueba que actualmente espera `true` para ese valor.

Después del cambio, los resultados previstos para la validación son:

| Entrada | Resultado esperado en la versión corregida |
|---|---|
| `2801234567` | `true` |
| `123456` | `true` |
| `ABC123` | `false` |
| `280ABC4567` | `false` |
| `""` | `false` |
| `"   "` | `false` |
| `123 456` | `false` |
| `123-456` | `false` |

El defecto es parte del ejercicio de control de cambios.


