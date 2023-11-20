import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

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

export default function CreateQuestion() {
	const [pergunta, setPergunta] = useState<Pergunta>({
		pergId: "",
		pergTitle: "",
		pergDescription: "",
		respostas: [],
	});
	const [respostas, setRespostas] = useState<Resposta[]>([
		{ respDescription: "", respResposta: false },
		{ respDescription: "", respResposta: false },
		{ respDescription: "", respResposta: false },
		{ respDescription: "", respResposta: false },
	]);
	const router = useRouter();
	const { pergId } = router.query;

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (pergId) {
					const response = await axios.get(`http://192.168.3.66:3000/pergunta/${pergId}`);
					const questionData: Pergunta = response.data;
					setPergunta(questionData);
					setRespostas(questionData.respostas);
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchData();
	}, [pergId]);

	function handleRespostaChange(index: number, description: string) {
		const updatedRespostas = [...respostas];
		updatedRespostas[index].respDescription = description;
		setRespostas(updatedRespostas);
	}

	function handleRespostaCheckboxChange(index: number) {
		const updatedRespostas = [...respostas];
		updatedRespostas[index].respResposta = !updatedRespostas[index].respResposta;
		setRespostas(updatedRespostas);
	}

	function validateAnswers(respostas: Resposta[]): boolean {
		const trueAnswersCount = respostas.filter((resposta) => resposta.respResposta).length;
		return trueAnswersCount === 1;
	}

	async function onSubmit() {
		const isValid = validateAnswers(respostas);

		if (isValid) {
			const perguntaSubmit: Pergunta = {
				...pergunta,
				respostas: respostas.filter((resposta) => resposta.respDescription),
			};

			// const resp = await axios.post("http://192.168.3.66:3000/pergunta", perguntaSubmit);

			console.log(perguntaSubmit);

			// toastEmitted(["Pergunta salvada com sucesso"], "success");
		} else {
			// toastEmitted(["Selecione uma resposta correta"], "warning");
		}
	}

	return (
		<div className="w-full px-14 flex flex-col gap-6 mt-6 h-full">
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
						value={pergunta.pergTitle}
						className="input input-bordered w-full max-w-xl"
						onChange={(e) => setPergunta({ ...pergunta, pergTitle: e.target.value })}
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
					onChange={(e) => setPergunta({ ...pergunta, pergDescription: e.target.value })}
				></textarea>
			</div>
			<div className="w-full flex justify-between align-center gap-2 flex-col">
				{respostas.map((resposta, index) => (
					<div key={index} className="w-full flex justify-between align-center gap-12">
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
				<button className="btn btn-primary self-end w-[100px] mt-8" onClick={onSubmit}>
					Salvar
				</button>
			</div>
		</div>
	);
}
