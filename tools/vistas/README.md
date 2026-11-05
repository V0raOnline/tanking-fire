# Vistas de alambre

Genera las cuatro vistas de un vehículo (lateral, lateral izquierda, frontal y superior) a partir de un modelo 3D descargado de Sketchfab, con el mismo estilo que las del juego: alambre blanco con líneas ocultas, fondo transparente, 640 px de ancho.

## Instalar (una vez)

Hace falta [Node.js](https://nodejs.org) 18 o posterior. Desde esta carpeta:

```
npm install
npx playwright install chromium
```

## Usar

```
node vistas.js "C:\ruta\al\modelo.glb" panther
```

Escribe en `salida/`:

- `panther.webp` cañón a la derecha (tu tanque)
- `panther_left.webp` cañón a la izquierda (el rival)
- `panther_front.webp` vista frontal
- `panther_top.webp` vista superior, cañón a la izquierda
- `panther_hoja.png` las cuatro juntas para revisarlas

y muestra las proporciones para copiarlas en `index.html`. Con `--out ..\..\img` las escribe directamente en `img/`.

Vale tanto un `.glb` como un `.gltf` (con su `.bin` en la misma carpeta). Las texturas no hacen falta.

## Si algo sale mal

- **El tanque sale mirando hacia otro lado o de lado en la vista frontal:** el modelo no tiene el frente hacia +Z. Prueba `--rotY 90`, `--rotY -90` o `--rotY 180`.
- **El trazo es muy fino o muy grueso:** `--gamma` controla la intensidad (0.6 por defecto; menos es más grueso).
- **Salen piezas sueltas** (proyectiles de exposición, peanas, accesorios flotando): `--list` muestra cada pieza con el grupo al que pertenece y su caja, ya girada (el largo es z y el frente es +z). Localiza las que sobran y vuelve a generar con `--hide` y sus nombres o los de su grupo, separados por comas. Ejemplo del Churchill:
  ```
  node vistas.js modelo.glb churchill --rotY 90 --list
  node vistas.js modelo.glb churchill --rotY 90 --hide 57x441_6,shell_7,case_8,truck_39
  ```
- **La vista sale vacía:** el modelo puede venir en otras unidades o tener piezas muy alejadas (por ejemplo una base o un suelo). Mira las medidas que imprime al empezar.

Los modelos descargados no se suben al repositorio (`tools/vistas/salida/` y `node_modules/` están en `.gitignore`). Apunta siempre el crédito del autor en `CREDITS.md` y en la sección Créditos del manual (`CREDIT_MODELS` en `index.html`).
