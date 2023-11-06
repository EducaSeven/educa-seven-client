import Link from "next/link";
import { AiOutlinePlusCircle } from "react-icons/ai";
import CardQuiz from "../components/card_quiz";

let ProviderQuestionario: Questionario[] = getQuiz();
ProviderQuestionario = ProviderQuestionario.concat(ProviderQuestionario);

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

function getQuiz() {
  let quiz: Questionario[] = [];

  const quiz1 = {
    quesId: 1,
    quesTittle: "Quiz de teste 1",
    quesDescription: "Quiz de teste para testar o quiz 1",
    quesImage: "https://source.unsplash.com/random",
    perguntas: [
      {
        pergId: 1,
        pergTittle: "Primeira pergunta",
        pergDescription: "Primeira pergunta",
        respostas: [
          {
            respId: 1,
            respDescription: "Primeira resposta",
            respResposta: true,
          },
          {
            respId: 2,
            respDescription: "Segunda resposta",
            respResposta: false,
          },
        ],
      },
      {
        pergId: 2,
        pergTittle: "Segunda pergunta",
        pergDescription: "Segunda pergunta",
        respostas: [
          {
            respId: 1,
            respDescription: "Primeira resposta",
            respResposta: true,
          },
          {
            respId: 2,
            respDescription: "Segunda resposta",
            respResposta: false,
          },
        ],
      },
    ],
  };

  quiz.push(quiz1);

  const quiz2 = {
    quesId: 2,
    quesTittle: "Quiz de teste 2",
    quesDescription: "Quiz de teste para testar o quiz 2",
    quesImage: "https://source.unsplash.com/random",
    perguntas: [
      {
        pergId: 1,
        pergTittle: "Primeira pergunta",
        pergDescription: "Primeira pergunta",
        respostas: [
          {
            respId: 1,
            respDescription: "Primeira resposta",
            respResposta: true,
          },
          {
            respId: 2,
            respDescription: "Segunda resposta",
            respResposta: false,
          },
        ],
      },
      {
        pergId: 2,
        pergTittle: "Segunda pergunta",
        pergDescription: "Segunda pergunta",
        respostas: [
          {
            respId: 1,
            respDescription: "Primeira resposta",
            respResposta: true,
          },
          {
            respId: 2,
            respDescription: "Segunda resposta",
            respResposta: false,
          },
        ],
      },
    ],
  };

  quiz.push(quiz2);

  return quiz;
}

export default function HomeQuiz() {
  return (
    <div className="w-full px-12 flex">
      <Link href="/create_quiz" legacyBehavior className="absolute">
        <a>
          <AiOutlinePlusCircle
            style="color: #03A4FF"
            className="w-10 h-10 absolute right-6 top-6 text-blue-500 cursor-pointer"
          ></AiOutlinePlusCircle>
        </a>
      </Link>
      <div className="w-full my-10 grid gap-y-12 gap-x-12 2xl:grid-cols-3 xl:grid-cols-2 justify-center">
        {ProviderQuestionario.map((question, index) => (
          <CardQuiz key={index} questionario={question} />
        ))}
      </div>
    </div>
  );
}
