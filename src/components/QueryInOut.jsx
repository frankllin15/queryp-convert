import { useState } from "preact/hooks";
import { useGlobalContext } from "../context/GlobalProvider";
import { addPrefix, parseExpression } from "../util/format";

export const QueryInOut = () => {
    const { state, setOptions, setErrors } = useGlobalContext();
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    console.log(state);

    const handleCahngeOptions = (e) => {
        setOptions({ ...state.options, [e.target.name]: e.target.checked });
    };

    const handleConvert = () => {
        let query = input;

        if (state.options.parseExp) {
            let [parsedQuery, errors] = parseExpression(
                input,
                state.variables,
                state.tables
            );

            query = parsedQuery;

            setErrors(errors);
        }

        if (state.options.addPrefix) {
            query = addPrefix(query, state.options.prefix);
        }

        setOutput(query);
    };

    return (
        <main class="flex flex-col w-full ">
            <div class="flex flex-1 flex-col gap-4 w-full">
                <div class="flex flex-1 flex-col">
                    <label class="font-bold" for="query">
                        Input Query
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        spellCheck="false"
                        class="border rounded-md px-2 py-1"
                        name="input"
                        id="input"
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>

                <div class="flex items-center justify-between border shadow-sm rounded-md p-3 text-sm">
                    <div class="flex flex-row items-center gap-4">
                        <input
                            checked={state.options.parseExp}
                            onChange={handleCahngeOptions}
                            type="checkbox"
                            name="parseExp"
                            id="parse-exp"
                        ></input>
                        <label for="option1">Interpretar expressões</label>

                        <input
                            checked={state.options.indent}
                            onChange={handleCahngeOptions}
                            type="checkbox"
                            name="indent"
                            id="indent"
                        ></input>
                        <label for="option2">Indentar</label>

                        <input
                            checked={state.options.prefix}
                            onChange={handleCahngeOptions}
                            type="checkbox"
                            name="prefix"
                            id=""
                        ></input>
                        <label for="option3">Prefixo</label>
                    </div>

                    <button
                        onClick={handleConvert}
                        id="convert"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Converter
                    </button>
                </div>
                <div class="flex flex-1 flex-col relative">
                    <label class="font-bold" for="query">
                        Query result
                    </label>
                    <textarea
                        spellCheck="false"
                        value={output}
                        class="border rounded-md px-2 py-1"
                        name="output"
                        id="output"
                        cols="30"
                        rows="10"
                    ></textarea>
                    {output.length > 0 && (
                        <button
                            onClick={() =>
                                navigator.clipboard.writeText(output)
                            }
                            class="absolute top-8 right-3"
                        >
                            Copiar
                        </button>
                    )}
                </div>
            </div>

            <div class="mt-4">
                <ul class="text-red-600" id="errors"></ul>
            </div>
        </main>
    );
};
