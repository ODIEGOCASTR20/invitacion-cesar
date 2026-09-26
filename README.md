# Invitación de cumpleaños — Julio César Pérez Coronel (41 años)

## 1. Antes de publicar

### 1.1 Pega la URL del backend
Abre `script.js` y busca esta línea, cerca del inicio:

```javascript
backendURL: "AQUI_COLOCAR_URL_DE_GOOGLE_APPS_SCRIPT",
```

Reemplázala por la URL de tu Web App de Google Apps Script (la que copiaste en el Paso 5 de la configuración del backend). Debe verse así:

```javascript
backendURL: "https://script.google.com/macros/s/AKfycb.../exec",
```

### 1.2 Coloca tus archivos
Copia tus 8 fotos dentro de la carpeta `assets/img/` con estos nombres exactos:
```
foto1.jpg  foto2.jpg  foto3.jpg  foto4.jpg
foto5.jpg  foto6.jpg  foto7.jpg  foto8.jpg
```

Copia tu archivo de música dentro de `assets/music/` con este nombre exacto:
```
mix-que-viva-el-santo.mp3
```

(El elemento `hero-lata` en el HTML es opcional — si no tienes una imagen `assets/img/lata.png`, simplemente no se mostrará, no genera ningún error.)

## 2. Publicar en GitHub Pages

1. Ve a [github.com](https://github.com) e inicia sesión.
2. Clic en el botón **+** (arriba a la derecha) → **New repository**.
3. Nombra el repositorio: `invitacion-cesar` → márcalo como **Public** → clic en **Create repository**.
4. En la página del repositorio recién creado, clic en **uploading an existing file** (o "Add file" → "Upload files").
5. Arrastra **todos** los archivos y carpetas de este proyecto (`index.html`, `style.css`, `script.js`, la carpeta `assets` completa con tus fotos y tu mp3 ya dentro, y este `README.md`).
6. Abajo, clic en **Commit changes**.
7. Ve a la pestaña **Settings** del repositorio (arriba).
8. En el menú lateral izquierdo, clic en **Pages**.
9. En "Branch", selecciona **main** y la carpeta **/ (root)** → clic en **Save**.
10. Espera 1-2 minutos y recarga la página. Arriba te mostrará un mensaje: **"Your site is live at https://tu-usuario.github.io/invitacion-cesar/"**.

Esa es la URL única que compartirás con los invitados. Ábrela desde tu celular para probarla antes de enviarla.

## 3. Cómo modificar los datos del evento

Todo lo que puedes necesitar cambiar (nombre, fecha, hora, lugar, link de mapa, segundo de inicio de la música) está en un solo lugar: el objeto `CONFIG` al inicio de `script.js`. Cambia el valor entre comillas y vuelve a subir el archivo a GitHub (Add file → Upload files, sobrescribe el existente).

## 4. Cómo revisar las confirmaciones (RSVP)

1. Abre tu Google Sheet **"Invitación César - Datos"**.
2. Ve a la pestaña **RSVP**. Ahí verás una fila por cada familia que confirmó o no, con fecha y hora.

## 5. Cómo revisar / moderar las fotografías del muro

1. En la misma Google Sheet, ve a la pestaña **Recuerdos**. Cada fila tiene: fecha, familia, mensaje, el link de la foto en Drive, y una columna **Aprobado**.
2. Por defecto, todo se publica automáticamente (columna Aprobado = TRUE), tal como pediste.
3. Si en algún momento quieres ocultar un recuerdo del muro público (por ejemplo, contenido inapropiado), simplemente cambia esa celda de `TRUE` a `FALSE` en la hoja — desaparecerá del muro la próxima vez que alguien recargue la página. No necesitas tocar código.

## 6. Cómo descargar las fotografías para conservarlas

1. Abre [Google Drive](https://drive.google.com).
2. Busca la carpeta **"Fotos Cumpleaños César 41"** (Apps Script la crea automáticamente).
3. Selecciona todas las fotos (Ctrl+A / Cmd+A dentro de la carpeta).
4. Clic derecho → **Descargar**. Drive las comprimirá en un archivo .zip que se descargará a tu computadora.

## 7. Estructura del proyecto

```
invitacion-cesar/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── img/
    │   ├── foto1.jpg ... foto8.jpg
    │   └── lata.png (opcional)
    └── music/
        └── mix-que-viva-el-santo.mp3
```
