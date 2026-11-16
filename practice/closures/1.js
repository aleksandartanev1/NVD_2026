function makeCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

const c1 = makeCounter();

c1();
c1();

console.log(c1());

function outer() {
    let b = 2;
    return function inner() {
        console.log(b);
    };
}

const f = outer();  // outer заврши, нормално b би требало да исчезне...
f();


function make() {
    let x = 10;
    return {
        inc: () => ++x,
        get: () => x
    }
}

const m = make();
m.inc(); m.inc();
console.log(m.get())


function once(fn) {
    let called = false;
    let result;

    return function() {
        if (!called) {
            called = true;
            result = fn(...arguments);
        }
        return result;
    }

}

const init = once(() => {
    console.log("Иницијализирам...");
    return 42;
})

console.log(init());
console.log(init());
console.log(init());



function callLimit(name, n) {
    let counter = 0;
    let result;

    return function() {
        if (counter < n) {
            counter++;
            result = name(...arguments)
            return result;
        }
        return 'limit reached';
    }

}

const hi = callLimit(name => 'Hi ' + name, 2);
console.log(hi('Ana'));
console.log(hi('Bojan'));
console.log(hi('Ivo'));

(function() {
    console.log("she see money all around me")
})

const counter = (function () {
    let count = 0;                 // приватно
    return {
        inc: () => ++count,
        get: () => count
    };
})();                            // ← () значи веднаш се повикува

counter.inc();
counter.inc();
console.log(counter.get()); // 2
console.log(counter.count); // undefined ← приватно е

for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 0);

const a = (function () {
    let x = 0;
    return () => ++x;
})();
console.log(a(), a(), a());