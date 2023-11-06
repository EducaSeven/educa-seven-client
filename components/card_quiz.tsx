import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  questionario: Questionario;
}

interface Questionario {
  quesId: number;
  quesTittle: string;
  quesDescription: string;
  quesImage: string;
  perguntas: Perguntas[];
}

interface Perguntas {
  pergId: number;
  pergTittle: string;
  pergDescription: string;
  respostas: Resposta[];
}

interface Resposta {
  respId: number;
  respDescription: string;
  respResposta: boolean;
}

export default function CardQuiz(props: Props) {
  const router = useRouter();

  const handleViewClick = () => {
    const queryParams = { quesId: props.questionario.quesId };

    router.push({
      pathname: "/create_quiz",
      query: queryParams,
    });
  };
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl min-w-[28rem]">
      <figure>
        <img
          className="object-cover w-full h-48 rounded-t-lg"
          src={props.questionario.quesImage}
          alt={props.questionario.quesTittle}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.questionario.quesTittle}</h2>
        <p>{props.questionario.quesDescription}</p>
        <div className="card-actions justify-end">
          <Link href="/create_question" legacyBehavior>
            <button className="btn btn-primary" onClick={handleViewClick}>
              Visualizar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
