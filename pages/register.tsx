import { useState } from 'react';
import axios from 'axios';
import Toast from "@/components/toast";
import {router} from "next/client";
import {useRouter} from "next/router";
import Link from "next/link";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const router = useRouter();


    function submitLogin(event: any) {
        event.preventDefault();

        axios.post('http://localhost:4000/login', { username, password })
            .then(response => {
                const data = response.data;
                if (data.success) {
                    router.push('/dashboard');
                } else {
                    setErrorText('Usuário ou senha incorretos');
                    setError(true);

                }
            })
            .catch(error => {
                setErrorText('Erro ao fazer login');
                setError(true);
            });
    }

    return (

        <div className={"w-full flex flex-col h-screen justify-center items-center space-y-12"}>
            {error && (
                <Toast title={errorText} type={"alert-error"} onClose={() => setError(false)}/>
            )}
            <h1 className={"text-6xl font-bold font-LexendDeca text-white"}>Educa7</h1>
            <p>Faça seu login e comece a planejar suas aulas!</p>
            <form className={"flex flex-col gap-4"} onSubmit={submitLogin}>
                <input
                    type="text"
                    placeholder="Usuário"
                    className={"w-72 p-2 bg-white rounded-md"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className={"w-72 p-2 bg-white rounded-md"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Link href={"/login"}>
                    <div className={"text-blue-500 hover:link"}>Entrar</div>
                </Link>
                <button
                    type="submit"
                    className={"w-72 py-2 rounded-md bg-[#20DF7F] text-white"}
                >
                    Registrar
                </button>
            </form>
        </div>
    )
}
