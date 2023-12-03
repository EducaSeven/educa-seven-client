import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

interface Questionario {
	quesTittle: string;
	quesDescription: string;
	quesImage: string;
	perguntas: Pergunta[];
}

interface Perguntas {
	perguntas: Pergunta[];
}
interface Pergunta {
	id: string;
	titulo: string;
}

export default function CreateQuiz() {
	const [providerPerguntas, setProviderPerguntas] = useState<Perguntas>();
	const [providerTablePerguntas, setProviderTablePerguntas] = useState<Pergunta[]>([]);
	const [quizTitle, setQuizTitle] = useState("");
	const [quizDescription, setQuizDescription] = useState("");
	const [quizImage, setQuizImage] = useState("");
	const [perguntaSelecionada, setPerguntaSelecionada] = useState<Pergunta>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const resp = await axios.get("http://localhost:4000/pergunta/all");
				setProviderPerguntas(resp.data);
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchData();
	}, []);

	function setPergunta(value: string) {
		const pergunta = providerPerguntas?.perguntas.find((pergunta) => pergunta.id === value);
		if (pergunta) {
			setPerguntaSelecionada(pergunta);
		}
	}

	function onAdd() {
		setProviderTablePerguntas((prevProviderTablePerguntas) => [
			...(prevProviderTablePerguntas || []),
			...(perguntaSelecionada ? [perguntaSelecionada] : []),
		]);
	}

	function handleProviderPerguntas() {
		let perguntasId: string[] = [];

		providerPerguntas?.perguntas.forEach((pergunta) => {
			perguntasId.push(pergunta.id);
		});

		return perguntasId;
	}

	function onSubmit() {
		let providerPerguntasId: string[] = handleProviderPerguntas();

		const newQuiz = {
			quesId: "",
			quesTittle: quizTitle,
			quesDescription: quizDescription,
			quesImage: quizImage,
			perguntas: providerPerguntasId,
		};
		if (newQuiz.perguntas.length > 0) {
			axios.post("http://localhost:8080/questionario", newQuiz);
			window.location.href = "/home_quiz";
		} else {
			// mensagem de erro
		}
	}

	function onDeletePergunta(pergunta: Pergunta) {
		return () => {
			const updatedPerguntas = providerTablePerguntas.filter((question) => question.id !== pergunta.id);
			setProviderTablePerguntas(updatedPerguntas);
		};
	}

	return (
		<div className="w-full px-14 flex flex-col gap-6 mt-6 h-full">
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
					<select onChange={(e) => setPergunta(e.target.value)} className="select select-bordered" defaultValue="0">
						<option value={0} disabled selected>
							Selecione uma pergunta
						</option>
						{providerPerguntas?.perguntas.map((question) => (
							<option value={question.id} key={question.id}>
								{question.titulo}
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
							<tr key={question.id}>
								<th>{question.id}</th>
								<td>{question.titulo}</td>
								{/* <td>{question.pergDescription}</td> */}
								<th className="flex justify-end gap-2">
									<button className="btn btn-error btn-xs" onClick={onDeletePergunta(question)}>
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
