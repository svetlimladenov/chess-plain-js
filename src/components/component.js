require.register("Component", [], () => {
    function Component() {
        this.$element = null;
        this.$parent = null;
    }

    Component.prototype.render = function render($where) {
        if (!$where) {
            throw new Error("No render parent element spicified");
        }

        if (!this.$element) {
            throw new Error("No element created for display");
        }

        this.$parent = $where;
        this.$parent.append(this.$element);
    };

    Component.prototype.setElement = function setElement($element) {
        this.$element = $element;
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
            if (!$where) {
                throw new Error("No render parent element spicified");
            }

            if (!this.$element) {
                throw new Error("No element created for display");
            }

            this.$parent = $where;
            this.$parent.append(this.$element);
        }
    };

    return Component;
});
