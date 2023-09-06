export default function AccessibilityBar() {
    const handleFontSize = (value: number) => {
        if (value === 0) {
            document.documentElement.style.fontSize = "16px";
            return;
        }
        const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const newFontSize = rootFontSize + value;
        document.documentElement.style.fontSize = `${newFontSize}px`;
    };

    const handleInvertColors = () => {
        const html = document.querySelector("html");
        if (html) {
            if (html.style.filter === "invert(100%)") {
                html.style.filter = "invert(0%)";
                return;
            }
            html.style.filter = "invert(100%)";
        }
    };

    return (
        <div className="">
            <ul className="flex justify-between items-center w-full bg-white px-10 z-10 text-black">
                <div className="flex gap-4">
                    <li>
                        <a className="font-bold text-sm" accessKey="1" href="#body">
                            Conteúdo [1]
                        </a>
                    </li>
                    <li>
                        <a className="font-bold text-sm" accessKey="2" href="#menu">
                            Menu [2]
                        </a>
                    </li>
                </div>
                <div className="flex gap-4">
                    <li>
                        <a className="font-bold text-sm increase active" href="#" accessKey="6" onClick={() => handleFontSize(1)}>
                            Aumentar Fonte [6]
                        </a>
                    </li>
                    <li>
                        <a className="font-bold text-sm decrease active" href="#" accessKey="7" onClick={() => handleFontSize(-1)}>
                            Diminuir Fonte [7]
                        </a>
                    </li>
                    <li>
                        <a className="font-bold text-sm decrease active" href="#" accessKey="7" onClick={() => handleFontSize(0)}>
                            Tamanho Normal [8]
                        </a>
                    </li>
                    <li>
                        <a className="font-bold text-sm" href="#" accessKey="9" onClick={() => handleInvertColors()}>
                            Alto Contraste [9]
                        </a>
                    </li>
                </div>
            </ul>
        </div>
    );
}
