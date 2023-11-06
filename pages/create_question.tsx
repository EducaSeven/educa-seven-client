import { useState } from "react";

export default function CreateQuestion() {
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

  const [pergunta, setPergunta] = useState<Pergunta>({
    pergId: 0,
    pergTittle: "",
    pergDescription: "",
    respostas: [],
  });

  const [respostas, setRespostas] = useState<Resposta[]>([
    { respId: 0, pergId: 0, respDescription: "", respResposta: false },
    { respId: 0, pergId: 0, respDescription: "", respResposta: false },
    { respId: 0, pergId: 0, respDescription: "", respResposta: false },
    { respId: 0, pergId: 0, respDescription: "", respResposta: false },
  ]);

  const [toast, setToast] = useState<Toast[]>([{ description: "", type: "" }]);

  function handleRespostaChange(index: number, description: string) {
    const updatedRespostas = [...respostas];
    updatedRespostas[index].respDescription = description;
    setRespostas(updatedRespostas);
  }

  function handleRespostaCheckboxChange(index: number) {
    const updatedRespostas = [...respostas];
    updatedRespostas[index].respResposta =
      !updatedRespostas[index].respResposta;
    setRespostas(updatedRespostas);
  }

  function validateAnswers(respostas: Resposta[]): boolean {
    const trueAnswersCount = respostas.filter(
      (resposta) => resposta.respResposta
    ).length;
    return trueAnswersCount === 1;
  }

  function onSubmit() {
    const isValid = validateAnswers(respostas);

    if (isValid) {
      const perguntaSubmit: Pergunta = {
        ...pergunta,
        respostas: respostas.filter((resposta) => resposta.respDescription),
      };

      toastEmitted(["Pergunta salvada com sucesso"], "success");
    } else {
      toastEmitted(["Selecione uma resposta correta"], "warning");
    }
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
        <h1 className="text-2xl font-bold">Criar nova pergunta</h1>
      </div>
      <div className="w-full flex justify-between align-center gap-12">
        <div className="form-control w-full max-w-xl ">
          <label className="label" htmlFor="pergunta">
            <span className="label-text">Título da pergunta</span>
          </label>
          <input
            id="pergunta"
            type="text"
            value={pergunta.pergTittle}
            className="input input-bordered w-full max-w-xl"
            onChange={(e) =>
              setPergunta({ ...pergunta, pergTittle: e.target.value })
            }
          />
        </div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Descrição</span>
        </label>
        <textarea
          value={pergunta.pergDescription}
          className="textarea textarea-bordered h-24"
          onChange={(e) =>
            setPergunta({ ...pergunta, pergDescription: e.target.value })
          }
        ></textarea>
      </div>
      <div className="w-full flex justify-between align-center gap-2 flex-col">
        {respostas.map((resposta, index) => (
          <div
            key={index}
            className="w-full flex justify-between align-center gap-12"
          >
            <div className="form-control w-full max-w-full">
              <label className="label">
                <span className="label-text">{`Resposta ${index + 1}`}</span>
              </label>
              <textarea
                value={resposta.respDescription}
                className="textarea textarea-bordered h-24"
                onChange={(e) => handleRespostaChange(index, e.target.value)}
              ></textarea>
            </div>
            <div className="form-control self-end">
              <label className="label cursor-pointer">
                <span className="label-text">Resposta correta</span>
                <input
                  type="checkbox"
                  checked={resposta.respResposta}
                  className="checkbox checkbox-primary"
                  onChange={() => handleRespostaCheckboxChange(index)}
                />
              </label>
            </div>
          </div>
        ))}
        <button
          className="btn btn-primary self-end w-[100px] mt-8"
          onClick={onSubmit}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
