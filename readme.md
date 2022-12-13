# IMMBakend Node js

## Contenido

Este proyecto contiene las siguientes ramas:

1. `main` contiene el codigo y se subira para produccion.
2. `develop` contiene el codigo y se subira las pruebas para el desarrollo.
3. Cada devopler tendra una rama con su `nombre`, en la cual subiran sus cambios.

## Requerimientos

Version Node 14.\* :

> https://nodejs.org/en/

## Inicializar proyecto

- Instar las dependencias (El la raiz del proyecto) con el comando:

```
npm install
```

- Crear archivo .env:
 agregar en el .env
 
 PORT=8000
SECRET_KEY='secret'
MY_SQL='127.0.0.1'
# 'http://localhost/'
MY_SQL_USER='root'
MY_SQL_PASSWORD=
MY_SQL_DB="tenancy_demo"


```python
  imm-bakend\
    ...
    .env  # arhicvo .env
    app.js
    ...
```

- Dentro de el archivo .env declarar las variables de entorno

```js
PORT = 8000;
```

- Luego para correr el proyecto usar el comando en el entorno de desarrollo:

```
  npm run dev
```

### Notes

- La version usar de node es 14.\* o superior.
- Debe tener instalado npm.
- Todas las dependicas se encuentra en el package.json.
