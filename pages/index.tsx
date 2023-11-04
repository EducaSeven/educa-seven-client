import {Inter} from 'next/font/google'
import DashboardTable from "@/components/dashboard_table";
import Title from "@/components/title";


const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <div className={'p-12'}>
            <Title>Dashboard</Title>

            <DashboardTable className={'mt-12'}/>
        </div>
    )
}
