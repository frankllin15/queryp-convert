import { useState } from "preact/hooks";
import { useGlobalContext } from "../context/GlobalProvider";
import { Button } from "./common/Button";

export const AsideTableMenu = () => {
    const {
        state: { tables },
        setTables,
    } = useGlobalContext();

    const handleAddTable = (e) => {
        e.preventDefault();
        if (!e.target.name.value) {
            return;
        }

        let newTables = [...tables];

        const tableExists = newTables.find(
            (table) =>
                table.name?.toUpperCase() === e.target.name.value?.toUpperCase()
        );

        if (tableExists) {
            alert("Tabela já existe");
            return;
        }

        newTables.push({
            name: e.target.name.value,
            posfix: e.target.posfix.value,
            filial: e.target.filial.value,
        });

        setTables(newTables);

        e.target.name.value = "";
        e.target.posfix.value = "";
        e.target.filial.value = "";
    };

    const handleRemoveTable = (name) => {
        let newTables = [...tables];

        newTables = newTables.filter((table) => {
            return table.name !== name;
        });

        setTables(newTables);
    };

    return (
        <aside class="flex flex-col bg-red-00 h-[calc(100vh-100px)] border rounded-md p-2">
            <div class="flex  flex-1 flex-col">
                <label class="font-bold text-center mb-2" for="query">
                    Tabelas
                </label>
                <div class="flex flex-col gap-2">
                    {tables.map((table) => {
                        return (
                            <TableItem
                                onRemove={handleRemoveTable}
                                name={table.name}
                                posfix={table.posfix}
                                filial={table.filial}
                            />
                        );
                    })}
                </div>
            </div>

            <hr class="my-2"></hr>
            <form
                onSubmit={handleAddTable}
                class="flex w-full flex-col gap-2  mt-auto"
            >
                <label class="font-bold" for="query">
                    Nova Tabela
                </label>
                <input
                    placeholder="nome"
                    type="text"
                    name="name"
                    class="border"
                ></input>
                <input
                    placeholder="posfix"
                    type="text"
                    name="posfix"
                    id="table-posfix-input"
                    class="border"
                ></input>
                <input
                    placeholder="filial"
                    type="text"
                    name="filial"
                    id="table-filial-input"
                    class="border"
                ></input>
                <Button type="submit">Adicionar</Button>
            </form>
        </aside>
    );
};

const TableItem = ({ name, posfix, filial, onRemove }) => {
    const {
        state: { tables },
        setTables,
    } = useGlobalContext();
    const handleUpdate = (e) => {
        if (readOnly) return;
        let newTables = [...tables];

        const tableIndex = newTables.findIndex((table) => table.name === name);

        newTables[tableIndex] = {
            ...newTables[tableIndex],
            [e.target.name]: e.target.value,
        };

        setTables(newTables);

        setReadOnly(true);
    };

    const [readOnly, setReadOnly] = useState(true);

    const handleClickInput = (e) => {
        if (e.detail <= 1) return;
        setReadOnly(false);
    };

    return (
        <details class="border rounded-md p-2">
            <summary class="font-bold flex justify-between p-2">
                <span>{name}</span>
                <Button title="Remover" variant="danger" onClick={() => onRemove(name)}>
                    X
                </Button>
            </summary>
            <div class="flex flex-col gap-2">
                <input
                    title="Dois cliques para editar"
                    onBlur={handleUpdate}
                    onClick={handleClickInput}
                    readOnly={readOnly}
                    className={readOnly ? "outline-none" : ""}
                    placeholder="posfix"
                    type="text"
                    name="posfix"
                    value={posfix}
                    onChange={handleUpdate}
                ></input>
                <input
                    title="Dois cliques para editar"
                    onBlur={handleUpdate}
                    onClick={handleClickInput}
                    readOnly={readOnly}
                    className={readOnly ? "outline-none" : ""}
                    placeholder="filial"
                    type="text"
                    name="filial"
                    id="table-filial-input"
                    value={filial}
                    onChange={handleUpdate}
                ></input>
            </div>
        </details>
    );
};
