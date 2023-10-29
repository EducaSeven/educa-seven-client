import {Inter} from 'next/font/google'
import Sidebar from "@/components/sidebar";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <main className={``}>
            <Sidebar/>
            <div className={`p-4 sm:ml-64`}>
                <h1>daskdasd</h1>
            </div>
        </main>
    )
}
