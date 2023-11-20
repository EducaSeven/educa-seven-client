import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
interface Pergunta {
	pergId: string;
	pergTittle: string;
	pergDescription: string;
}
export default function HomeQuestion() {
	const router = useRouter();
	const [providerTablePerguntas, setProviderTablePerguntas] = useState<Pergunta[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const resp = (await axios.get("http://192.168.3.66:3000/pergunta/all")).data;
			setProviderTablePerguntas(resp);
		};

		fetchData();
	}, []);

	const onEdit = (Pergunta: Pergunta) => {
		const queryParams = { pergId: Pergunta.pergId };

		router.push({
			pathname: "/create_question",
			query: queryParams,
		});
	};

	function onDelete(question: Pergunta) {
		return () => {
			// toastEmitted([`Deletando pergunta '${question.pergTittle}'`], "success");
		};
	}

	function onCreate() {
		// toastEmitted(["Criando pergunta"], "success");
	}

	return (
		<div className="w-full px-14 flex flex-col gap-6 mt-6 h-full">
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
									<button className="btn btn-ghost btn-xs" onClick={() => onEdit(question)}>
										details
									</button>
									<button className="btn btn-error btn-xs" onClick={onDelete(question)}>
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
