import { useState } from "preact/hooks";
import "./app.css";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { AsideParams } from "./components/AsideParams";
import { QueryInOut } from "./components/QueryInOut";
import { AsideTableMenu } from "./components/AsideTableMenu";
import { GlobalProvider } from "./context/GlobalProvider";

export function App() {

    return (
        <>
            <Header />
            <GlobalProvider>
                <div class="w-full grid grid-cols-[minmax(200px,300px)_1fr_minmax(200px,300px)] px-8 py-4 gap-2">
                    <AsideParams />
                    <QueryInOut />
                    <AsideTableMenu />
                </div>
            </GlobalProvider>

            <Footer />
        </>
    );
}
