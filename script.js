// ======================================
// CONFIGURACIÓN DE LA INVITACIÓN
// ======================================
// Aquí puedes modificar los datos del evento sin buscar por todo el código.
const CONFIG = {
    nombre: "Julio César Pérez Coronel",
    edad: 41,
    fecha: "Viernes 9 de octubre de 2026",
    hora: "11:00 a. m. - 10:00 p. m.",
    lugar: "Local Monumental",
    mapa: "https://maps.app.goo.gl/QLLUrBNjexkMxuFx7?g_st=iwb",

    // Segundo en el que empieza la canción. Cambia el 0 por otro número
    // (ej. 35) si quieres que la canción arranque desde el segundo 35.
    inicioMusica: 0,

    // PEGA AQUÍ la URL del Web App de Google Apps Script (Parte 1, Paso 5)
    backendURL: "https://script.google.com/macros/s/AKfycby8Wk70bSv3yYOJzjJtK2W5ctjg_A8a8wxUQ6dK92eyzi9k6m_ZMiYqfzk1mNK0ttb8pA/exec",

    maxFamiliaLength: 30,
    maxMensajeLength: 250,

    // Tamaño máximo de imagen tras comprimir (ancho en px) y calidad JPEG
    fotoMaxAncho: 1280,
    fotoCalidad: 0.72
};

document.addEventListener("DOMContentLoaded", () => {
    initIntro();
    initScrollReveal();
    initFraseAnimada();
    initMusica();
    initCarrusel();
    initLightbox();
    initRSVP();
    initMuroRecuerdos();
});

// ======================================
// 1. INTRO (secuencia de bienvenida)
// ======================================
function initIntro() {
    const intro = document.getElementById("intro");
    const l1 = document.getElementById("intro-linea1");
    const l2 = document.getElementById("intro-linea2");
    const l3 = document.getElementById("intro-linea3");
    const l4 = document.getElementById("intro-linea4");
    const btn = document.getElementById("btn-musica-intro");

    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const espera = reducido ? 0 : 700;

    setTimeout(() => { l2.classList.remove("oculto"); }, espera * 1);
    setTimeout(() => { l3.classList.remove("oculto"); }, espera * 2);
    setTimeout(() => { l4.classList.remove("oculto"); }, espera * 3);
    setTimeout(() => { btn.classList.remove("oculto"); }, espera * 4);

    function cerrarIntro() {
        intro.classList.add("oculta");
        setTimeout(() => intro.remove(), 700);
        reproducirMusica();
    }

    btn.addEventListener("click", cerrarIntro);

    // Si el usuario hace scroll o toca la pantalla, también se cierra la intro
    // (por si prefiere no escuchar música todavía).
    let yaSeMovio = false;
    window.addEventListener("scroll", () => {
        if (!yaSeMovio && !intro.classList.contains("oculta")) {
            yaSeMovio = true;
            intro.classList.add("oculta");
            setTimeout(() => intro.remove(), 700);
        }
    }, { passive: true });
}

// ======================================
// 2. ANIMACIÓN AL HACER SCROLL (reveal)
// ======================================
function initScrollReveal() {
    const elementos = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observer.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });

    elementos.forEach((el) => observer.observe(el));
}

// ======================================
// 3. FRASE PRINCIPAL ANIMADA POR PALABRAS
// ======================================
function initFraseAnimada() {
    const frase = document.getElementById("frase-principal");
    if (!frase) return;

    const palabras = frase.querySelectorAll(".palabra");
    palabras.forEach((palabra, i) => {
        palabra.style.transitionDelay = (i * 0.06) + "s";
    });

    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                frase.classList.add("visible");
                observer.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(frase);
}

// ======================================
// 4. MÚSICA
// ======================================
let musicaIniciada = false;

