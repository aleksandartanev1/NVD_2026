// Шаблон 2: Curry
// Што е curry?
//
//     Обична функција ги прима сите аргументи одеднаш:
//
//     js
function add(a, b, c) { return a + b + c; }
add(1, 2, 3); // 6

// Curried верзијата ги прима еден по еден:
//
//     js
curriedAdd(1)(2)(3); // 6
// Чекор 1: рачно, без генерална функција
// js
function curriedAdd(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        };
    };
}

console.log(curriedAdd(1)(2)(3)); // 6


function curry(fn) {
    function collect(collected) {
        return function(arg) {
            const all = [...collected, arg];

            if (all.length >= fn.length) {
                return fn(...all);
            }
            return collect(all);
        }
    }

    return collect([]);
}

const dragon = (name, size, element) =>
    `${name} is a ${size} dragon that breathes ${element}!!!!`;

const curriedDragon = curry(dragon);
console.log(curriedDragon('Spyro')('tiny')('fire'))