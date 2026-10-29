# Registro de cambios y elementos de configuración

## 1. Información general

**Proyecto:** Gestor de clientes  
**Repositorio:** `gcs-tp-benitez-nicolas`  
**Rama principal:** `main`

Este documento identifica los elementos de configuración del proyecto y registra los cambios realizados durante su desarrollo. Los cambios se relacionan con incidencias, ramas, commits, pruebas y versiones.

## 2. Elementos de configuración (ECS)

| Elemento | Ubicación | Descripción |
|---|---|---|
| Interfaz web | `src/index.html` | Estructura de la aplicación. |
| Estilos | `src/styles.css` | Presentación visual. |
| Lógica | `src/script.js` | Funciones de gestión de clientes y validaciones. |
| Pruebas | `tests/test_validacion.js` | Pruebas automatizadas de funciones JavaScript. |
| Manual de usuario | `docs/manual_usuario.md` | Instrucciones y comportamiento para el usuario. |
| Manual técnico | `docs/manual_tecnico.md` | Descripción técnica de la implementación. |
| Plan de pruebas | `docs/plan_pruebas.md` | Casos y criterios de verificación. |
| Registro de cambios | `docs/registro_cambios.md` | Historial y trazabilidad de versiones. |
| README principal | `README.md` | Presentación del proyecto en GitHub. |
| Reglas de exclusión | `.gitignore` | Archivos que Git debe ignorar. |

## 3. Línea base v1.0

La versión inicial se registró mediante el commit `Versión inicial - Línea base v1.0` y se identificó con la etiqueta `v1.0`.

Esta línea base representa el estado inicial del proyecto antes de implementar la corrección del ticket #101.

## 4. Registro de la incidencia #101

**Título:** Ticket #101 - Validar formato de teléfono  
**Tipo:** Error de validación  
**Rama de trabajo:** `fix-validacion-telefono`

**Descripción:** La aplicación permitía ingresar letras en el campo teléfono.

**Cambio requerido:** Validar que el valor contenga exclusivamente dígitos del 0 al 9 y rechazar los valores vacíos o que contengan otros caracteres.

**Elementos afectados:**

- `src/script.js`
- `tests/test_validacion.js`
- `docs/manual_usuario.md`
- `docs/manual_tecnico.md`
- `docs/plan_pruebas.md`
- `docs/registro_cambios.md`

## 5. Historial de versiones

| Versión | Estado | Descripción | Referencia |
|---|---|---|---|
| v1.0 | Línea base registrada | Versión inicial del gestor de clientes. | Commit inicial y tag `v1.0` |
| v1.1 | En preparación | Incorporación de la validación del teléfono y actualización de pruebas y documentación. | Ticket #101 |

La versión v1.1 permanecerá en preparación hasta que la corrección se integre en `main` y se publique la etiqueta y Release correspondientes.

## 6. Trazabilidad y control de cambios

El proceso previsto para la corrección es:

1. Registrar el defecto en un Issue de GitHub.
2. Crear la rama `fix-validacion-telefono`.
3. Modificar la función de validación y las pruebas automatizadas.
4. Actualizar los documentos afectados.
5. Crear commits descriptivos vinculados al ticket.
6. Publicar la rama y abrir una Pull Request.
7. Integrar los cambios en `main` después de revisarlos.
8. Crear y publicar la versión v1.1.

Este procedimiento permite identificar qué cambió, por qué se cambió y cómo se verificó la solución.

## 7. Estado actual

La función de validación se modificó para aceptar únicamente cadenas compuestas por dígitos. Las pruebas automatizadas se ejecutaron después del cambio.

La rama de trabajo todavía debe completar el registro de los commits, la Pull Request y la integración con la rama principal. La versión v1.1 aún no se considera publicada.