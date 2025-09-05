const questions = [
  // --- BÁSICAS ---
  { q: "¿Qué comando muestra la versión de Node.js?", options: ["node -v", "npm init", "git --version", "code --version"], answer: 0 },
  { q: "¿Qué comando muestra la versión de Git?", options: ["git -v", "git version", "git --version", "git status"], answer: 2 },
  { q: "¿Cómo mostramos un mensaje en consola en JS?", options: ["print()", "console.log()", "echo()", "alert()"], answer: 1 },
  { q: "¿Qué operador se usa para asignar un valor en JS?", options: ["=", "==", "===", "=>"], answer: 0 },
  { q: "¿Cuál es un tipo de dato primitivo en JS?", options: ["Array", "Object", "Number", "Function"], answer: 2 },
  { q: "¿Qué comando inicializa un repositorio en Git?", options: ["git start", "git init", "git new", "git create"], answer: 1 },
  { q: "¿Qué símbolo se usa para comentarios de una línea en JS?", options: ["#", "//", "<!-- -->", "/* */"], answer: 1 },
  { q: "¿Qué extensión de archivo usamos para código JavaScript?", options: [".java", ".js", ".jsx", ".json"], answer: 1 },
  { q: "¿Qué comando lista archivos en la terminal?", options: ["ls", "dir", "show", "list"], answer: 0 },
  { q: "¿Cuál es el comando para limpiar la terminal?", options: ["clear", "cls", "reset", "exit"], answer: 0 },
  { q: "¿Qué función muestra una alerta en el navegador?", options: ["alert()", "console.log()", "warn()", "popup()"], answer: 0 },
  { q: "¿Qué comando crea una carpeta desde la terminal?", options: ["make", "mkdir", "newdir", "create"], answer: 1 },
  { q: "¿Cómo se declara una variable que no cambia en JS?", options: ["var", "let", "const", "static"], answer: 2 },
  { q: "¿Qué comando sube cambios a GitHub?", options: ["git upload", "git push", "git send", "git publish"], answer: 1 },
  { q: "¿Qué método convierte una cadena a mayúsculas en JS?", options: [".upper()", ".toUpperCase()", ".uppercase()", ".toCaps()"], answer: 1 },

  // --- INTERMEDIAS ---
  { q: "¿Qué operador compara valor y tipo en JS?", options: ["==", "===", "=", "!="], answer: 1 },
  { q: "¿Qué hace 'npm init -y'?", options: ["Crea proyecto con config por defecto", "Inicia servidor", "Instala dependencias", "Muestra versión de npm"], answer: 0 },
  { q: "¿Qué comando crea una nueva rama en Git?", options: ["git branch nombre", "git checkout nombre", "git create branch", "git new nombre"], answer: 0 },
  { q: "¿Qué devuelve typeof null en JS?", options: ["null", "object", "undefined", "string"], answer: 1 },
  { q: "¿Qué ciclo se ejecuta siempre al menos una vez?", options: ["for", "while", "do...while", "foreach"], answer: 2 },
  { q: "¿Qué método de array filtra elementos?", options: ["map()", "forEach()", "filter()", "reduce()"], answer: 2 },
  { q: "¿Qué comando trae cambios desde el remoto sin fusionar?", options: ["git clone", "git fetch", "git pull", "git merge"], answer: 1 },
  { q: "¿Qué palabra clave declara funciones en JS?", options: ["method", "function", "func", "def"], answer: 1 },
  { q: "¿Qué hace 'git status'?", options: ["Muestra historial", "Muestra estado del repo", "Crea commit", "Descarga cambios"], answer: 1 },
  { q: "¿Qué propiedad de array da la cantidad de elementos?", options: [".size", ".length", ".count", ".items"], answer: 1 },
  { q: "¿Cuál de estos es un bucle en JS?", options: ["repeat", "for", "iterate", "loop"], answer: 1 },
  { q: "¿Qué método convierte JSON a objeto?", options: ["JSON.stringify()", "JSON.parse()", "toJSON()", "parse.JSON()"], answer: 1 },
  { q: "¿Qué comando descarga un repo de GitHub?", options: ["git pull", "git clone", "git fetch", "git download"], answer: 1 },
  { q: "¿Qué método une elementos de un array en un string?", options: ["concat()", "join()", "merge()", "combine()"], answer: 1 },
  { q: "¿Qué significa 'pwd' en la terminal?", options: ["Print Working Directory", "Process Working Data", "Present Work Display", "Path Windows Directory"], answer: 0 },

  // --- DIFÍCILES ---
  { q: "¿Qué salida produce: console.log([] == false);", options: ["true", "false", "undefined", "Error"], answer: 0 },
  { q: "¿Cómo deshacer el último commit en Git sin perder cambios?", options: ["git reset --hard HEAD~1", "git reset --soft HEAD~1", "git checkout HEAD~1", "git revert HEAD"], answer: 1 },
  { q: "¿Qué método NO modifica el array original?", options: ["push()", "splice()", "map()", "pop()"], answer: 2 },
  { q: "¿Qué hace 'use strict' en JavaScript?", options: ["Optimiza el código", "Evita errores comunes", "Activa TS", "Nada"], answer: 1 },
  { q: "¿Qué significa 'origin' en Git?", options: ["Nombre del repositorio local", "Alias del remoto", "Rama principal", "Token de acceso"], answer: 1 },
  { q: "¿Cuál es el resultado de 0.1 + 0.2 en JS?", options: ["0.3", "0.30000000000000004", "Error", "NaN"], answer: 1 },
  { q: "¿Qué comando combina ramas en Git?", options: ["git combine", "git merge", "git join", "git rebase"], answer: 1 },
  { q: "¿Qué método convierte un objeto en string JSON?", options: ["JSON.parse()", "JSON.stringify()", "toJSON()", "Object.toString()"], answer: 1 },
  { q: "¿Qué comando lista las ramas en Git?", options: ["git branches", "git branch", "git show-branch", "git list"], answer: 1 },
  { q: "¿Qué devuelve typeof NaN?", options: ["NaN", "number", "undefined", "object"], answer: 1 },
  { q: "¿Qué diferencia hay entre 'git pull' y 'git fetch'?", options: ["Son lo mismo", "Pull descarga y fusiona, fetch solo descarga", "Fetch borra commits", "Pull crea rama"], answer: 1 },
  { q: "¿Qué salida da console.log(typeof []); ?", options: ["object", "array", "list", "undefined"], answer: 0 },
  { q: "¿Qué significa 'HEAD' en Git?", options: ["Último commit actual", "Nombre del remoto", "Archivo raíz", "Un branch eliminado"], answer: 0 },
  { q: "¿Qué comando reescribe la historia de commits?", options: ["git amend", "git rebase", "git reset", "git fix"], answer: 1 },
  { q: "¿Qué salida da: console.log('5' - 2); ?", options: ["3", "'52'", "NaN", "Error"], answer: 0 },
];


// --- Lógica del quiz ---
let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = `${currentQuestion + 1}. ${q.q}`;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("div");
    btn.textContent = opt;
    btn.classList.add("option");
    btn.onclick = () => selectAnswer(btn, i);
    optionsEl.appendChild(btn);
  });

  nextBtn.disabled = true;
}

function selectAnswer(btn, i) {
  const q = questions[currentQuestion];
  const options = document.querySelectorAll(".option");

  options.forEach(option => option.onclick = null);

  if (i === q.answer) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("incorrect");
    options[q.answer].classList.add("correct");
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  document.getElementById("quiz-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `Respuestas correctas: ${score} de ${questions.length}`;
}

loadQuestion();
