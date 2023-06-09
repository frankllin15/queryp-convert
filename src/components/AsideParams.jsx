import { useGlobalContext } from "../context/GlobalProvider";
import { Button } from "./common/Button";

export const AsideParams = () => {
    const {
        state: { errors, options, variables },
        setOptions,
        setVariables,
    } = useGlobalContext();

    const handleAddVariable = (e) => {
        e.preventDefault();
        if (e.target.name.value === "" || e.target.value.value === "") return;

        let newVariables = [...variables];

        const value = e.target.value.value;
        const findVariable = newVariables.find((variable) => {
            return variable.name === e.target.name.value;
        });

        if (findVariable) {
            findVariable.handle = () => value;
            findVariable.value = value;
            setVariables(newVariables);
        } else {
            newVariables.push({
                name: e.target.name.value,
                value,
                handle: function () {
                    return value;
                },
            });
        }
        setVariables(newVariables);
        e.target.name.value = "";
        e.target.value.value = "";
    };

    const handleRemoveVariable = (name) => {
        let newVariables = [...variables];

        newVariables = newVariables.filter((variable) => {
            return variable.name !== name;
        });

        setVariables(newVariables);
    };

    return (
        <aside className="flex flex-col w-full h-full gap-4 text-sm pt-6">
            <div className="flex  flex-col border rounded-md p-2">
                <label
                    className="font-bold text-center text-blue-500 mb-2"
                    for="query"
                >
                    Parâmetros
                </label>
                <div className="mb-3 flex flex-col">
                    <label className="font-bold" for="query">
                        Prefixo:
                    </label>
                    <input
                        onChange={(e) =>
                            setOptions({ ...options, prefix: e.target.value })
                        }
                        type="text"
                        name="prefix"
                        id="prefix"
                        value={options.prefix}
                        className="border"
                    ></input>
                </div>
                {/* <div className="flex flex-col">
                    <label className="font-bold" for="query">
                        Empresa
                    </label>
                    <input
                        type="text"
                        name="company"
                        id="company"
                        value="01"
                        className="border"
                    ></input>
                </div> */}
            </div>
            <form
                onSubmit={handleAddVariable}
                className="flex flex-col  border rounded-md p-2 gap-2"
            >
                <label
                    className="font-bold text-center text-blue-500 mb-2"
                    for="query"
                >
                    Variáveis
                </label>
                <div className="flex flex-col gap-2 ">
                    <input
                        placeholder="nome"
                        type="text"
                        name="name"
                        className="border"
                    ></input>
                    <input
                        placeholder="valor"
                        type="text"
                        name="value"
                        className="border"
                    ></input>
                    <Button type="submit">Adicionar</Button>
                </div>
                <ul className="flex flex-col gap-2">
                    {variables.map((variable) => {
                        return (
                            <li className="flex justify-between border p-2 rounded-sm">
                                <span className="font-bold">
                                    {variable.name} = {variable.value}
                                </span>

                                <Button
                                    onClick={() => handleRemoveVariable(variable.name)}
                                    name={variable.name}
                                    variant="danger"
                                >
                                    x
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </form>
            <div className="flex flex-col  border rounded-md p-2 gap-2">
                <label
                    className="font-bold text-center text-blue-500 mb-2"
                    for="query"
                >
                    Log
                </label>

                <ul className="flex flex-col gap-2">
                    {errors.map((error) => {
                        return (
                            <li className="text-red-500 border p-2 rounded-sm">
                                {error.message}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
};
