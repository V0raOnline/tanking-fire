# Estado del proyecto

Resumen para retomar el trabajo en otra sesión. Última actualización: 4 de noviembre de 2026.

## Dónde está todo

- **Repositorio:** `V0raOnline/tanking-fire` (público; se llamaba `linea-de-fuego` hasta el 5 de noviembre de 2026, y GitHub redirige el nombre antiguo; la carpeta local sigue llamándose `linea-de-fuego`), rama `main`. El historial se rehízo el 5 de noviembre de 2026 al hacer público el repo; la copia completa del historial anterior la guarda V0ra fuera del repo.
- **Versión publicada:** https://claude.ai/artifact/ThjBb73rzALaH99XwxfdTp (privada; para enseñarla, en el menú Share elegir «cualquiera con el enlace»). Al republicar hay que mandar también las imágenes nuevas o cambiadas de `img/`.
- **Copia duplicada por error:** https://claude.ai/artifact/De5SWjfj8uQdtcNQcFpZir. Se puede borrar.
- **El juego:** todo en `index.html`. Se abre con un servidor local (`jugar.bat` o `python -m http.server 8790`), no con doble clic. Detalles en `README.md`.
- **Créditos y licencias:** `CREDITS.md` y la sección «Créditos» del manual de campaña (`CREDIT_MODELS` en `index.html`).

## Qué hay hecho

El juego completo está descrito en `README.md`. Lo principal:

- **Partida:** combinaciones de póker con dados, frente de 7 sectores, averías por pieza, órdenes de apoyo en tarjetas perforadas y niveles 0–5.
- **Modos y batallas:** cuatro batallas históricas con regla propia (Villers-Bocage, Cota 112, Remagen, Berlín) y modo Ofensiva.
- **Tablero:** en dos pasos (cargar la formación y disparar); las órdenes del rival van boca abajo.
- **Presentación:** balística animada, zoom de impacto, ficha técnica y manual en papel con capturas.
- **Sonido:** música y efectos.
- **Estadísticas:** se guardan en el navegador.

### Modelos 3D con licencia clara (noviembre de 2026)

Los esquemas de alambre antiguos venían de modelos sin una licencia clara para redistribuirlos. Los estamos sustituyendo por modelos de Sketchfab con licencia **CC BY 4.0**, revisados uno a uno: licencia, descarga permitida, descripción y perfil del autor.

