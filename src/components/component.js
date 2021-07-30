require.register("Component", [], () => {
    function Component() {
        this.$element = null;
        this.$parent = null;
    }

    Component.prototype.render = function render($where) {
        this.$parent = $where;
        if (this.$element) {
            this.$parent.append(this.$element);
        }
    };

    return Component;
});

require.register("ObjectComponent", [], () => {
    const Component = {
        init() {
            this.$element = null;
            this.$parent = null;
        },
        setElement($element) {
            this.$element = $element;
        },
        render($where) {
            this.$parent = $where;
            if (this.$element) {
                this.$parent.append(this.$element);
            }
        }
    };

    return Component;
});
