# TODO LIST

## Instrucciones de Ejecución

### Frontend

1. Navega al directorio del frontend:
```
   cd /todo-list-frontend
```

2. Instala las dependencias:
```
   npm install
```

3. Ejecuta el servidor de desarrollo:
```
   npm run dev
```

### Backend

1. Navega al directorio del backend:
```
   cd /todo-list-backend
```

2. Instala las dependencias:
```
   npm install
```

3. Ejecuta el servidor:
```
   npm run start
```

### Base de Datos

1. Para iniciar la base de datos, ejecuta el archivo de shell de Docker:
```
   ./start-db.sh
```

2. Crea un archivo `.env` en el directorio del backend con el siguiente contenido:
```
   DB_NAME=TODOLISTDB
   DB_USER=SONPIPE
   DB_PASSWORD=ADMIN
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=YOUR SECRET
```

