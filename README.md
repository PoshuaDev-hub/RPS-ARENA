# RPS COMBATE 🚀 

**RPS COMBATE** es una aplicación web de alto impacto visual basada en el clásico juego de "Piedra, Papel o Tijera". Con una estética **Cyberpunk/Espacial**, el proyecto se enfoca en ofrecer una experiencia de usuario (UX) inmersiva mediante el uso de geometría radial, feedback auditivo y estados visuales dinámicos.

Este proyecto demuestra habilidades en desarrollo Frontend moderno, gestión de estados en JavaScript y optimización de interfaces para dispositivos móviles.

---

## ✨ Características Principales

* **Arquitectura Radial:** Diseño de arena de combate con intersección geométrica de esferas al 50%.
* **Temas Dinámicos:** La interfaz muta cromáticamente según el turno (Cian para J1, Naranja Neón para J2).
* **Feedback Inmersivo:** * **Audio:** Efectos de sonido diferenciados para victorias y empates (Web Audio API).
* **Háptico:** Soporte para vibración en dispositivos móviles Android.
* **Motor Visual:** Fondo estelar animado desarrollado con **HTML5 Canvas** y generación aleatoria de estrellas fugaces.
* **Aura Reactiva:** Núcleo central con animación de rotación infinita que sincroniza su color con el badge del jugador activo mediante la pseudoclase `:has()`.

## 🛠️ Stack Tecnológico

* **HTML5:** Estructura semántica.
* **CSS3 Pro:** Flexbox, Variables (Custom Properties), Animaciones Keyframes y selectores de estado avanzados.
* **JavaScript (ES6+):** Inyección dinámica de SVGs, lógica de arbitraje y motor de partículas.

## 📁 Estructura del Proyecto

├── assets/
│   ├── win.mp3      # Efecto de sonido para victoria
│   └── tie.mp3      # Efecto de sonido para empate
├── index.html       # Esqueleto y estructura de vistas
├── style.css        # Motor de diseño y estilos neón
└── script.js        # Lógica de juego, efectos y audio