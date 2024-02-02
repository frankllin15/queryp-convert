
export function addPrefix(str, prefix = "") {
    // replace all occurence with prefix

    return str.replace(/([a-z]{1}[A-Z0-9]{2})(\d{3})/gi, prefix + "." + "$&");
}
const query = `
Select 	se1.e1_num as numeracao,
se1.e1_parcela as parcela
from %Table:SE1% se1
where se1.e1_filial = %xFilial:SE1%
    INNER JOIN %Table:SE1% se2 ON se2.e1_num = se1.e1_num
  and se1.e1_num = %Exp:cDoc%
  and se1.e1_tipo = 'DP'
  and se1.%notdel%
order by 2 desc

`;

export function parseExpression(str = "", customVariables, tablesInfo) {
    let errors = [];
    const posfix = "030";
    const defaultPrefix = "PROTHEUS.";
    const expressions = [
        {
            pattern: /%notdel%/g,
            value: "d_e_l_e_t_ = ' '",
            handle: () => "d_e_l_e_t_ = ' '",
        },
        {
            pattern: /%Table:([a-z]{1}[A-Z0-9]{2})%/gi,
            value: "$1" + posfix,
            handle: (match) => {
                const table = tablesInfo.find(
                    (table) =>
                        table.name?.toLowerCase() === match[1]?.toLowerCase()
                );

                if (!table) {
                    errors.push({
                        message: `Tabela ${match[1]} não encontrada.`,
                        expression: match[0],
                    });
                }
                return table?.name ? table.name + table?.posfix : match[0];
            },
        },
        {
            pattern: /%xFilial:([a-z]{1}[A-Z0-9]{2})%/gi,

            handle: (match) => {
                const table = tablesInfo.find(
                    (table) => table.name === match[1]
                );

                if (!table) {
                    errors.push({
                        message: `Tabela ${match[1]} não encontrada.`,
                        expression: match[0],
                    });
                }

                return table?.filial ? `'${table.filial}'` : match[0];
            },
        },
        {
            pattern: /%Exp:(\w+)%/gi,
            handle: (match) => {
                const [expression, varName] = match;

                const find = customVariables.find(
                    (exp) => exp.name === varName
                );

                if (find) {
                    return find.handle(match);
                }

                errors.push({
                    message: `Variável ${varName} não encontrada.`,
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
