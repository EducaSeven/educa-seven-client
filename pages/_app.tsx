import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Sidebar from "@/components/sidebar";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Sidebar/>
            <div className={'p-4 pt-8 sm:ml-64 sm:mt-0'}>
                <Component {...pageProps}/>
            </div>
        </>
    )
}
