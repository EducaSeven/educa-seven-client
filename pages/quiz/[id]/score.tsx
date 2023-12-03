import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';


interface Score {
    id: number;
    nome: string;
    pontuacao: number;
    created_at: Date;
}

interface ScoreProps {
    data: Score;
}

export default function Score(props: ScoreProps) {

    console.log(props.data);

    return (
        <div>
            <h1>Score by id: </h1>
        </div>
    )
}

export async function getServerSideProps(context: any) {
    let data = null;

    try {
         data = await fetch(`http://localhost:4000/pontuacao/${context.query.id}`);


    } catch (error) {
        console.error("Error:", error);
    }

    return {
        props: {
            data: data
        }
    }
}