function initMusica() {
    const btnHero = document.getElementById("btn-musica");
    const btnFinal = document.getElementById("btn-musica-final");

    btnHero.addEventListener("click", toggleMusica);
    btnFinal.addEventListener("click", () => {
        const audio = document.getElementById("audio");
        if (audio.paused) reproducirMusica(); else pausarMusica();
    });
}

function toggleMusica() {
    const audio = document.getElementById("audio");
    if (audio.paused) reproducirMusica(); else pausarMusica();
}

function reproducirMusica() {
    const audio = document.getElementById("audio");
    const btnHero = document.getElementById("btn-musica");

    if (!musicaIniciada) {
        audio.currentTime = CONFIG.inicioMusica;
        musicaIniciada = true;
    }

    audio.play().then(() => {
        btnHero.textContent = "⏸ PAUSAR MÚSICA";
    }).catch(() => {
        // El navegador bloqueó el autoplay; el usuario deberá tocar el botón.
    });
}

function pausarMusica() {
    const audio = document.getElementById("audio");
    const btnHero = document.getElementById("btn-musica");
    audio.pause();
    btnHero.textContent = "🎵 REPRODUCIR MÚSICA";
}

// ======================================
// 5. CARRUSEL DE FOTOS
// ======================================
function initCarrusel() {
    const track = document.getElementById("carrusel-track");
    const slides = track.querySelectorAll(".carrusel-slide");
    const dotsContenedor = document.getElementById("carrusel-dots");
    const btnPrev = document.getElementById("carrusel-prev");
    const btnNext = document.getElementById("carrusel-next");

    let indice = 0;
    let auto = null;

    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        if (i === 0) dot.classList.add("activo");
        dot.addEventListener("click", () => irASlide(i));
        dotsContenedor.appendChild(dot);
    });
    const dots = dotsContenedor.querySelectorAll("span");

    function irASlide(i) {
        indice = (i + slides.length) % slides.length;
        track.style.transform = `translateX(-${indice * 100}%)`;
        dots.forEach((d) => d.classList.remove("activo"));
        dots[indice].classList.add("activo");
    }

    function siguiente() { irASlide(indice + 1); }
    function anterior() { irASlide(indice - 1); }

    function iniciarAuto() {
        detenerAuto();
        auto = setInterval(siguiente, 4000);
    }
    function detenerAuto() { if (auto) clearInterval(auto); }

    btnNext.addEventListener("click", () => { siguiente(); iniciarAuto(); });
    btnPrev.addEventListener("click", () => { anterior(); iniciarAuto(); });

    // Deslizar con el dedo (touch)
    let touchStartX = 0;
    track.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
        detenerAuto();
    }, { passive: true });

    track.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diferencia = touchStartX - touchEndX;
        if (diferencia > 40) siguiente();
        else if (diferencia < -40) anterior();
        iniciarAuto();
    }, { passive: true });

    // Ajustar ancho del track según cantidad de slides visibles
    track.style.width = "100%";

    irASlide(0);
    iniciarAuto();
}

// ======================================
// 6. LIGHTBOX (ver foto ampliada)
// ======================================
function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const cerrar = document.getElementById("lightbox-cerrar");
    const fotos = document.querySelectorAll(".carrusel-slide img");

    fotos.forEach((img) => {
        img.addEventListener("click", () => {
            lightboxImg.src = img.src;
            lightbox.classList.remove("oculto");
        });
    });

    cerrar.addEventListener("click", () => lightbox.classList.add("oculto"));
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.classList.add("oculto");
    });
}

