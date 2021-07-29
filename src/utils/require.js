const require = (function require() {
    const modules = {};

    return {
        register(name, deps, fn) {
            const resolved = [];
            for (let i = 0; i < deps.length; i += 1) {
                resolved.push(modules[deps[i]]);
            }
            modules[name] = fn.apply(fn, resolved);
        },
        resolve(module) {
            return modules[module];
        }
    };
})();
