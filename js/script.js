
// 📌 PRIMER CANVAS (cornerCanvas)
const canvas = document.getElementById("cornerCanvas", "cornerCanvas2");
const ctx = canvas.getContext("2d");

function drawCorners() {
  const cornerSize = 60; // Tamaño de las esquinas
  const lineWidth = 3; // Grosor de la línea
  const cornerColor = "#00ffcc"; // Verde neón

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
  ctx.strokeStyle = cornerColor;
  ctx.lineWidth = lineWidth;

  // Agregar efecto de brillo
  ctx.shadowBlur = 8;
  ctx.shadowColor = cornerColor;

  function drawCorner(x1, y1, x2, y2, x3, y3) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.stroke();
  }

  // Esquinas activadas
  drawCorner(10, cornerSize, 10, 10, cornerSize, 10);
  drawCorner(
    canvas.width - cornerSize - 10,
    canvas.height - 10,
    canvas.width - 10,
    canvas.height - 10,
    canvas.width - 10,
    canvas.height - cornerSize - 10
  );

  // Esquina superior derecha
  //drawCorner(canvas.width - cornerSize - 10, 10, canvas.width - 10, 10, canvas.width - 10, cornerSize);

  // Esquina inferior izquierda
  //drawCorner(10, canvas.height - cornerSize - 10, 10, canvas.height - 10, cornerSize, canvas.height - 10);
}

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  drawCorners();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Ajustar el tamaño inicial

// 📌 SEGUNDO CANVAS (uiCanvas) CON MEJORAS
const canvas2 = document.getElementById("uiCanvas");
const ctx2 = canvas2.getContext("2d");

// Hacer que canvas2 cubra toda la pantalla pero quede detrás
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;
canvas2.style.position = "absolute";
canvas2.style.top = "0";
canvas2.style.left = "0";
canvas2.style.zIndex = "-1"; // Hace que esté detrás de otros elementos
const elements = [
  {
    x: 5,
    y: 5,
    width: 450,
    height: 70,
    colors: ["#104bee", "#00cfff"],
    speed: 1.1,
  },
  {
    x: 50,
    y: 120,
    width: 350,
    height: 50,
    colors: ["#00cfff", "#39FF14"],
    speed: 1.2,
  },
  {
    x: 250,
    y: 190,
    width: 500,
    height: 60,
    colors: ["#a000c8", "#ff00ff"],
    speed: 1.5,
  },
  {
    x: 550,
    y: 1580,
    width: 400,
    height: 55,
    colors: ["#104bee", "#00ffee"],
    speed: 1.3,
  },
];
function createGradient(ctx, x, y, width, height, colors) {
  let gradient = ctx.createLinearGradient(x, y, x + width, y + height);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);
  return gradient;
}

function animate() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  elements.forEach((el) => {
    // Configuración de sombra
    ctx2.shadowColor = "rgba(255, 255, 255, 0.5)"; // Color de la sombra (negro semi-transparente)
    ctx2.shadowBlur = 10; // Desenfoque de la sombra
    ctx2.shadowOffsetX = 5; // Desplazamiento horizontal de la sombra
    ctx2.shadowOffsetY = 6; // Desplazamiento vertical de la sombra

    // Crear degradado y dibujar rectángulo con sombra
    ctx2.fillStyle = createGradient(
      ctx2,
      el.x,
      el.y,
      el.width,
      el.height,
      el.colors
    );
    ctx2.fillRect(el.x, el.y, el.width, el.height);

    // Movimiento del elemento
    el.y += el.speed;
    if (el.y > canvas2.height) el.y = -el.height;
  });

  requestAnimationFrame(animate);
}

// Ajustar tamaño del canvas si la ventana cambia
function resizeCanvas2() {
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;
  animate(); // Volver a animar después de redimensionar
}

window.addEventListener("resize", resizeCanvas2);
resizeCanvas2();
animate();


const projectItems = document.querySelectorAll(".project-item");
const projectDetails = document.getElementById("project-details");

// Mapeo de iconos
const iconMap = {
    HTML: "fab fa-html5",
    CSS: "fab fa-css3-alt",
    JavaScript: "fab fa-js-square",
    Java: "devicon-java-plain",
    Spring: "devicon-spring-plain",
    IA: "fas fa-brain", // Icono genérico para IA
};

// Datos de los proyectos (puedes cambiarlos dinámicamente)
const projectsData = [
    {
        image: "img/sitio-wb.png",
        title: "Proyecto 1",
        description: `LexiWeb es una plataforma diseñada para facilitar el acceso y comprensión de la legislación. Desarrollado con tecnologías modernas como HTML, CSS, JavaScript este sitio permite a los usuarios buscar, visualizar y analizar normativas de manera practica.\n\n
        El desarrollo de LexiWeb implicó desafíos como la optimización del rendimiento y la creación de una interfaz accesible para todos. Gracias a un enfoque centrado en el usuario, logramos un sistema fácil de navegar.\n\n
        `,
        skills: ["HTML", "CSS", "JavaScript", "IA"],
        link: "https://alanq549.github.io/mejora-de-trabajo/",
    },
    {
        image: "./img/crypto-dashboard.png",
        title: "crypto-dashboard",
        description: "", /// poner una descripcipn del proyecto 
        skills: ["HTML", "CSS", "JavaScript", "react"],
        link: "https://crypto-dashboard-puce.vercel.app/",/// enlace del proyecto
    },
    {
        image: "ruta/a/imagen2.jpg",
        title: "Proyecto 2",
        description: "", /// poner una descripcipn del proyecto 
        skills: ["HTML", "CSS", "JavaScript", "Java"],
        link: "",/// enlace del proyecto
    },
];

// Función para actualizar el lado derecho
function updateProjectDetails(index) {
    const project = projectsData[index];
    const projectImage = document.querySelector(".project-image");
    const projectOverlay = document.querySelector(".project-overlay");
    const projectDescription = document.querySelector(".project-description p");
    const projectSkills = document.querySelector(".project-skills ul");

    projectImage.style.backgroundImage = `url('${project.image}')`;
    projectOverlay.querySelector("h2").textContent = project.title;
    projectOverlay.querySelector("a").href = project.link;
    projectDescription.textContent = project.description;

    // Actualizar habilidades
    projectSkills.innerHTML = project.skills
        .map(
            (skill) =>
                `<li><i class="${iconMap[skill]}"></i> ${skill}</li>`
        )
        .join("");
}

// Mostrar el lado derecho al hacer hover en la lista
projectItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
        projectDetails.style.opacity = "1"; // Mostrar el lado derecho
        updateProjectDetails(index); // Actualizar la información
    });
});