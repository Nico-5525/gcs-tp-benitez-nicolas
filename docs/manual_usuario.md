# Manual de Usuario — Gestor de Clientes

## 1. Introducción

Gestor de Clientes es una aplicación web que permite registrar, consultar, modificar y eliminar información de clientes. También permite buscar registros, filtrar por estado y consultar un resumen de las cantidades almacenadas.

## 2. Iniciar la aplicación

1. Abrir la carpeta del proyecto.
2. Entrar en `src`.
3. Abrir `index.html` con un navegador web moderno.
4. Como alternativa, abrir el proyecto en Visual Studio Code e iniciar Live Server.

## 3. Registrar un cliente

1. En la sección **Registrar cliente**, completar nombre, apellido, correo electrónico y teléfono.
2. Si se desea, completar empresa, estado y notas.
3. Presionar **Registrar cliente**.
4. Comprobar que el registro aparezca en la tabla.

Nombre, apellido, correo y teléfono son obligatorios. El navegador comprueba el formato general del correo electrónico. El estado puede ser **Prospecto**, **Activo** o **Inactivo**; al crear un cliente, el valor inicial es Prospecto. Las notas son opcionales y admiten hasta 500 caracteres.

## 4. Consultar y buscar clientes

Los registros se muestran en la tabla **Clientes registrados**. La búsqueda permite localizar coincidencias por nombre, apellido, empresa, correo electrónico o teléfono. La búsqueda no distingue entre mayúsculas y minúsculas y normaliza las tildes; por ejemplo, se puede buscar `Nicolas` para encontrar `Nicolás`.

El selector de estado permite mostrar todos los clientes o limitar la tabla a **Activos**, **Prospectos** o **Inactivos**. Se pueden combinar el texto de búsqueda y el filtro de estado.

Las tarjetas de resumen muestran el total de clientes y la cantidad correspondiente a cada estado. Un registro antiguo que no tenga un estado válido se considera Prospecto para el filtrado y el conteo.

## 5. Modificar un cliente

1. Localizar el registro en la tabla.
2. Presionar **Editar**.
3. Modificar los campos que correspondan en el formulario.
4. Presionar **Guardar cambios**.
5. Para salir sin guardar, presionar **Cancelar edición**.

## 6. Eliminar un cliente

1. Localizar el registro.
2. Presionar **Eliminar**.
3. Leer la confirmación y aceptar para eliminarlo.
4. Si se cancela la confirmación, el registro permanece.

La eliminación afecta a los datos guardados en el navegador actual. No existe una copia de seguridad automática.

## 7. Conservación de los datos

La aplicación utiliza `localStorage` del navegador. Los registros permanecen al recargar la página o volver a abrirla en el mismo navegador y origen, salvo que se borren los datos del sitio. No se sincronizan automáticamente con otros equipos ni con otros navegadores.

## 8. Recomendaciones

- Revisar los datos antes de guardar.
- Confirmar cuidadosamente las eliminaciones.
- Evitar cargar información personal real en un entorno de práctica.
- No borrar los datos del sitio si se desea conservar los registros guardados.
