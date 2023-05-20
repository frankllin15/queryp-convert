import { format } from "sql-formatter";
import { customVariables } from "./main.js";


const tablesInfo = [
    {
        name: "ZAM",
        filial: '"01"',
        posfix: "050",
    },
    {
        name: "SA1",
        filial: '"02"',
        posfix: "030",
    },
    {
        name: "SE1",
        filial: '"03"',
        posfix: "030",
    },
];
function addPreFix(str) {
    const prefix = "PROTHEUS.";
    // replace all occurence with prefix

    return str.replace(/([a-z]{1}[A-Z0-1]{2})(\d{3})/gi, prefix + "$&");
}
const query = `
Select 	se1.e1_num as numeracao,
se1.e1_parcela as parcela
from %Table:SE1% se1
where se1.e1_filial = %xFilial:SE1%
  and se1.e1_num = %Exp:cDoc%
  and se1.e1_tipo = 'DP'
  and se1.%notdel%
order by 2 desc

`;

function parseExpression(str = "") {
    let errors = [];
    const posfix = "030";
    const expressions = [
        {
            pattern: /%notdel%/g,
            value: "d_e_l_e_t_ = ' '",
            handle: () => "d_e_l_e_t_ = ' '",
        },
        {
            pattern: /%Table:([a-z]{1}[A-Z0-1]{2})%/gi,
            value: "$1" + posfix,
            handle: (match) => {
                const table = tablesInfo.find(
                    (table) => table.name === match[1]
                );
                return table?.name ? table.name + table?.posfix : match[0];
            },
        },
        {
            pattern: /%xFilial:([a-z]{1}[A-Z0-1]{2})%/gi,

            handle: (match) => {
                const table = tablesInfo.find(
                    (table) => table.name === match[1]
                );
                return table?.filial || match[0];
            },
        },
        {
            pattern: /%Exp:(\w+)%/gi,
            handle: (match) => {
                const [expression, varName] = match
               

                const find = customVariables.find(
                    (exp) => exp.name === varName
                );

                if (find) {
                    return find.handle(match);
                }

                errors.push({
                    message: `Variável ${varName} não encontrada. Adicione no dicionário de expressões.`,
                    expression,
                });

                return match[0];
            },
        },
    ];

    // replace all occurence with corresponding value in dict

    const parsedQuery = expressions.reduce((acc, expression) => {
        const matches = acc.matchAll(expression.pattern);

        for (const match of matches) {
            acc = acc.replace(match[0], expression.handle(match));
        }

        return acc;
    }, str);

    return [parsedQuery, errors];
}

function onConvert() {

    const input = document.getElementById("input").value;

    let [parsedQuery, errors] = parseExpression(input);

    handleErros(errors);

    let output = addPreFix(parsedQuery);

    // output = format(output, {
    //     language: "mysql",
    //     tabWidth: 4,
    //     keywordCase: "upper",
    //     linesBetweenQueries: 2,
        
    // });

    document.getElementById("output").value = output;
}

function handleErros(erros) {
    const errorElement = document.getElementById("errors");

    if (erros.length) {
        errorElement.innerHTML = erros
            .map((error) => `<li>${error.message}</li>`)
            .join("");
        errorElement.classList.remove("hidden");
    } else {
        errorElement.classList.add("hidden");
    }
}

document.getElementById("convert").addEventListener("click", onConvert);
