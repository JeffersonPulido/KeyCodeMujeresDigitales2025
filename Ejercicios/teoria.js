// // CONSTANTES
// console.log("=== CONST - LET  ===");

// let nombre = "Jefferson";

// console.log(nombre)

// nombre = "pulido"

// console.log(nombre)

// const saludar = (nombre = 'Invitado') => {
//     console.log(`Hola, ${nombre}`)
// }

// saludar(nombre)
// // If - Else

// console.log("=== IF - ELSE  ===");
// const numero = 10;

// if (isNaN(numero)) {
//     console.log("Entrada invalida, no es un numero");
// } else if (numero % 2 === 0) {
//     console.log("Es par");
// } else {
//     console.log("Es impar");
// }

// // Switch
// console.log("=== SWITCH  ===");

// const option = 32;

// switch (option) {
//     case 1:
//         console.log("Medicina general");
//         break;
//     case 2:
//         console.log("Odontologia");
//         break;
//     case 3:
//         console.log("Psicologia");
//         break;
//     default:
//         console.log("Esa opcion no existe en este hospital");
//         break;
// }

// // For
// console.log("=== FOR  ===");

// for (let index = 0; index <= 5; index++) {
//     console.log(`Vuelta numero: ${index}`);
// }

// // While
// console.log("=== WHILE  ===");

// let contador = 1;

// while (contador <= 10) {
//     console.log(`Vamos en el numero: ${contador}`)
//     contador++;
// }

// // Spread
// console.log("=== SPREAD  ===");
// const a = [1,2,3,4,5]
// const b = [6,7,8,9,10]
// const c = ['Perro', 'Gato', 'Loro']

// console.log(...a, ...b)

// const user = {
//     'name': 'Jefferson',
//     'lastName': 'Pulido',
//     'age': 23
// }

// const food = {
//     'drink': 'Monster',
//     'candy': 'chips'
// }

// console.log({
//     ...user,
//     food: {...food}
// })

// RESULTADO
// {
//     'name': 'Jefferson',
//     'lastName': 'Pulido',
//     'age': 23,
//     food: {
//         'drink': 'Monster',
//         'candy': 'chips'
//     }
// }


// // Ternary operator
// console.log("=== SPREAD  ===");

if (age > 12) {
    console.log('Mayor de edad')
} else {
    console.log("menor de edad")
}

age > 12 ? console.log('Mayor de edad') : console.log("Menor de edad")