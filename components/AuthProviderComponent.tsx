import axios from "axios";
import {createContext, useEffect, useState} from "react";
import {setCookie, parseCookies} from "nookies";
import Router from "next/router";

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    signIn: (data: SignInData) => Promise<void>;
};

type SignInData = {
    usuario: string;
    senha: string;
};
type User = {
    id: string;
    nome:string
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({children}: { children: any }) {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;

    async function signIn({usuario, senha}: SignInData) {
        try {
            const {id, nome} = (await axios.post("http://localhost:4000/user/login", {usuario, senha}))
                .data;

            console.log(id, nome)
            if (id) {
                setCookie(undefined, "user_id", id, {
                    maxAge: 60 * 30 * 1, // half hour
                });

                setCookie(undefined, "user_name", nome)
               setUser({id, nome});

                Router.push(`/`);

            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
            {children}
        </AuthContext.Provider>
    );
}