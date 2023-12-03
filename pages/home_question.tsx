import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import ModalCreateQuiz from "../components/modal_create_question";
interface Pergunta {
	pergId: string;
	pergTitle: string;
	pergDescription: string;
	respostas: Resposta[];
}

interface Resposta {
	respDescription: string;
	respResposta: boolean;
}
export default function HomeQuestion() {
	const [providerTablePerguntas, setProviderTablePerguntas] = useState<Pergunta[]>([]);
	const [pergunta, setPergunta] = useState<Pergunta>({
		pergId: "",
		pergTitle: "",
		pergDescription: "",
		respostas: [],
	});

	useEffect(() => {
		getPerguntas();
	}, []);

	function getPerguntas() {
		const fetchData = async () => {
			try {
				const resp = await axios.get("http://localhost:4000/pergunta/all");
				setProviderTablePerguntas(resp.data);
			} catch (error) {
				console.error("Erro ao encontrar perguntas");
			}
		};

		fetchData();
	}

	const onEdit = (perguntaEdit: Pergunta) => {
		if (perguntaEdit.pergId) {
			setPergunta(perguntaEdit);
		}
	};

	function onDelete(quesId: string) {
		return async () => {
			try {
				const resp = await axios.get("http://localhost:4000/pergunta/delete/" + quesId);

				if (resp.status === 200) {
					await getPerguntas();
				} else {
					console.error("Falha ao deletar pergunta");
				}
			} catch (error) {
				console.error("Erro ao deletar pergunta");
			}
		};
	}

	function handleModalSubmit() {
		const label = document.getElementById("my-drawer-4") as HTMLElement;
		label.click();
	}

	return (
		<div className="w-full sm:p-0 xl:px-14 flex flex-col gap-6 mt-6 h-full">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">Perguntas</h1>
				<Link href="/create_question" legacyBehavior>
					<button className="btn btn-primary">Criar pergunta</button>
				</Link>
			</div>
			<div className="overflow-auto">
				<table className="table">
					<thead>
						<tr>
							<th>Nome</th>
							<th>Descrição</th>
						</tr>
					</thead>
					<tbody>
						{providerTablePerguntas.map((question) => (
							<tr key={question.pergId}>
								<td>{question.pergTitle}</td>
								<td>{question.pergDescription}</td>
								<th className="flex justify-end gap-2">
									<label htmlFor="my-drawer-4" className="btn btn-ghost btn-xs" onClick={() => onEdit(question)}>
										details
									</label>
									<button className="btn btn-error btn-xs" onClick={onDelete(question.pergId)}>
										delete
									</button>
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="drawer drawer-end w-fit">
				<input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
				<div className="drawer-side z-9999">
					<label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
					<ul className="menu w-fit min-h-full bg-gray-800 text-base-content">
						<ModalCreateQuiz
							pergId={pergunta.pergId}
							pergDescription={pergunta.pergDescription}
							pergTitle={pergunta.pergTitle}
							respostas={pergunta.respostas}
							titleForms="Editar pergunta"
							modal={true}
							onClose={handleModalSubmit}
						></ModalCreateQuiz>
					</ul>
				</div>
			</div>
		</div>
	);
}
