import { createContext } from "preact";
import { useContext, useReducer } from "preact/hooks";

const GlobalContext = createContext();

const initialState = {
    query: "",
    tables: [{
        name: "SA1",
        filial: "01",
        posfix: "030"
    },
    {
        name: "SE1",
        filial: "01",
        posfix: "030"
    }
],
    variables: [],
    options: {
        parseExp: true,
        indent: true,
        prefix: "PROTHEUS",
        addPrefix: true,

    },
    errors: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_QUERY":
            return { ...state, query: action.payload };
        case "SET_TABLES":
            return { ...state, tables: action.payload };
        case "SET_VARIABLES":
            return { ...state, variables: action.payload };
        case "SET_OPTIONS":
            return { ...state, options: action.payload };
        case "SET_ERRORS":
            return { ...state, errors: action.payload };
        default:
            return state;
    }
};

const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setQuery = (query) => {
        dispatch({ type: "SET_QUERY", payload: query });
    };

    const setTables = (tables) => {
        dispatch({ type: "SET_TABLES", payload: tables });
    };

    const setVariables = (variables) => {
        dispatch({ type: "SET_VARIABLES", payload: variables });
    };

    const setOptions = (options) => {
        dispatch({ type: "SET_OPTIONS", payload: options });
    };

    const setErrors = (errors) => {
        dispatch({ type: "SET_ERRORS", payload: errors });
    };

    return (
        <GlobalContext.Provider
            value={{ state, setQuery, setTables, setVariables, setOptions, setErrors }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export { GlobalContext, GlobalProvider, useGlobalContext };