# Registro de Cambios — Gestor de Clientes

## 1. Objetivo

Registrar los elementos de configuración del Gestor de Clientes y mantener la trazabilidad entre solicitudes, código fuente, pruebas, documentación y versiones.

## 2. Elementos de Configuración del Software (ECS)

| Identificador | Elemento | Ubicación | Descripción |
|---|---|---|---|
| ECS-01 | README principal | `README.md` | Descripción pública del proyecto e instrucciones básicas. |
| ECS-02 | Interfaz del sistema | `src/index.html` | Formulario, tarjetas de resumen, búsqueda, filtros y tabla. |
| ECS-03 | Código fuente | `src/script.js` | Operaciones ABM, validación, búsqueda, filtrado y conteo. |
| ECS-04 | Hoja de estilos | `src/styles.css` | Presentación visual y diseño adaptable. |
| ECS-05 | Pruebas automatizadas | `tests/test_validacion.js` | Pruebas de funciones de validación, normalización, filtrado y conteo. |
| ECS-06 | Índice de documentación | `docs/README.md` | Resumen e índice de los documentos del proyecto. |
| ECS-07 | Manual de usuario | `docs/manual_usuario.md` | Instrucciones para utilizar el sistema. |
| ECS-08 | Manual técnico | `docs/manual_tecnico.md` | Tecnologías, modelo de datos y funciones principales. |
| ECS-09 | Plan de pruebas | `docs/plan_pruebas.md` | Casos manuales, pruebas automatizadas y criterios de aceptación. |
| ECS-10 | Registro de cambios | `docs/registro_cambios.md` | Historial de cambios, versiones y trazabilidad. |
| ECS-11 | Configuración Git | `.gitignore` | Exclusiones de archivos que no deben versionarse. |

## 3. Estado previo a la línea base

La aplicación incluye alta, consulta, modificación y eliminación de clientes; campos de empresa, estado y notas; búsqueda; filtro por estado; tarjetas de resumen y persistencia mediante `localStorage`.

El archivo de pruebas contiene 26 pruebas automatizadas para las funciones `validarTelefono()`, `estadoDe()`, `normalizar()`, `filtrarClientes()` y `contarPorEstado()`. 

## 4. Solicitud de cambio planificada

**Issue previsto:** #101  
**Título:** `Ticket #101 - Validar formato de teléfono`  
**Tipo:** Corrección de defecto (`bug`)

### Problema

La función actual `validarTelefono(tel)` solamente comprueba que el valor no esté vacío después de quitar espacios exteriores. Por lo tanto, acepta entradas como `ABC123`, aunque el requisito es que el teléfono contenga únicamente números.

### Cambio solicitado

Modificar la validación para aceptar exclusivamente cadenas formadas por dígitos, usando la regla prevista:

```javascript
function validarTelefono(tel) {
    return /^[0-9]+$/.test(tel);
}
```

Esta corrección no debe aplicarse antes de crear la línea base, porque es el cambio que se va a gestionar en las siguientes etapas del práctico.

### Elementos afectados previstos

- `src/script.js`: actualizar `validarTelefono()`.
- `tests/test_validacion.js`: actualizar el caso `ABC123` y añadir/verificar entradas límite.
- `docs/manual_usuario.md`: explicar la regla corregida.
- `docs/manual_tecnico.md`: documentar la expresión regular.
- `docs/plan_pruebas.md`: actualizar los resultados esperados.
- `docs/registro_cambios.md`: registrar la versión liberada.

### Flujo de control del cambio previsto

1. Crear el Issue y asignarle la etiqueta `bug` y el responsable correspondiente.
2. Crear la rama `fix-validacion-telefono`.
3. Implementar la corrección y actualizar las pruebas y la documentación.
4. Registrar commits descriptivos vinculados al Issue #101.
5. Abrir una Pull Request con referencia `Fixes #101`.
6. Ejecutar/verificar las pruebas y fusionar la PR en `main`.
7. Crear el tag `v1.1` y publicar la Release correspondiente.

Los pasos se registrarán cuando efectivamente se realicen; su descripción aquí es planificación, no evidencia de que ya estén completados.

## 5. Historial de versiones

| Versión | Fecha | Referencia | Descripción | Estado |
|---|---|---|---|---|
| v1.0 | A completar | Commit inicial | Línea base inicial del proyecto. | Pendiente de creación |
| v1.1 | A completar | Issue #101 | Validación del teléfono para aceptar únicamente números. | Pendiente de implementación y liberación |

Las fechas, los identificadores de commit y el estado se actualizarán según lo que se publique realmente.

## 6. Trazabilidad prevista

| Elemento | Finalidad |
|---|---|
| Issue #101 | Registrar el problema y el cambio solicitado. |
| Rama `fix-validacion-telefono` | Aislar el desarrollo de la corrección. |
| Commits | Identificar los cambios concretos y relacionarlos con el ticket. |
| Pruebas automatizadas | Comprobar el comportamiento esperado y evitar regresiones. |
| Pull Request | Revisar y documentar la integración del cambio. |
| Tag `v1.0` | Identificar la línea base inicial. |
| Tag `v1.1` | Identificar la versión que incluye la corrección. |
| Release `v1.1` | Publicar la versión corregida con su descripción. |

## 7. Verificación antes de liberar v1.1

- La función acepta únicamente dígitos.
- Los casos automatizados relevantes pasan.
- Las operaciones de la aplicación siguen funcionando.
- La documentación afectada está actualizada.
- La Pull Request se integró en `main`.
- El tag `v1.1` identifica el commit corregido.
- La Release describe el cambio y hace referencia al Issue #101.

## 8. Actualización del registro

Este documento se mantendrá actualizado durante el práctico. No se marcarán como completados Issues, commits, etiquetas, Pull Requests ni Releases hasta comprobar que existen en el repositorio.
