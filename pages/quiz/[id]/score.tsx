import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';



export default function Score() {

    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>Score by id: {id}</h1>
        </div>
    )
}

export async function getServerSideProps(context) {

    return {
        props: {
            id: context.query.id
        }
    }
}