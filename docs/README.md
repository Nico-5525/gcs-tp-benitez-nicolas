# Documentación del proyecto — Gestor de Clientes

Este documento presenta la documentación que acompaña al Gestor de Clientes y resume cómo ejecutar el sistema. La descripción pública breve del repositorio se encuentra en el `README.md` de la raíz.

## Documentos

| Archivo | Contenido |
|---|---|
| [`manual_usuario.md`](manual_usuario.md) | Instrucciones para usar el formulario, la tabla, la búsqueda, los filtros y las operaciones ABM. |
| [`manual_tecnico.md`](manual_tecnico.md) | Tecnologías, estructura, modelo de datos y funciones principales. |
| [`plan_pruebas.md`](plan_pruebas.md) | Casos funcionales manuales, pruebas automatizadas actuales y pruebas previstas para la corrección. |
| [`registro_cambios.md`](registro_cambios.md) | Elementos de configuración, solicitud de cambio, versiones y trazabilidad. |

## Descripción general

Gestor de Clientes es una aplicación web desarrollada con HTML, CSS y JavaScript. Permite administrar clientes y conservar los registros en `localStorage` del navegador. Incluye datos de contacto, empresa, estado y notas; búsqueda, filtros por estado y tarjetas de resumen.

## Requisitos

- Navegador web actualizado.
- Node.js instalado para ejecutar las pruebas automatizadas.
- No requiere una base de datos ni instalar dependencias de Node para ejecutar las pruebas actuales.

## Ejecución

Abrir `src/index.html` en el navegador o utilizar Live Server desde Visual Studio Code.

Desde la raíz del repositorio, ejecutar las pruebas con:

```bash
node --test tests/test_validacion.js
```