| Vehículo | Estado | Modelo | Autor |
|---|---|---|---|
| IS-2 | ✅ en el juego y en créditos | [IS2 Heavy Tank](https://skfb.ly/6AGwO) | adrielcz |
| Tiger I | ✅ en el juego y en créditos | [WW2 German Tiger](https://skfb.ly/pzQxu) | gabriel.pronovost09 |
| Jagdtiger | ✅ en el juego y en créditos | [Panzerjäger Tiger Ausf. B 'Jagdtiger' Tank](https://skfb.ly/6uM6Q) | jpo1703 |
| M4A3E2 Jumbo | ⚠️ esquema provisional; buscando un modelo con licencia clara | — | — |
| Panther | ✅ jugable, en el juego y en créditos | [SdKfz171 PzKpfw V AusfG Panther](https://skfb.ly/6XsXn) | Andreoid |
| Panzer IV H | ✅ jugable, en el juego y en créditos | [Panzer IV H ( Ohne Schürtzen )](https://skfb.ly/oOZKC) | CloudHubOmniTeam |
| Churchill VII | ✅ jugable · ⏳ falta captura de créditos | [low-poly Churchill Mk. VII](https://sketchfab.com/3d-models/low-poly-churchill-mk-vii-ac032b8154f941a99914ba8679109064) | D_U |
| T-34/85 | ✅ jugable · ⏳ falta captura de créditos | [T34-85 with Mesh-Wire Shields](https://sketchfab.com/3d-models/t34-85-with-mesh-wire-shields-e13b0b006d924092b78113b25f3303c2) | joeshu |
| Cromwell | ✅ jugable · ⏳ falta captura de créditos | [Cromwell MK IV](https://sketchfab.com/3d-models/cromwell-mk-iv-373a8bb8189b42a690a51d41170280d1) | rks.sdsk |
| Sherman Firefly | ✅ jugable · ⏳ falta captura de créditos | [M4 Sherman Firefly](https://sketchfab.com/3d-models/m4-sherman-firefly-c903938af7f347dc9c64cda035e9f7ab) | barking_dogo |
| Tiger II | ✅ jugable · ⏳ falta captura de créditos | [Tiger II H (Königstiger)](https://sketchfab.com/3d-models/tiger-ii-h-konigstiger-f33fc5fbaef04727b4f9b9a1230084d6) | Pechacek |
| M26 Pershing | ✅ jugable · ⏳ falta captura de créditos | [M26 Pershing "Eagle 7" tank model V2](https://sketchfab.com/3d-models/m26-pershing-eagle-7-tank-model-v2-7a90f9f5250a4ab28c744684e7055558) | Artemis03 |

Mientras falte la captura (`img/creditos/<id>.webp`), la sección Créditos muestra solo el esquema; al añadir el archivo aparece sola, sin tocar el código. Ids: `churchill`, `t34`, `cromwell`, `firefly`, `tiger2`, `pershing`.

En la sección de créditos, cada vehículo muestra una captura tres cuartos del modelo tal como lo publica su autor (`img/creditos/`, 480 px), con el esquema del juego al lado.

**Criterio:** descartar a quien se declara extractor de modelos de juegos o sube modelos con títulos de juegos, las series sin indicios de autoría propia y siempre las licencias NC (no comercial) y ND (sin obras derivadas). La lista de autores descartados la guarda V0ra fuera del repo.

## Cómo añadir o cambiar un vehículo

1. Descargar el modelo de Sketchfab en **GLB** (o glTF: basta con `scene.gltf` y `scene.bin`; las texturas no hacen falta). Pulsar «COPY CREDITS» y guardar el texto.
2. Generar las vistas con `tools/vistas` (instrucciones en `tools/vistas/README.md`):
   ```
   cd tools/vistas
   node vistas.js "ruta/al/modelo.glb" panther --out ../../img
   ```
   Revisar `panther_hoja.png`. Si el tanque sale girado, repetir con `--rotY 90`, `-90` o `180`.
3. En `index.html`:
   - `VEHICLES`: añadir o actualizar `img`, `ratio` y los puntos de impacto `pts` (gun, canon, optica, motor, oruga, en fracciones de la imagen), también en `left`.
   - `VIEWS`: vistas `top` y `front` con su `ratio` y los puntos de impacto.
   - `DIMS` y `SPECS`: medidas y datos históricos para la ficha técnica.
   - `BALL`: velocidad en boca y munición.
   - `CREDIT_MODELS`: crédito en el manual.
4. Captura tres cuartos del modelo en Sketchfab (sin cursor ni interfaz), recortada a 480 px en `img/creditos/<id>.webp`.
5. Crédito en `CREDITS.md`.
6. Probar en el navegador (tablero, zoom de impacto, ficha y manual), hacer commit y push, y republicar el artefacto con las imágenes nuevas.

## Siguientes pasos

0. **Publicar en GitHub Pages.** Hecho el 5 de noviembre de 2026: repo renombrado a `tanking-fire`, `LICENSE` (PolyForm Noncommercial 1.0.0), aviso de copyright al principio de `index.html` y de `tools/vistas/render.html`, metas `author`, `copyright` y `<link rel="license">`,, `<meta name="viewport">` (sin ella el móvil la veía a 980 px) y `<!doctype html>` (comprobado: `document.compatMode` = `CSS1Compat`, la partida se ve igual). Con el rebranding: `description`, Open Graph y tarjeta de Twitter (`img/og.jpg`, 1200×630) y favicon. Falta:
   - **Activar GitHub Pages:** el repo es privado; Pages con repo privado exige un plan de pago, así que habrá que hacerlo público (o pagar) para publicar.
   - **Para buscadores:** `sitemap.xml`, `robots.txt`, topics y homepage del repo, y Google Search Console. Comprobar la tarjeta al compartir con el depurador de LinkedIn o de Facebook cuando esté en Pages.
   - **Contador de visitas:** GoatCounter, cuando ya esté en Pages.
1. **Probar el equilibrio del Panther y el Panzer IV H** (jugables desde el 4 de noviembre de 2026):
   - Panther: +2 dados, blindaje 2, Motor; «Cañón largo»: la Munición perforante le da 1 dado más. Villers-Bocage, Cota 112 y Remagen (también estuvo en Berlín; se puede añadir).
   - Panzer IV H: +1 dado, blindaje 1, Radio; «Caballo de batalla»: roba hasta 8 cartas. Las cuatro batallas.
   - Vistas: `panther` con `--rotY 180`; `panzer4` sin girar. En Ofensiva van primero en `CHRONO` por fecha de servicio (Panzer IV, Tiger, Panther, IS-2, Jumbo, Jagdtiger).
2. **Versión en inglés.** El rebranding a «TANKING... FIRE!» (lema «Tactical Card War Game»; *tanking* es pensarse mucho la mano en el póker) está hecho desde el 5 de noviembre de 2026: título, menú con el logo (`img/logo.webp`), tablero, metas, README, CREDITS, `jugar.bat`, imagen Open Graph, favicon e iconos. Originales del arte en `img/art/`. Falta poner `img/art/logo-escudo.png` como avatar donde se quiera (redes, perfil).
   - **Inglés:** sacar todos los textos a un diccionario `ES`/`EN` dentro de `index.html`, sin compilación. Selector de idioma en el menú: por defecto, el idioma del navegador; si no es español, inglés; y recordar la elección. Traducir con criterio de juego: decidir los nombres en inglés de las manos («Ofensiva general»…) y de los palos. Las frases que se generan con código, como la de los rivales con los números en letras, hay que reescribirlas, no solo traducirlas.
   - **Antes de empezar, decidir:** el alcance (todo, o primero la interfaz y el manual en una segunda fase) y en qué idioma nace el juego.
3. **Probar el equilibrio de los seis nuevos** (jugables desde el 4 de noviembre de 2026; datos de la ficha sacados de cifras públicas, revisarlos):

   | Vehículo | Dados | Blindaje | Palo | Rasgo | Batallas |
   |---|---|---|---|---|---|
   | Churchill VII | +1 | 3 | Blindaje | Todoterreno: la oruga averiada no le impide perseguir ni replegarse | Cota 112 |
   | T-34/85 | +1 | 1 | Motor | Ágil: cambia hasta 5 cartas | Berlín |
   | Cromwell | +1 | 1 | Motor | Rápido: a más de 1000 m su blindaje cuenta 1 más | Villers-Bocage |
   | Sherman Firefly | +2 | 1 | Munición | 17 libras: el blindaje del rival cuenta 1 menos | Villers-Bocage y Cota 112 |
   | Tiger II | +2 | 3 | Blindaje | Mecánica delicada: con el motor averiado roba 3 menos | Berlín |
   | M26 Pershing | +2 | 2 | Blindaje | Munición HVAP: una orden inicial es siempre Munición perforante | Remagen |

   En la Ofensiva, quien juega con el Eje tiene ahora siete rivales aliados en vez de dos; vigilar si se hace demasiado larga.
4. **M4 Sherman de barking_dogo** (`m4sherman`): descargado como base para un Jumbo con licencia limpia; no está en el juego.
5. **M4A3E2 Jumbo:** no hay ningún modelo CC BY en Sketchfab. Opciones:
   - Comprobar la licencia del [Jumbo de manifold_destiny en Thingiverse](https://www.thingiverse.com/thing:1065360), que es una modificación del M4A3 de m_bergman; hay que mirar también la licencia del original.
   - Si no sirve, partir del [M4 Sherman de barking_dogo](https://sketchfab.com/3d-models/m4-sherman-8766b7d04637437e884c511f89126a98) (CC BY) y añadirle el blindaje del Jumbo.
6. **Enviar un mensaje a los autores** cuando se publique, con el enlace al juego y a la sección Créditos.
7. **Licencia:** decidida, PolyForm Noncommercial 1.0.0 (`LICENSE`): nadie más puede sacar beneficio, Ko-fi está permitido y queda abierta la venta en el futuro. Si hay colaboradores externos, añadir un acuerdo de contribución (CLA).
8. **Música:** Google Flow Music no publica una concesión clara de uso comercial en el plan gratuito. Confirmarlo por escrito antes de cualquier uso comercial (nota en `README.md`).

### Candidatos revisados para los vehículos que faltan

Todos con licencia CC BY y descarga permitida en noviembre de 2026. Hay que volver a comprobarlo antes de usarlos.

Primeras opciones descargadas el 4 de noviembre de 2026, tras volver a comprobar la licencia (CC BY 4.0) y la descarga. Están en `modelos/`, en GLB con texturas de 1k:

Vistas generadas y revisadas (hojas en `tools/vistas/salida/`, aún no copiadas a `img/`):

| Vehículo | Archivo | id | Opciones de `vistas.js` |
|---|---|---|---|
| Sherman Firefly | `m4_sherman_firefly.glb` | `firefly` | — |
| T-34/85 | `t34-85_with_mesh-wire_shields.glb` | `t34` | `--rotY 90` |
| Tiger II | `tiger_ii_h_konigstiger.glb` | `tiger2` | — |
| Churchill | `low-poly_churchill_mk._vii.glb` | `churchill` | `--rotY 90 --hide 57x441_6,shell_7,case_8,truck_39` (proyectiles sueltos y una pieza delante del morro) |
| Cromwell | `cromwell_mk_iv.glb` | `cromwell` | `--rotY 180` |
| M26 Pershing | `m26_pershing_eagle_7_tank_model_v2.glb` | `pershing` | `--rotY 90` |
| Base del Jumbo | `m4_sherman.glb` ([M4 Sherman](https://sketchfab.com/3d-models/m4-sherman-8766b7d04637437e884c511f89126a98), barking_dogo) | `m4sherman` | — |

| Vehículo | Primera opción | Alternativa |
|---|---|---|
| Panzer IV H | [Panzer IV H (Ohne Schürzen)](https://sketchfab.com/3d-models/panzer-iv-h-ohne-schurtzen-d3708cb84ac041a3846bc7c043a0fe06), cloudhub | [Medium Tank II](https://sketchfab.com/3d-models/medium-tank-ii-6a02e703097d41aeb5cb6ae9f0b901e6), Omegakure (bajo detalle) |
| Sherman Firefly | [M4 Sherman Firefly](https://sketchfab.com/3d-models/m4-sherman-firefly-c903938af7f347dc9c64cda035e9f7ab), barking_dogo | — |
| T-34/85 | [T34-85 with Mesh-Wire Shields](https://sketchfab.com/3d-models/t34-85-with-mesh-wire-shields-e13b0b006d924092b78113b25f3303c2), joeshu (versión de Berlín) | [T-34-85](https://sketchfab.com/3d-models/t-34-85-soviet-tank-58d1ec1a786f4065a504da5ccf6fc7b5), Federico.Oviedo |
| Tiger II | [Tiger II H (Königstiger)](https://sketchfab.com/3d-models/tiger-ii-h-konigstiger-f33fc5fbaef04727b4f9b9a1230084d6), Pechacek | [Henschel Tiger II](https://sketchfab.com/3d-models/tank-pzkpfwvi-ausfb-henschel-tiger-ii-f3fe1d22f3bb4528af3b152917daa65b), Stafford |
| Churchill | [low-poly Churchill Mk. VII](https://sketchfab.com/3d-models/low-poly-churchill-mk-vii-ac032b8154f941a99914ba8679109064), D_U | [Churchill Heavy Tank](https://sketchfab.com/3d-models/churchill-heavy-tank-0a4b9b943d3549bda54d4c6b42a174ae), HolySandal |
| Cromwell | [Cromwell MK IV](https://sketchfab.com/3d-models/cromwell-mk-iv-373a8bb8189b42a690a51d41170280d1), rks.sdsk | [British Cromwell Tank WW2](https://sketchfab.com/3d-models/british-cromwell-tank-ww2-36f79ad704ad4c7abd60b0b093bc5252), neekogoodman505 |
| M26 Pershing | [M26 Pershing "Eagle 7" V2](https://sketchfab.com/3d-models/m26-pershing-eagle-7-tank-model-v2-7a90f9f5250a4ab28c744684e7055558), Artemis03 | [M26Pershing](https://sketchfab.com/3d-models/m26pershing-a2b0191b6eb64f3f9ba185c5a14c170c), bruno.s.sherman |

## Decisiones pendientes

- **Estilo de la ficha técnica:** todo en papel o mixto, con los datos históricos en papel y el estado del tanque en el panel oscuro. La recomendación era papel en el fin de batalla y mixto en la ficha.
- **Jumbo:** si los datos pasan al cañón de 76 mm del modelo.
- **Recluta:** si las órdenes del rival se muestran boca arriba en el nivel 1.
- **Equilibrio:** pendiente de lo que salga de las partidas de prueba.
