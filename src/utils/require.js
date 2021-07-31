const require = (function require() {
    const modules = {};

    return {
        register(name, deps, fn) {
            const resolved = [];
            for (let i = 0; i < deps.length; i += 1) {
                resolved.push(modules[deps[i]]);
            }
            const currentModule = fn.apply(fn, resolved); // our module is some object, returned by the fn(..) functions
            modules[name] = currentModule;
        },
        resolve(module) {
            return modules[module]; // we return an object, this object can be a function, because functions are objects
        }
    };
})();
