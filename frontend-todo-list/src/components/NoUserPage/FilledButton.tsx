export default function FilledButton({text, onClick}: { text: string, onClick: () => void }) {

    return <button onClick={onClick} className={"text-sm font-semibold text-white bg-primary rounded-sm px-4 py-2"}>
        {text}
    </button>
}