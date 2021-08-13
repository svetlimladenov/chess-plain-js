class Button {
    constructor(props) {
        this.props = props;
    }

    render() {
        const button = document.createElement("button");
        button.textContent = this.props.title;
        button.addEventListener("click", this.props.onClick);

        return button;
    }
}

export default Button;
