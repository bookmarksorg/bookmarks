export default function Login() {
    return (
        <div>
            <title>Login</title>
            <link rel="icon" href="/favicon.ico" />
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                    <h1 className="text-6xl font-bold">BookMarks</h1>
                    <p className="mt-3 text-2xl">Junte-se a comunidade!</p>
                    <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                        <div className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                            <h3 className="text-2xl font-bold">Login &rarr;</h3>
                            <p className="mt-4 text-xl">Entre com sua conta do Google</p>
                        </div>
                        <div className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                            <h3 className="text-2xl font-bold">Cadastre-se &rarr;</h3>
                            <p className="mt-4 text-xl">Crie uma conta no BookMarks</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
