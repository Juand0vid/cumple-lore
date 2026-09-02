// ======================================================
// SORPRESA.JS
// Vela → corazones + globos → regalo → carta → final
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

  // ======================================================
  // ELEMENTOS
  // ======================================================

  const regalo = document.querySelector(".regalo");
  const regalos = document.querySelector(".regalos");

  const modalCarta = document.getElementById("modalCarta");
  const carta = modalCarta
    ? modalCarta.querySelector(".carta")
    : null;

  const overlay = document.querySelector(".overlay");

  const soplido = document.getElementById("soplido");
  const cancion = document.getElementById("cancion");

  const llama = document.querySelector(".llama");
  const vela = document.querySelector(".vela");

  const mensajeFinalViejo =
    document.getElementById("mensajeFinal");


  // ======================================================
  // ESTADOS
  // ======================================================

  let velaApagada = false;
  let cartaAbierta = false;
  let escenaFinalMostrada = false;


  // ======================================================
  // OCULTAR EL MENSAJE FINAL ANTIGUO
  // ======================================================

  if (mensajeFinalViejo) {
    mensajeFinalViejo.classList.remove("activo");
    mensajeFinalViejo.style.display = "none";
  }


  // ======================================================
  // ESTILOS DE LOS EFECTOS
  // ======================================================

  const estilos = document.createElement("style");

  estilos.textContent = `

    /* ==================================================
       CORAZONES
    ================================================== */

    .corazon-cinematico {
      position: fixed !important;
      pointer-events: none !important;
      z-index: 30001 !important;

      font-size: 22px;

      animation:
        subirCorazon 3s ease-out forwards;

      filter:
        drop-shadow(
          0 0 5px rgba(255,255,255,.8)
        );
    }


    @keyframes subirCorazon {

      0% {
        opacity: 0;

        transform:
          translateY(20px)
          scale(.3)
          rotate(0deg);
      }

      15% {
        opacity: 1;
      }

      100% {
        opacity: 0;

        transform:
          translateY(-100vh)
          translateX(var(--movimiento))
          scale(1.5)
          rotate(var(--rotacion));
      }
    }


    /* ==================================================
       GLOBOS
    ================================================== */

    .globo-cinematico {
      position: fixed !important;

      bottom: -180px;

      width: 55px;
      height: 70px;

      border-radius:
        50% 50% 45% 45%;

      z-index: 30000 !important;

      pointer-events: none !important;

      animation:
        subirGlobo 8s ease-in forwards;
    }


    .globo-cinematico::before {
      content: "";

      position: absolute;

      width: 2px;
      height: 120px;

      background:
        rgba(255,255,255,.55);

      left: 50%;
      top: 68px;
    }


    .globo-cinematico::after {
      content: "";

      position: absolute;

      width: 10px;
      height: 10px;

      background: inherit;

      bottom: -4px;
      left: calc(50% - 5px);

      transform: rotate(45deg);
    }


    @keyframes subirGlobo {

      0% {
        transform:
          translateY(0)
          translateX(0)
          rotate(-5deg);

        opacity: 0;
      }

      10% {
        opacity: 1;
      }

      50% {
        transform:
          translateY(-60vh)
          translateX(var(--desplazamiento))
          rotate(8deg);
      }

      100% {
        transform:
          translateY(-125vh)
          translateX(
            calc(var(--desplazamiento) * -1)
          )
          rotate(-8deg);

        opacity: 0;
      }
    }


    /* ==================================================
       DESTELLO
    ================================================== */

    .destello-cinematico {
      position: fixed;

      width: 20px;
      height: 20px;

      border-radius: 50%;

      pointer-events: none;

      z-index: 30002 !important;

      background: white;

      box-shadow:
        0 0 10px white,
        0 0 25px #ff4d6d,
        0 0 50px #ff4d6d;

      animation:
        explotarDestello
        .8s
        ease-out
        forwards;
    }


    @keyframes explotarDestello {

      0% {
        transform: scale(.2);
        opacity: 1;
      }

      100% {
        transform: scale(15);
        opacity: 0;
      }
    }


    /* ==================================================
       X DE LA CARTA
    ================================================== */

    .carta .cerrar-carta {

      position: absolute !important;

      top: 10px !important;
      right: 10px !important;

      width: 42px !important;
      height: 42px !important;

      display: flex !important;

      align-items: center !important;
      justify-content: center !important;

      padding: 0 !important;

      border: none !important;

      border-radius: 50% !important;

      background:
        rgba(255,255,255,.97) !important;

      color: #ff4d6d !important;

      font-family:
        Arial,
        sans-serif !important;

      font-size: 32px !important;

      font-weight: bold !important;

      line-height: 1 !important;

      cursor: pointer !important;

      z-index: 50000 !important;

      opacity: 1 !important;

      visibility: visible !important;

      pointer-events: auto !important;

      box-shadow:
        0 3px 12px
        rgba(0,0,0,.30);

      transition:
        transform .2s ease,
        background .2s ease;
    }


    .carta .cerrar-carta:hover {
      transform: scale(1.1);
      background: white !important;
    }


    .carta .cerrar-carta:active {
      transform: scale(.9);
    }


    /* ==================================================
       ESCENA FINAL
    ================================================== */

    .escena-final-cinematica {

      position: fixed !important;

      inset: 0;

      width: 100vw;
      height: 100vh;

      background:

        radial-gradient(
          circle at 50% 35%,
          rgba(255,105,180,.20),
          transparent 35%
        ),

        linear-gradient(
          to bottom,
          #070014 0%,
          #140022 50%,
          #25002f 100%
        );

      z-index: 60000 !important;

      opacity: 0;

      pointer-events: none;

      transition:
        opacity 2s ease;

      overflow: hidden;

      display: flex;

      justify-content: center;
      align-items: center;
    }


    .escena-final-cinematica.visible {

      opacity: 1;

      pointer-events: auto;
    }


    /* ==================================================
       ESTRELLAS
    ================================================== */

    .estrellas-finales {

      position: absolute;

      inset: 0;

      background-image:

        radial-gradient(
          circle,
          white 1px,
          transparent 1px
        ),

        radial-gradient(
          circle,
          rgba(255,255,255,.7) 1px,
          transparent 1px
        );

      background-size:
        90px 90px,
        140px 140px;

      animation:
        estrellasMover
        8s
        linear
        infinite;

      opacity: .8;
    }


    @keyframes estrellasMover {

      from {
        transform: translateY(0);
      }

      to {
        transform: translateY(90px);
      }
    }


    /* ==================================================
       LUNA
    ================================================== */

    .luna-final {

      position: absolute;

      top: 10%;
      right: 12%;

      width: 90px;
      height: 90px;

      border-radius: 50%;

      background: #fff8dc;

      box-shadow:
        0 0 20px #fff8dc,
        0 0 50px
        rgba(255,248,220,.5);
    }


    /* ==================================================
       CONTENIDO FINAL
    ================================================== */

    .contenido-final-cinematico {

      position: relative;

      z-index: 10;

      width: min(90%, 600px);

      padding: 45px 25px;

      text-align: center;

      color: white;

      transform:
        translateY(40px)
        scale(.9);

      opacity: 0;

      transition:
        transform 1.5s ease,
        opacity 1.5s ease;
    }


    .escena-final-cinematica.visible
    .contenido-final-cinematico {

      transform:
        translateY(0)
        scale(1);

      opacity: 1;

      transition-delay: .8s;
    }


    /* ==================================================
       CORAZÓN FINAL
    ================================================== */

    .corazon-final-grande {

      font-size: 70px;

      animation:
        latidoFinal 1.2s infinite;

      filter:
        drop-shadow(
          0 0 15px
          rgba(255,80,130,.8)
        );
    }


    @keyframes latidoFinal {

      0%, 100% {
        transform: scale(1);
      }

      50% {
        transform: scale(1.15);
      }
    }


    /* ==================================================
       TÍTULO FINAL
    ================================================== */

    .contenido-final-cinematico h1 {

      font-family:
        'Pacifico',
        cursive;

      font-size:
        clamp(38px, 8vw, 65px);

      margin: 10px 0;

      color: #ffb6d9;

      text-shadow:
        0 0 10px
        rgba(255,182,217,.8),

        0 0 30px
        rgba(255,80,160,.6);
    }


    .nombre-final {

      font-family:
        'Pacifico',
        cursive;

      font-size:
        clamp(32px, 7vw, 55px);

      color: white;

      margin-bottom: 25px;
    }


    .texto-final {

      font-family:
        Georgia,
        serif;

      font-size:
        clamp(18px, 4vw, 24px);

      line-height: 1.7;

      color: #ffeaf4;
    }


    .te-amo-final {

      font-family:
        'Pacifico',
        cursive;

      font-size:
        clamp(30px, 7vw, 50px);

      color: #ff6fa8;

      margin-top: 25px;

      text-shadow:
        0 0 20px
        rgba(255,80,160,.8);
    }


    .firma-final-cinematica {

      margin-top: 25px;

      font-size: 17px;

      opacity: .8;

      font-style: italic;
    }


    /* ==================================================
       BOTÓN FINAL
    ================================================== */

    .boton-volver-regalo {

      margin-top: 30px;

      padding: 14px 28px;

      border: none;

      border-radius: 30px;

      background:
        linear-gradient(
          135deg,
          #ff4d8d,
          #ff7eb3
        );

      color: white;

      font-size: 17px;

      font-weight: bold;

      cursor: pointer;

      box-shadow:
        0 0 15px
        rgba(255,80,150,.7),

        0 0 35px
        rgba(255,80,150,.4);

      transition:
        transform .2s ease,
        box-shadow .2s ease;
    }


    .boton-volver-regalo:hover {

      transform: scale(1.07);

      box-shadow:
        0 0 20px
        rgba(255,80,150,.9),

        0 0 45px
        rgba(255,80,150,.6);
    }


    .boton-volver-regalo:active {
      transform: scale(.95);
    }


    /* ==================================================
       CELULAR
    ================================================== */

    @media (max-width: 600px) {

      .luna-final {

        width: 60px;
        height: 60px;

        top: 8%;
        right: 8%;
      }


      .corazon-final-grande {
        font-size: 55px;
      }


      .contenido-final-cinematico {
        padding: 25px 15px;
      }


      .carta .cerrar-carta {

        width: 38px !important;
        height: 38px !important;

        top: 8px !important;
        right: 8px !important;

        font-size: 29px !important;
      }
    }

  `;

  document.head.appendChild(estilos);


  // ======================================================
  // POSICIONAR LA LLAMA
  // ======================================================

  function posicionarLlama() {

    if (!llama || !vela || velaApagada) {
      return;
    }

    const rect =
      vela.getBoundingClientRect();

    const centroX =
      rect.left + rect.width / 2;

    const top =
      rect.top - 30;

    llama.style.position = "fixed";

    llama.style.left =
      `${centroX - 10}px`;

    llama.style.top =
      `${top}px`;

    llama.style.bottom = "auto";

    llama.style.zIndex = "20000";
  }


  requestAnimationFrame(() => {

    requestAnimationFrame(() => {
      posicionarLlama();
    });

  });


  window.addEventListener(
    "resize",
    posicionarLlama
  );


  // ======================================================
  // CORAZONES
  // ======================================================

  function crearCorazones(cantidad = 30) {

    const corazones = [
      "❤️",
      "💖",
      "💕",
      "💗",
      "💘"
    ];


    for (
      let i = 0;
      i < cantidad;
      i++
    ) {

      setTimeout(() => {

        const corazon =
          document.createElement("div");

        corazon.className =
          "corazon-cinematico";

        corazon.textContent =
          corazones[
            Math.floor(
              Math.random() *
              corazones.length
            )
          ];


        corazon.style.left =
          `${Math.random() * 100}vw`;

        corazon.style.bottom =
          `${Math.random() * 20}vh`;


        corazon.style.setProperty(
          "--movimiento",
          `${(Math.random() - .5) * 250}px`
        );


        corazon.style.setProperty(
          "--rotacion",
          `${(Math.random() - .5) * 80}deg`
        );


        corazon.style.fontSize =
          `${16 + Math.random() * 25}px`;


        document.body.appendChild(
          corazon
        );


        setTimeout(() => {
          corazon.remove();
        }, 3500);

      }, i * 60);

    }
  }


  // ======================================================
  // GLOBOS
  // ======================================================

  function crearGlobos(cantidad = 16) {

    const colores = [
      "#ff4d6d",
      "#ff8fab",
      "#ffccd5",
      "#ffb703",
      "#c77dff",
      "#90dbf4",
      "#80ed99"
    ];


    for (
      let i = 0;
      i < cantidad;
      i++
    ) {

      setTimeout(() => {

        const globo =
          document.createElement("div");

        globo.className =
          "globo-cinematico";


        globo.style.left =
          `${Math.random() * 100}vw`;


        globo.style.background =
          colores[
            Math.floor(
              Math.random() *
              colores.length
            )
          ];


        globo.style.setProperty(
          "--desplazamiento",
          `${(Math.random() - .5) * 220}px`
        );


        globo.style.animationDuration =
          `${6 + Math.random() * 4}s`;


        document.body.appendChild(
          globo
        );


        setTimeout(() => {
          globo.remove();
        }, 11000);

      }, i * 180);

    }
  }


  // ======================================================
  // DESTELLO
  // ======================================================

  function crearDestello() {

    const destello =
      document.createElement("div");

    destello.className =
      "destello-cinematico";


    destello.style.left =
      "calc(50% - 10px)";

    destello.style.top =
      "calc(50% - 10px)";


    document.body.appendChild(
      destello
    );


    setTimeout(() => {
      destello.remove();
    }, 900);
  }


  // ======================================================
  // ESCENA FINAL
  // ======================================================

  function crearEscenaFinal() {

    if (escenaFinalMostrada) {
      return;
    }

    escenaFinalMostrada = true;


    const escena =
      document.createElement("div");

    escena.className =
      "escena-final-cinematica";


    escena.innerHTML = `

      <div class="estrellas-finales"></div>

      <div class="luna-final"></div>

      <div class="contenido-final-cinematico">

        <div class="corazon-final-grande">
          ❤️
        </div>

        <h1>
          Feliz cumpleaños
        </h1>

        <div class="nombre-final">
          Mi Loreynne 💖
        </div>

        <div class="texto-final">
          Gracias por existir,<br>
          por ser tú y por haber llegado<br>
          a mi vida de una manera tan especial.
        </div>

        <div class="te-amo-final">
          Te amo muchísimo ❤️
        </div>

        <div class="firma-final-cinematica">
          — Juan
        </div>

        <button
          id="volverAlRegalo"
          class="boton-volver-regalo"
        >
          🎁 Volver al regalo
        </button>

      </div>
    `;


    document.body.appendChild(
      escena
    );


    requestAnimationFrame(() => {

      requestAnimationFrame(() => {
        escena.classList.add("visible");
      });

    });


    const boton =
      escena.querySelector(
        "#volverAlRegalo"
      );


    if (boton) {

      boton.addEventListener(
        "click",
        () => {

          escena.classList.remove(
            "visible"
          );


          setTimeout(() => {

            escena.remove();

            escenaFinalMostrada =
              false;

            if (mensajeFinalViejo) {
              mensajeFinalViejo.style.display =
                "none";
            }

          }, 2000);

        }
      );

    }

  }


  // ======================================================
  // CREAR X DE LA CARTA
  // ======================================================

  function crearBotonCerrarCarta() {

    if (!modalCarta) {
      return null;
    }


    let boton =
      modalCarta.querySelector(
        ".cerrar-carta"
      );


    if (boton) {
      return boton;
    }


    boton =
      document.createElement(
        "button"
      );


    boton.className =
      "cerrar-carta";


    boton.innerHTML =
      "&times;";


    boton.type =
      "button";


    boton.setAttribute(
      "aria-label",
      "Cerrar carta"
    );


    // IMPORTANTE:
    // La X queda dentro de .carta.
    if (carta) {

      carta.appendChild(
        boton
      );

    } else {

      modalCarta.appendChild(
        boton
      );

    }


    boton.addEventListener(
      "click",
      (evento) => {

        evento.preventDefault();

        evento.stopPropagation();

        cerrarCartaYMostrarFinal();

      }
    );


    return boton;
  }


  // ======================================================
  // CERRAR CARTA
  // ======================================================

  function cerrarCartaYMostrarFinal() {

    if (!modalCarta) {
      return;
    }


    modalCarta.classList.remove(
      "activo"
    );


    cartaAbierta = false;


    setTimeout(() => {

      crearEscenaFinal();

    }, 500);

  }


  // ======================================================
  // ABRIR CARTA
  // ======================================================

  function abrirCarta() {

    if (!modalCarta) {
      return;
    }


    modalCarta.classList.add(
      "activo"
    );


    cartaAbierta = true;


    crearBotonCerrarCarta();

  }


  // ======================================================
  // REGALO
  // ======================================================

  if (regalo) {

    regalo.addEventListener(
      "click",
      abrirCarta
    );

  }


  if (regalos) {

    regalos.addEventListener(
      "click",
      abrirCarta
    );

  }


  // ======================================================
  // CERRAR CARTA AL TOCAR FONDO
  // ======================================================

  if (modalCarta) {

    modalCarta.addEventListener(
      "click",
      (evento) => {

        if (
          evento.target ===
          modalCarta
        ) {

          cerrarCartaYMostrarFinal();

        }

      }
    );

  }


  // ======================================================
  // APAGAR VELA
  // ======================================================

  async function apagarVela() {

    if (velaApagada) {
      return;
    }


    velaApagada = true;


    // Alinear antes de apagar
    posicionarLlama();


    // ==================================================
    // SOPLIDO
    // ==================================================

    if (soplido) {

      try {

        soplido.currentTime = 0;

        await soplido.play();

      } catch (error) {

        console.log(
          "No se pudo reproducir el soplido:",
          error
        );

      }

    }


    // ==================================================
    // APAGAR VISUALMENTE LA LLAMA
    // ==================================================

    if (llama) {

      llama.style.animation =
        "apagar .5s forwards";

      llama.style.pointerEvents =
        "none";

    }


    // ==================================================
    // MOSTRAR PÁGINA
    // ==================================================

    if (overlay) {

      overlay.classList.add(
        "hidden"
      );

    }


    // ==================================================
    // EFECTOS
    // ==================================================

    setTimeout(() => {

      crearDestello();

      crearCorazones(30);

      crearGlobos(16);

    }, 250);


    // ==================================================
    // MÚSICA
    // ==================================================

    if (cancion) {

      try {

        cancion.currentTime = 0;

        cancion.volume = 0.65;

        // Se intenta iniciar inmediatamente
        // después del clic para evitar bloqueos
        // de autoplay en algunos navegadores.

        const promesa =
          cancion.play();

        if (promesa) {
          await promesa;
        }

      } catch (error) {

        console.log(
          "No se pudo reproducir la canción:",
          error
        );

      }

    }

  }


  // ======================================================
  // CLIC EN LA LLAMA
  // ======================================================

  if (llama) {

    llama.addEventListener(
      "click",
      apagarVela
    );

  }


  // ======================================================
  // CLIC EN LA VELA
  //
  // Esto es un respaldo importante:
  // ahora se puede tocar la llama O la vela.
  // ======================================================

  if (vela) {

    vela.addEventListener(
      "click",
      apagarVela
    );

  }


  // ======================================================
  // BOTÓN DEL MENSAJE FINAL ANTIGUO
  // ======================================================

  const botonFinalViejo =
    document.getElementById(
      "cerrarMensajeFinal"
    );


  if (botonFinalViejo) {

    botonFinalViejo.addEventListener(
      "click",
      () => {

        if (mensajeFinalViejo) {

          mensajeFinalViejo.classList.remove(
            "activo"
          );

          mensajeFinalViejo.style.display =
            "none";

        }

      }
    );

  }


  // ======================================================
  // LISTO
  // ======================================================

  console.log(
    "❤️ Sorpresa.js cargado correctamente"
  );

});  estilos.textContent = `

    /* =========================================
       CORAZONES
    ========================================= */

    .corazon-cinematico {
      position: fixed;
      pointer-events: none;
      z-index: 10002;
      font-size: 22px;
      animation: subirCorazon 3s ease-out forwards;
      filter: drop-shadow(0 0 5px rgba(255,255,255,.8));
    }


    @keyframes subirCorazon {

      0% {
        opacity: 0;
        transform:
          translateY(20px)
          scale(.3)
          rotate(0deg);
      }

      15% {
        opacity: 1;
      }

      100% {
        opacity: 0;
        transform:
          translateY(-100vh)
          translateX(var(--movimiento))
          scale(1.5)
          rotate(var(--rotacion));
      }

    }


    /* =========================================
       GLOBOS
    ========================================= */

    .globo-cinematico {
      position: fixed;
      bottom: -180px;
      width: 55px;
      height: 70px;
      border-radius: 50% 50% 45% 45%;
      z-index: 10003;
      pointer-events: none;
      animation: subirGlobo 8s ease-in forwards;
    }


    .globo-cinematico::before {
      content: "";
      position: absolute;
      width: 2px;
      height: 120px;
      background: rgba(255,255,255,.55);
      left: 50%;
      top: 68px;
    }


    .globo-cinematico::after {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      background: inherit;
      bottom: -4px;
      left: calc(50% - 5px);
      transform: rotate(45deg);
    }


    @keyframes subirGlobo {

      0% {
        transform:
          translateY(0)
          translateX(0)
          rotate(-5deg);
        opacity: 0;
      }

      10% {
        opacity: 1;
      }

      50% {
        transform:
          translateY(-60vh)
          translateX(var(--desplazamiento))
          rotate(8deg);
      }

      100% {
        transform:
          translateY(-125vh)
          translateX(calc(var(--desplazamiento) * -1))
          rotate(-8deg);
        opacity: 0;
      }

    }


    /* =========================================
       DESTELLO
    ========================================= */

    .destello-cinematico {
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 10004;
      background: white;
      box-shadow:
        0 0 10px white,
        0 0 25px #ff4d6d,
        0 0 50px #ff4d6d;
      animation: explotarDestello .8s ease-out forwards;
    }


    @keyframes explotarDestello {

      0% {
        transform: scale(.2);
        opacity: 1;
      }

      100% {
        transform: scale(15);
        opacity: 0;
      }

    }


    /* =========================================
       ESCENA FINAL
    ========================================= */

    .escena-final-cinematica {
      position: fixed;
      inset: 0;

      background:
        radial-gradient(
          circle at 50% 35%,
          rgba(255,105,180,.20),
          transparent 35%
        ),
        linear-gradient(
          to bottom,
          #070014 0%,
          #140022 50%,
          #25002f 100%
        );

      z-index: 20000;

      opacity: 0;
      pointer-events: none;

      transition: opacity 2s ease;

      overflow: hidden;

      display: flex;
      justify-content: center;
      align-items: center;
    }


    .escena-final-cinematica.visible {
      opacity: 1;
      pointer-events: auto;
    }


    .estrellas-finales {
      position: absolute;
      inset: 0;

      background-image:
        radial-gradient(
          circle,
          white 1px,
          transparent 1px
        ),
        radial-gradient(
          circle,
          rgba(255,255,255,.7) 1px,
          transparent 1px
        );

      background-size:
        90px 90px,
        140px 140px;

      animation:
        estrellasMover 8s linear infinite;

      opacity: .8;
    }


    @keyframes estrellasMover {

      from {
        transform: translateY(0);
      }

      to {
        transform: translateY(90px);
      }

    }


    .luna-final {
      position: absolute;

      top: 10%;
      right: 12%;

      width: 90px;
      height: 90px;

      border-radius: 50%;

      background: #fff8dc;

      box-shadow:
        0 0 20px #fff8dc,
        0 0 50px rgba(255,248,220,.5);
    }


    .contenido-final-cinematico {
      position: relative;

      z-index: 5;

      width: min(90%, 600px);

      padding: 45px 25px;

      text-align: center;

      color: white;

      transform:
        translateY(40px)
        scale(.9);

      opacity: 0;

      transition:
        transform 1.5s ease,
        opacity 1.5s ease;
    }


    .escena-final-cinematica.visible
    .contenido-final-cinematico {

      transform:
        translateY(0)
        scale(1);

      opacity: 1;

      transition-delay: .8s;
    }


    .corazon-final-grande {

      font-size: 70px;

      animation:
        latidoFinal 1.2s infinite;

      filter:
        drop-shadow(
          0 0 15px
          rgba(255,80,130,.8)
        );
    }


    @keyframes latidoFinal {

      0%,100% {
        transform: scale(1);
      }

      50% {
        transform: scale(1.15);
      }

    }


    .contenido-final-cinematico h1 {

      font-family:
        'Pacifico',
        cursive;

      font-size:
        clamp(38px, 8vw, 65px);

      margin: 10px 0;

      color: #ffb6d9;

      text-shadow:
        0 0 10px rgba(255,182,217,.8),
        0 0 30px rgba(255,80,160,.6);
    }


    .nombre-final {

      font-family:
        'Pacifico',
        cursive;

      font-size:
        clamp(32px, 7vw, 55px);

      color: white;

      margin-bottom: 25px;
    }


    .texto-final {

      font-family: Georgia, serif;

      font-size:
        clamp(18px, 4vw, 24px);

      line-height: 1.7;

      color: #ffeaf4;
    }


    .te-amo-final {

      font-family:
        'Pacifico',
        cursive;

      font-size:
        clamp(30px, 7vw, 50px);

      color: #ff6fa8;

      margin-top: 25px;

      text-shadow:
        0 0 20px
        rgba(255,80,160,.8);
    }


    .firma-final-cinematica {

      margin-top: 25px;

      font-size: 17px;

      opacity: .8;

      font-style: italic;
    }


    /* =========================================
       BOTÓN VOLVER AL REGALO
    ========================================= */

    .boton-volver-regalo {

      margin-top: 30px;

      padding: 14px 28px;

      border: none;

      border-radius: 30px;

      background:
        linear-gradient(
          135deg,
          #ff4d8d,
          #ff7eb3
        );

      color: white;

      font-size: 17px;

      font-weight: bold;

      cursor: pointer;

      box-shadow:
        0 0 15px rgba(255,80,150,.7),
        0 0 35px rgba(255,80,150,.4);

      transition:
        transform .2s ease,
        box-shadow .2s ease;
    }


    .boton-volver-regalo:hover {

      transform: scale(1.07);

      box-shadow:
        0 0 20px rgba(255,80,150,.9),
        0 0 45px rgba(255,80,150,.6);
    }


    .boton-volver-regalo:active {

      transform: scale(.95);
    }


    /* =========================================
       X PARA CERRAR LA CARTA
    ========================================= */

    .cerrar-carta {

      position: absolute;

      top: 15px;
      right: 18px;

      width: 42px;
      height: 42px;

      border: none;

      border-radius: 50%;

      background:
        rgba(255,255,255,.95);

      color: #ff4d6d;

      font-size: 32px;

      font-weight: bold;

      line-height: 38px;

      cursor: pointer;

      z-index: 10005;

      box-shadow:
        0 3px 12px
        rgba(0,0,0,.25);

      transition:
        transform .2s ease,
        background .2s ease;
    }


    .cerrar-carta:hover {

      transform: scale(1.1);

      background: white;
    }


    .cerrar-carta:active {

      transform: scale(.9);
    }


    @media (max-width: 600px) {

      .luna-final {

        width: 60px;
        height: 60px;

        top: 8%;
        right: 8%;
      }


      .corazon-final-grande {

        font-size: 55px;
      }


      .contenido-final-cinematico {

        padding: 25px 15px;
      }


      .cerrar-carta {

        width: 38px;
        height: 38px;

        top: 10px;
        right: 10px;

        font-size: 29px;

        line-height: 34px;
      }

    }

  `;


  document.head.appendChild(estilos);


  // ======================================================
  // CORAZONES
  // ======================================================

  function crearCorazones(cantidad = 30) {

    const corazones = [
      "❤️",
      "💖",
      "💕",
      "💗",
      "💘"
    ];


    for (let i = 0; i < cantidad; i++) {

      setTimeout(() => {

        const corazon =
          document.createElement("div");

        corazon.className =
          "corazon-cinematico";

        corazon.textContent =
          corazones[
            Math.floor(
              Math.random() *
              corazones.length
            )
          ];

        corazon.style.left =
          `${Math.random() * 100}vw`;

        corazon.style.bottom =
          `${Math.random() * 20}vh`;

        corazon.style.setProperty(
          "--movimiento",
          `${(Math.random() - .5) * 250}px`
        );

        corazon.style.setProperty(
          "--rotacion",
          `${(Math.random() - .5) * 80}deg`
        );

        corazon.style.fontSize =
          `${16 + Math.random() * 25}px`;

        document.body.appendChild(corazon);


        setTimeout(() => {

          corazon.remove();

        }, 3500);

      }, i * 60);

    }

  }


  // ======================================================
  // GLOBOS
  // ======================================================

  function crearGlobos(cantidad = 12) {

    const colores = [

      "#ff4d6d",
      "#ff8fab",
      "#ffccd5",
      "#ffb703",
      "#c77dff",
      "#90dbf4",
      "#80ed99"

    ];


    for (let i = 0; i < cantidad; i++) {

      setTimeout(() => {

        const globo =
          document.createElement("div");

        globo.className =
          "globo-cinematico";

        globo.style.left =
          `${Math.random() * 100}vw`;

        globo.style.background =
          colores[
            Math.floor(
              Math.random() *
              colores.length
            )
          ];

        globo.style.setProperty(
          "--desplazamiento",
          `${(Math.random() - .5) * 220}px`
        );

        globo.style.animationDuration =
          `${6 + Math.random() * 4}s`;

        document.body.appendChild(globo);


        setTimeout(() => {

          globo.remove();

        }, 11000);

      }, i * 250);

    }

  }


  // ======================================================
  // DESTELLO
  // ======================================================

  function crearDestello() {

    const destello =
      document.createElement("div");

    destello.className =
      "destello-cinematico";

    destello.style.left =
      "calc(50% - 10px)";

    destello.style.top =
      "calc(50% - 10px)";

    document.body.appendChild(destello);


    setTimeout(() => {

      destello.remove();

    }, 900);

  }


  // ======================================================
  // ESCENA FINAL
  // ======================================================

  function crearEscenaFinal() {

    if (escenaFinalMostrada) return;

    escenaFinalMostrada = true;


    const escena =
      document.createElement("div");

    escena.className =
      "escena-final-cinematica";


    escena.innerHTML = `

      <div class="estrellas-finales"></div>

      <div class="luna-final"></div>

      <div class="contenido-final-cinematico">

        <div class="corazon-final-grande">
          ❤️
        </div>

        <h1>
          Feliz cumpleaños
        </h1>

        <div class="nombre-final">
          Mi Loreynne 💖
        </div>

        <div class="texto-final">
          Gracias por existir,<br>
          por ser tú y por haber llegado<br>
          a mi vida de una manera tan especial.
        </div>

        <div class="te-amo-final">
          Te amo muchísimo ❤️
        </div>

        <div class="firma-final-cinematica">
          — Juan
        </div>

        <button
          id="volverAlRegalo"
          class="boton-volver-regalo"
        >
          🎁 Volver al regalo
        </button>

      </div>

    `;


    document.body.appendChild(escena);


    requestAnimationFrame(() => {

      escena.classList.add("visible");

    });


    // ======================================================
    // BOTÓN VOLVER AL REGALO
    // ======================================================

    const boton =
      document.getElementById(
        "volverAlRegalo"
      );


    if (boton) {

      boton.addEventListener(
        "click",
        () => {

          escena.classList.remove(
            "visible"
          );


          setTimeout(() => {

            escena.remove();

            escenaFinalMostrada =
              false;

          }, 2000);

        }
      );

    }

  }


  // ======================================================
  // ABRIR CARTA
  // ======================================================

  function abrirCarta() {

    if (!modalCarta) return;


    modalCarta.classList.add(
      "activo"
    );

    cartaAbierta = true;


    // ====================================================
    // CREAR X PARA CERRAR LA CARTA
    // ====================================================

    let botonCerrar =
      modalCarta.querySelector(
        ".cerrar-carta"
      );


    if (!botonCerrar) {

      botonCerrar =
        document.createElement(
          "button"
        );

      botonCerrar.className =
        "cerrar-carta";

      botonCerrar.innerHTML =
        "×";

      botonCerrar.setAttribute(
        "aria-label",
        "Cerrar carta"
      );


      modalCarta.appendChild(
        botonCerrar
      );


      // ==================================================
      // AL PULSAR X:
      // CERRAR CARTA → ESCENA FINAL
      // ==================================================

      botonCerrar.addEventListener(
        "click",
        (evento) => {

          evento.stopPropagation();


          modalCarta.classList.remove(
            "activo"
          );


          cartaAbierta = false;


          setTimeout(() => {

            crearEscenaFinal();

          }, 700);

        }
      );

    }

  }


  // ======================================================
  // EVENTO DEL REGALO
  // ======================================================

  if (regalo) {

    regalo.addEventListener(
      "click",
      abrirCarta
    );

  }


  if (regalos) {

    regalos.addEventListener(
      "click",
      abrirCarta
    );

  }


  // ======================================================
  // CERRAR CARTA HACIENDO CLICK EN EL FONDO
  // ======================================================

  if (modalCarta) {

    modalCarta.addEventListener(
      "click",
      (evento) => {

        // Solo cerrar si se pulsa
        // el fondo oscuro.

        if (
          evento.target === modalCarta
        ) {

          modalCarta.classList.remove(
            "activo"
          );


          if (cartaAbierta) {

            cartaAbierta = false;


            setTimeout(() => {

              crearEscenaFinal();

            }, 700);

          }

        }

      }
    );

  }


  // ======================================================
  // VELA
  // ======================================================

  if (llama) {

    llama.addEventListener(
      "click",
      async () => {

        if (velaApagada) return;


        velaApagada = true;


        // Alinear una última vez
        // antes de apagar.

        posicionarLlama();


        // =================================================
        // SONIDO DEL SOPLIDO
        // =================================================

        if (soplido) {

          try {

            soplido.currentTime = 0;

            await soplido.play();

          } catch (error) {

            console.log(
              "No se pudo reproducir el soplido:",
              error
            );

          }

        }


        // =================================================
        // ANIMACIÓN DE LA LLAMA
        // =================================================

        llama.style.animation =
          "apagar .5s forwards";

        llama.style.pointerEvents =
          "none";


        // =================================================
        // EXPLOSIÓN
        // =================================================

        setTimeout(() => {

          crearDestello();

          crearCorazones(30);

          crearGlobos(12);

        }, 350);


        // =================================================
        // ENCENDER CANCIÓN
        // =================================================

        setTimeout(
          async () => {

            if (cancion) {

              try {

                cancion.currentTime = 0;

                // Volumen al 65%
                cancion.volume = 0.65;

                await cancion.play();

              } catch (error) {

                console.log(
                  "No se pudo reproducir la canción:",
                  error
                );

              }

            }


            // =================================================
            // MOSTRAR PÁGINA
            // =================================================

            if (overlay) {

              overlay.classList.add(
                "hidden"
              );

            }

          },
          1000
        );

      }
    );

  }

});
