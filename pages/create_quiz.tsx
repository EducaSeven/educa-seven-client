import {useRouter} from "next/router";
import {useState, useEffect} from "react";

export default function CreateQuiz() {
    const router = useRouter();
    const {quesId} = router.query;

    useEffect(() => {
        if (quesId) {
            console.log("ID do questionário:", quesId);
        }
    }, [quesId]);

    interface Questionario {
        quesId: number;
        quesTittle: string;
        quesDescription: string;
        quesImage: string;
        perguntas: Pergunta[];
    }

    interface Pergunta {
        pergId: number;
        quesId: number;
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


    const [toast, setToast] = useState<Toast[]>([]);

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

    const [quiz, setQuiz] = useState<Questionario>({
        quesId: 0,
        quesTittle: "",
        quesDescription: "",
        quesImage: "",
        perguntas: [],
    });

    const [quizTitle, setQuizTitle] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [quizImage, setQuizImage] = useState("");

    let providerPerguntas: Pergunta[] = getPergunta();
    let pergunta: Pergunta;

    function setPergunta(value: number) {
        if (value === 0) return;

        const selectedPergunta = providerPerguntas.find(
            (question) => question.pergId === value
        );

        if (selectedPergunta) {
            pergunta = selectedPergunta;
        }
    }

    function onAdd() {
        if (pergunta) {
            setProviderTablePerguntas((prevPerguntas) => [
                ...prevPerguntas,
                pergunta,
            ]);
        }
    }

    function getPergunta() {
        let perguntas: Pergunta[] = [];

        const pergunta1 = {
            pergId: 1,
            quesId: 1,
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

        perguntas.push(pergunta1);

        const pergunta2 = {
            pergId: 2,
            quesId: 1,
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

        perguntas.push(pergunta2);

        return perguntas;
    }

    function onSubmit() {
        const quesIdNumber = quesId
            ? parseInt(Array.isArray(quesId) ? quesId[0] : quesId, 10)
            : 0;

        const newQuiz = {
            quesId: quesIdNumber,
            quesTittle: quizTitle,
            quesDescription: quizDescription,
            quesImage: quizImage,
            perguntas: providerTablePerguntas,
        };

        if (newQuiz) {
            setQuiz(newQuiz);
            console.log(newQuiz);
            toastEmitted(["Quiz criado com sucesso!"], "success");
        } else {
            toastEmitted(["Erro ao criar quiz"], "warning");
        }
    }

    function onDeletePergunta(pergunta: Pergunta) {
        return () => {
            const updatedPerguntas = providerTablePerguntas.filter(
                (question) => question.pergId !== pergunta.pergId
            );
            setProviderTablePerguntas(updatedPerguntas);
        };
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
                <h1 className="text-2xl font-bold">Criar novo Quiz</h1>
                <button className="btn btn-primary" onClick={onSubmit}>
                    Salvar
                </button>
            </div>
            <div className="w-full flex justify-between align-center gap-12">
                <div className="form-control w-full max-w-xl ">
                    <label className="label">
                        <span className="label-text">Título</span>
                    </label>
                    <input
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        type="text"
                        className="input input-bordered w-full max-w-xl"
                    />
                </div>
                <div className="form-control w-full max-w-md self-end">
                    <input
                        value={quizImage}
                        onChange={(e) => setQuizImage(e.target.value)}
                        type="file"
                        className="file-input file-input-bordered w-full max-w-md"
                    />
                </div>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Descrição</span>
                </label>
                <textarea
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    className="textarea textarea-bordered h-24"
                ></textarea>
            </div>
            <div className="flex flex-row gap-6">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Pergunta</span>
                    </label>
                    <select
                        onChange={(e) => setPergunta(parseInt(e.target.value, 10))}
                        className="select select-bordered"
                        defaultValue="0"
                    >
                        <option value={0} disabled selected>
                            Selecione uma pergunta
                        </option>
                        {providerPerguntas.map((question) => (
                            <option value={question.pergId} key={question.pergId}>
                                {question.pergTittle}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-primary self-end" onClick={onAdd}>
                    Adicionar
                </button>
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
                                    className="btn btn-error btn-xs"
                                    onClick={onDeletePergunta(question)}
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
