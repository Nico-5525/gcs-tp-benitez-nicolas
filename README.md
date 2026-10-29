# Gestor de Clientes

Aplicación web para registrar, consultar, modificar y eliminar clientes. Este proyecto se utiliza como base del Trabajo Práctico de **Gestión de la Configuración del Software (GCS)** para practicar el control de versiones y la gestión de cambios con Git y GitHub.

## Funcionalidades

- Alta, consulta, modificación y eliminación de clientes.
- Datos del cliente: nombre, apellido, correo electrónico, teléfono, empresa, estado y notas.
- Búsqueda de clientes por nombre, apellido, empresa, correo electrónico o teléfono.
- Filtro por estado: activo, prospecto o inactivo.
- Tarjetas de resumen con el total de clientes y la cantidad por estado.
- Almacenamiento local en el navegador mediante `localStorage`.
- Pruebas automatizadas de funciones de JavaScript con Node.js.

## Tecnologías

- HTML5, CSS3 y JavaScript.
- `localStorage` para conservar los registros en el navegador.
- Node.js y el módulo integrado `node:test` para las pruebas.
- Git y GitHub para el control de versiones y la trazabilidad de cambios.

## Cómo ejecutar la aplicación

1. Descargar o clonar el repositorio.
2. Abrir `src/index.html` en un navegador moderno. También se puede utilizar la extensión Live Server de Visual Studio Code.
3. Cargar clientes desde el formulario y probar las funciones de búsqueda, filtrado, edición y eliminación.

Los datos se guardan en el navegador y no se sincronizan automáticamente entre dispositivos o navegadores.

## Cómo ejecutar las pruebas

Se necesita tener Node.js instalado. Desde la carpeta raíz del proyecto, ejecutar:

```bash
node --test tests/test_validacion.js
```

## Estructura del repositorio

```text
gcs-tp-benitez-nicolas/
├── README.md
├── .gitignore
├── src/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── tests/
│   └── test_validacion.js
└── docs/
    ├── README.md
    ├── manual_usuario.md
    ├── manual_tecnico.md
    ├── plan_pruebas.md
    └── registro_cambios.md
```

## Documentación

- [Índice de documentación](docs/README.md)
- [Manual de usuario](docs/manual_usuario.md)
- [Manual técnico](docs/manual_tecnico.md)
- [Plan de pruebas](docs/plan_pruebas.md)
- [Registro de cambios y elementos de configuración](docs/registro_cambios.md)


