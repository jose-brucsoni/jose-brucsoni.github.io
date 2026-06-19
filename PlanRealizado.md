Plan: Responsive, tipografía profesional y rojo vino

Diagnóstico del desborde

La sección reportada en [index.html](index.html) (líneas 232-265) usa este patrón:

<div class="flex items-center gap-4">
  <i class="ti-layers-alt text-4xl text-primary"></i>
  <div>
    <p class="text-3xl font-bold text-primary">+10</p>
    <p class="text-sm text-gray-400">Usuarios Activos en DANTE</p>
  </div>
</div>

Causas del overflow en móvil:





grid-cols-2 deja ~180-220px por celda en pantallas de 360-414px



flex horizontal con icono fijo (text-4xl) + texto largo sin min-w-0 ni break-words



Labels como "Usuarios Activos en DANTE" y "Reportes Automatizados" no caben en una línea



gap-8 es amplio para celdas pequeñas



No hay overflow-x-hidden global en body

Otros puntos de riesgo detectados:





Hero: subtítulo con tracking-widest uppercase y texto muy largo (línea 33)



Hero: text-5xl / lg:text-8xl sin break-words



Hero: iconos sociales en absolute top-6 right-6 pueden solaparse con el título en móvil estrecho



Navbar: nombre completo "José Carlo Suárez Brucsoni" visible desde sm:block



About: URLs largas de LinkedIn sin break-all



Experiencia: listas list-inside con bullets que empujan el texto



hero-bg: background-attachment: fixed causa problemas visuales en iOS/móvil

Inconsistencia tipográfica actual: [src/input.css](src/input.css) declara "Source Sans Pro" pero [index.html](index.html) carga Source Sans 3 y Dosis — las fuentes no coinciden con el CSS.



1. Nueva paleta: rojo vino elegante

Actualizar tokens en [src/input.css](src/input.css):







Token



Actual



Propuesto





--color-primary



#f85c70



#6B2D3B (burgundy/vino)





--color-primary-dark



#e04a5e



#4E1F28 (hover/pressed)





--color-primary-light



(nuevo)



#8B3A4A (acentos suaves, badges)

También actualizar colores hardcodeados en [assets/css/cv-pdf.css](assets/css/cv-pdf.css) (#dc3545 → #6B2D3B) para que el PDF descargable coincida con el sitio.



2. Tipografía profesional

Reemplazar Dosis + Source Sans 3 por un par más corporativo:





Cuerpo: Inter — legible, neutral, estándar en portfolios tech



Títulos: Plus Jakarta Sans — moderna y profesional sin ser genérica

Cambios:





[index.html](index.html) y [portafolio.html](portafolio.html): actualizar <link> de Google Fonts



[src/input.css](src/input.css):

--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
--font-display: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;

Ajustes de legibilidad en @layer base:





body: text-base leading-relaxed



Headings: tracking-tight (quitar tracking-widest del hero subtitle)



3. Correcciones responsive globales

En [src/input.css](src/input.css) @layer base:

html, body {
  overflow-x: hidden;
  max-width: 100%;
}

Nuevo componente .stat-card para la sección de métricas:

.stat-card {
  @apply flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 p-3 sm:p-0;
}
.stat-card i {
  @apply text-2xl sm:text-3xl shrink-0 text-primary;
}
.stat-card-content {
  @apply min-w-0 flex-1;
}
.stat-card-value {
  @apply text-2xl sm:text-3xl font-bold text-primary leading-none;
}
.stat-card-label {
  @apply text-xs sm:text-sm text-gray-400 leading-snug break-words;
}



4. Sección Stats (prioridad)

En [index.html](index.html) líneas 232-265, cambiar:







Antes



Después





grid grid-cols-2 lg:grid-cols-4 gap-8



grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8





flex items-center gap-4



stat-card





text-3xl en valores



stat-card-value (escala responsive)





text-sm en labels



stat-card-label con break-words

En móvil muy estrecho (<400px): 1 columna evita el apretujamiento; desde sm vuelve a 2 columnas.

Textos acortados opcionales si aún hay tensión:





"Usuarios Activos en DANTE" → "Usuarios en DANTE"



"Reportes Automatizados" → "Reportes Automatizados" (con break-words debería bastar)



5. Auditoría responsive del resto de [index.html](index.html)

Hero (líneas 21-42)





Reducir escala: text-4xl sm:text-5xl md:text-6xl lg:text-7xl (eliminar text-8xl)



Subtítulo: quitar tracking-widest uppercase; usar text-sm sm:text-base md:text-lg normal-case leading-relaxed



Social icons: mover debajo del CTA en móvil (flex en lugar de absolute) o usar top-4 right-4 con flex-wrap



hero-bg: cambiar background-attachment: fixed → scroll en @media (max-width: 768px) para iOS

Navbar (líneas 46-71)





Nombre en brand: truncar con truncate max-w-[140px] sm:max-w-none o mostrar solo "J. Brucsoni" en < sm

Experiencia / cards (sección #resume)





Listas: cambiar list-inside → list-outside pl-4 para evitar indentación que rompe el layout



card-panel: añadir overflow-hidden y break-words

About (sección #about)





Enlaces largos: clase break-all o break-words en <a>



Grid: ya es lg:grid-cols-3; verificar gap-6 en móvil

Logros y Servicios





Grids ya usan md:grid-cols-2 lg:grid-cols-3 — añadir min-w-0 en cards

Footer / Portafolio CTA





Verificar que botones no excedan viewport: w-full sm:w-auto en móvil si hace falta



6. [portafolio.html](portafolio.html)

Aplicar mismos tokens (fonts + colores vía main.css tras rebuild). Revisar:





Títulos de proyecto largos: text-lg sm:text-xl break-words



Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 (ya correcto)



Botones GitHub: w-full sm:w-auto justify-center



7. Build y verificación

npm run build

Probar manualmente en estos anchos:





320px (iPhone SE)



375px (iPhone estándar)



768px (tablet)



925px (ancho reportado por el usuario)



1280px+ (desktop)

Checklist:





Sin scroll horizontal en ninguna sección



Stats legibles en 2 columnas desde sm



Hero sin solapamiento de iconos



Color vino consistente en botones, barras de skill, bordes y CV PDF



Tipografía cargada correctamente (sin fallback a sistema)

flowchart TD
    A[src/input.css tokens] --> B[npm run build]
    C[index.html responsive fixes] --> B
    D[portafolio.html fixes] --> B
    E[cv-pdf.css wine colors] --> B
    B --> F[Test 320px to 1280px]



Archivos a modificar





[src/input.css](src/input.css) — colores, fuentes, overflow global, componentes stat-card, hero mobile fix



[index.html](index.html) — stats, hero, navbar, listas, enlaces



[portafolio.html](portafolio.html) — tipografía link + ajustes menores responsive



[assets/css/cv-pdf.css](assets/css/cv-pdf.css) — sincronizar rojo vino



[assets/css/main.css](assets/css/main.css) — regenerar con npm run build