// ======================================
// 7. CONFIRMACIÓN DE ASISTENCIA (RSVP)
// ======================================
function initRSVP() {
    const form = document.getElementById("form-rsvp");
    const inputFamilia = document.getElementById("rsvp-familia");
    const botones = form.querySelectorAll("[data-confirma]");
    const respuestaDiv = document.getElementById("rsvp-respuesta");

    botones.forEach((btn) => {
        btn.addEventListener("click", async () => {
            const familia = inputFamilia.value.trim().substring(0, CONFIG.maxFamiliaLength);

            if (!familia) {
                inputFamilia.focus();
                return;
            }

            const confirma = btn.dataset.confirma === "si";
            btn.disabled = true;

            try {
                await enviarAlBackend({
                    tipo: "rsvp",
                    familia: familia,
                    confirmacion: confirma
                });

                if (confirma) {
                    respuestaDiv.innerHTML = `<p>¡Excelente! 🎉</p><p>Gracias, Familia ${escaparTexto(familia)}.</p><p>César los espera para celebrar juntos sus 41 años. 🍺</p>`;
                    respuestaDiv.className = "respuesta exito";
                    lanzarConfeti();
                } else {
                    respuestaDiv.innerHTML = `<p>Gracias por avisarnos. ❤️</p><p>Lamentamos que no puedan acompañarnos y esperamos verlos en una próxima celebración.</p>`;
                    respuestaDiv.className = "respuesta exito";
                }
                respuestaDiv.classList.remove("oculto");
                form.classList.add("oculto");
            } catch (err) {
                respuestaDiv.innerHTML = "<p>Ocurrió un error al enviar tu confirmación. Por favor intenta de nuevo.</p>";
                respuestaDiv.className = "respuesta error";
                respuestaDiv.classList.remove("oculto");
            } finally {
                btn.disabled = false;
            }
        });
    });
}

// ======================================
// 8. MURO DE RECUERDOS
// ======================================
function initMuroRecuerdos() {
    const form = document.getElementById("form-recuerdo");
    const inputFamilia = document.getElementById("recuerdo-familia");
    const inputMensaje = document.getElementById("recuerdo-mensaje");
    const contador = document.getElementById("contador-mensaje");
    const inputFoto = document.getElementById("recuerdo-foto");
    const preview = document.getElementById("recuerdo-preview");
    const respuestaDiv = document.getElementById("recuerdo-respuesta");

    let fotoBase64 = null;

    inputMensaje.addEventListener("input", () => {
        contador.textContent = `${inputMensaje.value.length} / ${CONFIG.maxMensajeLength}`;
    });

    inputFoto.addEventListener("change", async () => {
        const archivo = inputFoto.files[0];
        if (!archivo) return;

        // Validación: solo imágenes
        if (!archivo.type.startsWith("image/")) {
            alert("Por favor selecciona una imagen válida.");
            inputFoto.value = "";
            return;
        }

        try {
            fotoBase64 = await comprimirImagen(archivo, CONFIG.fotoMaxAncho, CONFIG.fotoCalidad);
            preview.src = fotoBase64;
            preview.classList.remove("oculto");
        } catch (err) {
            alert("No se pudo procesar la imagen. Intenta con otra foto.");
        }
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const familia = inputFamilia.value.trim().substring(0, CONFIG.maxFamiliaLength);
        const mensaje = inputMensaje.value.trim().substring(0, CONFIG.maxMensajeLength);

        if (!familia || !mensaje || !fotoBase64) {
            alert("Por favor completa tu familia, tu mensaje y una fotografía.");
            return;
        }

        const btnSubmit = form.querySelector("button[type=submit]");
        btnSubmit.disabled = true;
        btnSubmit.textContent = "Enviando...";

        try {
            await enviarAlBackend({
                tipo: "recuerdo",
                familia: familia,
                mensaje: mensaje,
                foto: fotoBase64
            });

            respuestaDiv.innerHTML = "<p>¡Gracias por tu recuerdo! 🎉 Ya forma parte del álbum de César.</p>";
            respuestaDiv.className = "respuesta exito";
            respuestaDiv.classList.remove("oculto");

            form.reset();
            preview.classList.add("oculto");
            contador.textContent = `0 / ${CONFIG.maxMensajeLength}`;
            fotoBase64 = null;

            lanzarConfeti();
            cargarMuro();
        } catch (err) {
            respuestaDiv.innerHTML = "<p>No pudimos guardar tu recuerdo. Por favor intenta de nuevo.</p>";
            respuestaDiv.className = "respuesta error";
            respuestaDiv.classList.remove("oculto");
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.textContent = "🍺 DEJAR MI RECUERDO";
        }
    });

    cargarMuro();
}

