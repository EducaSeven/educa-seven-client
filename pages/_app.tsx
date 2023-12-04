import "@/styles/globals.css";
import type {AppProps} from "next/app";
import Sidebar from "@/components/sidebar";
import {parseCookies} from "nookies";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default function App({Component, pageProps}: AppProps) {
    useEffect(() => {
        const {user_id} = parseCookies();

        if (!user_id && Component.name != 'Login') {

            document.location = "/login";
        }
    });

    if (Component.name === "Login" || Component.name === "Register") {
        return <Component {...pageProps} />;
    }

    return (
        <>
            <Sidebar>
                <Component {...pageProps} />
            </Sidebar>

        </>
    );
}
