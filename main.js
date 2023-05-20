export const customVariables = [];

function handleAddVariables() {
    const name = document.getElementById("variable-name-input").value;
    const value = document.getElementById("variable-value-input").value;

    if (!name || !value) {
        return;
    }

    const find = customVariables.find((variable) => variable.name === name);

    if (find) {
        find.value = value;
        find.handle = () => value;
    } else {
        customVariables.push({
            name,
            pattern: new RegExp(`%Exp:${name}%`, "g"),
            value,
            handle: () => value,
        });
    }

    document.getElementById("variables").value = customVariables.reduce(
        (acc, variable) => {
            return `${acc}\n${variable.name} = ${variable.value}`;
        },
        ""
    );

    document.getElementById("variable-name-input").value = "";
    document.getElementById("variable-value-input").value = "";
}

document
    .getElementById("add-variables")
    .addEventListener("click", handleAddVariables);
