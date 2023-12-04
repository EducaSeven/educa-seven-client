import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Sidebar from "@/components/sidebar";
import {AuthProvider} from "@/components/AuthProviderComponent";


export default function App({Component, pageProps}: AppProps) {

    if (Component.name === 'Login' || Component.name === 'Register') {
        return <Component {...pageProps}/>
    }

    return (
        <>
            <AuthProvider>
                <Sidebar>
                    <Component {...pageProps}/>
                </Sidebar>
            </AuthProvider>
        </>
    )
}