// Descarga y pinta los recuerdos ya publicados en el muro
async function cargarMuro() {
    const grid = document.getElementById("muro-grid");

    if (CONFIG.backendURL.includes("AQUI_COLOCAR")) return; // aún no configurado

    try {
        const resp = await fetch(`${CONFIG.backendURL}?tipo=recuerdos`);
        const data = await resp.json();

        if (!data.ok) return;

        grid.innerHTML = "";

        if (data.recuerdos.length === 0) {
            grid.innerHTML = '<p class="muro-vacio">Sé el primero en dejar un recuerdo 🍺</p>';
            return;
        }

        data.recuerdos.forEach((r) => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "muro-tarjeta";
            tarjeta.innerHTML = `
                <img src="${r.fotoUrl}" alt="Recuerdo de ${r.familia}" loading="lazy">
                <div class="muro-tarjeta-info">
                    <strong>${r.familia}</strong>
                    <p>"${r.mensaje}"</p>
                </div>
            `;
            grid.appendChild(tarjeta);
        });
    } catch (err) {
        // Si falla la carga del muro, simplemente no se muestra (no rompe la página)
    }
}

// ======================================
// 9. UTILIDADES
// ======================================

// Envía datos al backend de Google Apps Script.
// Se usa Content-Type "text/plain" a propósito: evita que el navegador
// haga una solicitud de verificación previa (preflight) que Apps Script
// no siempre maneja bien. El backend igual interpreta el contenido como JSON.
async function enviarAlBackend(payload) {
    if (CONFIG.backendURL.includes("AQUI_COLOCAR")) {
        throw new Error("Backend no configurado todavía");
    }

    const resp = await fetch(CONFIG.backendURL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
    });

    const data = await resp.json();
    if (!data.ok) throw new Error(data.error || "Error desconocido");
    return data;
}

// Redimensiona y comprime una imagen en el navegador antes de enviarla,
// para no saturar la solicitud ni el almacenamiento en Drive.
function comprimirImagen(archivo, maxAncho, calidad) {
    return new Promise((resolve, reject) => {
        const lector = new FileReader();
        lector.onerror = () => reject(new Error("No se pudo leer el archivo"));
        lector.onload = () => {
            const img = new Image();
            img.onerror = () => reject(new Error("No se pudo cargar la imagen"));
            img.onload = () => {
                let ancho = img.width;
                let alto = img.height;

                if (ancho > maxAncho) {
                    alto = Math.round((alto * maxAncho) / ancho);
                    ancho = maxAncho;
                }

                const canvas = document.createElement("canvas");
                canvas.width = ancho;
                canvas.height = alto;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, ancho, alto);

                resolve(canvas.toDataURL("image/jpeg", calidad));
            };
            img.src = lector.result;
        };
        lector.readAsDataURL(archivo);
    });
}

// Escapa texto para insertarlo de forma segura en HTML
function escaparTexto(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

// Pequeña animación de confeti hecha con divs (sin librerías externas)
function lanzarConfeti() {
    const contenedor = document.getElementById("confeti-container");
    const colores = ["#0d8a3f", "#ffffff", "#e2231a", "#06622c"];

    for (let i = 0; i < 60; i++) {
        const pieza = document.createElement("div");
        pieza.className = "confeti-pieza";
        pieza.style.left = Math.random() * 100 + "vw";
        pieza.style.background = colores[Math.floor(Math.random() * colores.length)];
        pieza.style.animationDuration = (2 + Math.random() * 1.5) + "s";
        contenedor.appendChild(pieza);
        setTimeout(() => pieza.remove(), 4000);
    }
}
