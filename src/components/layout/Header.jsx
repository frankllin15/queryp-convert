export const Header = () => {

    return (
        <header class="flex justify-between items-center px-8 py-4 shadow-sm">
        <div class="flex items-end gap-4">
            <h1 class="text-2xl text-blue-500 font-bold inline-block">
                Conversor de query
            </h1>
            <p class="text-blue-500 underline decoration-dashed underline-offset-4">
                Conversor de queries do protheus para o formato do SQL
            </p>
        </div>
        <div>
            <a
                href="https://github.com/frankllin15/queryp-convert/issues"
                target="_blank"
                class="text-blue-500 font-semibold"
            >
                Sugerir melhoria
            </a>
        </div>
    </header>
    )
}