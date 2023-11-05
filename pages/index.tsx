import {Inter} from 'next/font/google'
import DashboardTable from "@/components/dashboard_table";
import Title from "@/components/title";


const inter = Inter({subsets: ['latin']})

export default function Home(props: any) {
    return (
        <div className={'p-12'}>
            <Title>Dashboard</Title>

            <DashboardTable className={'mt-12'} persons={props.persons}/>
        </div>
    )
}

export async function getStaticProps() {
    // const res = await fetch('https://jsonplaceholder.typicode.com/users')
    // const persons = await res.json()

    return {


        props: {
        //     generating fake data
            persons: [
                {
                    name: 'John Doe',
                    job: 'Software Engineer',
                    favoriteColor: 'Blue'
                },
                {
                    name: 'Jane Doe',
                    job: 'Software Engineer',
                    favoriteColor: 'Red'
                },
                {
                    name: 'John Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Green'
                },
                {
                    name: 'Jane Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Yellow'
                },
                {
                    name: 'John Doe',
                    job: 'Software Engineer',
                    favoriteColor: 'Blue'
                },
                {
                    name: 'Jane Doe',
                    job: 'Software Engineer',
                    favoriteColor: 'Red'
                },
                {
                    name: 'John Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Green'
                },
                {
                    name: 'Jane Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Yellow'
                },
                {
                    name: 'John Doe',
                    job: 'Software Engineer',
                    favoriteColor: 'Blue'
                },
                {
                    name: 'Jane Doe',
                    job: 'Software Engineer',
                    favoriteColor: 'Red'
                },
                {
                    name: 'John Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Green'
                },
                {
                    name: 'Jane Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Yellow'
                },
                {
                    name: 'John Doe',
                    job: 'Software Engineer',
                    favoriteColor: 'Blue'
                },
                {
                    name: 'Jane Doe',
                    job: 'Software Engineer',
                    favoriteColor: 'Red'
                },
                {
                    name: 'John Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Green'
                },
                {
                    name: 'Jane Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Yellow'
                },
                {
                    name: 'John Doe',
                    job: 'Software Engineer',
                    favoriteColor: 'Blue'
                },
                {
                    name: 'Jane Doe',
                    job: 'Software Engineer',
                    favoriteColor: 'Red'
                },
                {
                    name: 'John Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Green'
                },
                {
                    name: 'Jane Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Yellow'

                },
                {
                    name: 'Jane Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Yellow'

                },
                {
                    name: 'Jane Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Yellow'

                },
                {
                    name: 'Jane Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Yellow'

                },
                {
                    name: 'Jane Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Yellow'

                },
                {
                    name: 'Jane Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Yellow'

                },
                {
                    name: 'Jane Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Yellow'

                },
                {
                    name: 'Jane Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Yellow'

                },
                {
                    name: 'Jane Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Yellow'

                },
                {
                    name: 'Jane Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Yellow'

                },
                {
                    name: 'Jane Smith',
                    job: 'Software Engineer',
                    favoriteColor: 'Yellow'

                }
            ],


        },
        revalidate: 10,


    }
}