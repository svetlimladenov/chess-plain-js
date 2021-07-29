require.register("Button", ["$"], ($) => {
    // Here we write the actual code
    const Button = {
        init(height, width, label) {
            this.label = label;
            this.height = height || 30;
            this.width = width || 50;
        },
        render($where) {
            const btn = $("<button>").text(this.label);
            $where.append(btn);
        }
    };

    // here we expose an object with methods
    return Button;
});

require.register("ClassButton", ["$"], ($) => {
    function ClassButton(height, width, label) {
        this.label = label;
        this.height = height || 30;
        this.width = width || 50;
    }

    ClassButton.prototype.render = function render($where) {
        const btn = $("<button>").text(this.label);
        $where.append(btn);
    };

    return ClassButton;
});
