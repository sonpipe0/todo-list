export default function NoFillButton({text, onClick}:
    { text: string, onClick: () => void }) {

    return <button onClick={onClick} className={"text-sm font-semibold text-gray-600 rounded-full px-4 py-2"}>
        {text}
    </button>
}
