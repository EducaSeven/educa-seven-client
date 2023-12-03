import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Sidebar from "@/components/sidebar";

export default function App({Component, pageProps}: AppProps) {
    if (Component.name === 'Login' || Component.name === 'Register') {
        return <Component {...pageProps}/>
    }

    return (
        <>
            <Sidebar>
                <Component {...pageProps}/>
            </Sidebar>
        </>
    )
}
