// BASICO

// const numero = 10

// if (isNaN(numero)) {
//     console.log("Entrada invalida, no es un numero");
// } else if (numero % 2 === 0) {
//     console.log("Es par");
// } else {
//     console.log("Es impar");
// }

// AVANZADO
const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Escribe un numero: ", (n) => {
    const numero = Number(n);

    if (isNaN(numero)) {
        console.log("Entrada invalida, no es un numero");
    } else if (numero % 2 === 0) {
        console.log("Es par");
    } else {
        console.log("Es impar");
    }

    rl.close();
});
