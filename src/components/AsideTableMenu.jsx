import { useGlobalContext } from "../context/GlobalProvider";

export const AsideTableMenu = () => {
    const { state: { tables }, setTables } = useGlobalContext();


    const handleAddTable = (e) => {
        e.preventDefault();
        if (!e.targe.name.value) {
            return;
        }

        let newTables = [...tables];

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
                                name={table.name}
                                posfix={table.posfix}
                                filial={table.filial}
                            />
                        );
                    })}
                    </div>
            </div>

            <hr class="my-2"></hr>
            <form class="flex w-full flex-col gap-2  mt-auto">
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
                <button
                    id="add-tables"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-xs"
                >
                    Adicionar
                </button>
            </form>
        </aside>
    );
};

const TableItem = ({ name, posfix, filial }) => {
    return (
        <details class="border rounded-md p-2">
            <summary class="font-bold">{name}</summary>
            <div class="flex flex-col gap-2">
                <span>Posfix: {posfix}</span>
                <span>Filial: {filial}</span>
            </div>
        </details>
    );
};
