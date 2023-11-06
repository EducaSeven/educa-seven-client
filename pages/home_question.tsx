import { useEffect, useState } from "react";
import Link from "next/link";
import { type } from "os";
import { time } from "console";

export default function HomeQuestion() {
  interface Pergunta {
    pergId: number;
    pergTittle: string;
    pergDescription: string;
    respostas: Resposta[];
  }

  interface Resposta {
    respId: number;
    pergId: number;
    respDescription: string;
    respResposta: boolean;
  }

  interface Toast {
    description: string;
    type: string;
  }

  const [toast, setToast] = useState<Toast[]>([{ description: "", type: "" }]);

  const [providerTablePerguntas, setProviderTablePerguntas] = useState<
    Pergunta[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: Pergunta[] = await getPergunta();
      setProviderTablePerguntas(data);
    };

    fetchData();
  }, []);

  function getPergunta() {
    let pergunta1 = {
      pergId: 1,
      pergTittle: "Primeira pergunta",
      pergDescription: "Primeira pergunta",
      respostas: [
        {
          respId: 1,
          pergId: 1,
          respDescription: "Primeira resposta",
          respResposta: true,
        },
        {
          respId: 2,
          pergId: 1,
          respDescription: "Segunda resposta",
          respResposta: false,
        },
      ],
    };

    let pergunta2 = {
      pergId: 2,
      pergTittle: "Segunda pergunta",
      pergDescription: "Segunda pergunta",
      respostas: [
        {
          respId: 1,
          pergId: 2,
          respDescription: "Primeira resposta",
          respResposta: true,
        },
        {
          respId: 2,
          pergId: 2,
          respDescription: "Segunda resposta",
          respResposta: false,
        },
      ],
    };

    let arrayPerguntas: Pergunta[] = [];
    arrayPerguntas.push(pergunta1);
    arrayPerguntas.push(pergunta2);

    return arrayPerguntas;
  }

  function onEdit(question: Pergunta) {
    return () => {
      toastEmitted([`Editando pergunta '${question.pergTittle}'`], "success");
    };
  }

  function onDelete(question: Pergunta) {
    return () => {
      toastEmitted([`Deletando pergunta '${question.pergTittle}'`], "success");
    };
  }

  function onCreate() {
    toastEmitted(["Criando pergunta"], "success");
  }

  function toastEmitted(descriptions: string[], type: string = "warning") {
    const newToasts = descriptions.map((description) => ({
      description,
      type,
    }));
    setToast((prevToasts) => [...prevToasts, ...newToasts]);
    automaticallyDeleteToast(newToasts.length);
  }

  function automaticallyDeleteToast(numberOfToasts: number) {
    setTimeout(() => {
      setToast((prevToasts) => prevToasts.slice(numberOfToasts));
    }, 5000);
  }

  function clearToast() {
    setToast((prevToasts) => prevToasts.slice(1));
  }

  return (
    <div className="w-full px-14 flex flex-col gap-6 mt-6 h-full">
      <div
        className="toast toast-top toast-end z-50 cursor-pointer"
        onClick={clearToast}
      >
        {toast.map((toast, index) => (
          <div
            key={index}
            className={`alert ${toast.type == "warning" ? "alert-info" : ""} ${
              toast.type == "success" ? "alert-success" : ""
            }`}
          >
            <span>{toast.description}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Perguntas</h1>
        <Link href="/create_question" legacyBehavior>
          <button className="btn btn-primary" onClick={onCreate}>
            <a>Criar pergunta</a>
          </button>
        </Link>
      </div>
      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {providerTablePerguntas.map((question) => (
              <tr key={question.pergId}>
                <th>{question.pergId}</th>
                <td>{question.pergTittle}</td>
                <td>{question.pergDescription}</td>
                <th className="flex justify-end gap-2">
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={onEdit(question)}
                  >
                    details
                  </button>
                  <button
                    className="btn btn-error btn-xs"
                    onClick={onDelete(question)}
                  >
                    delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
