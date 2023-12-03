import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface Props {
	pergId: string;
	pergTitle: string;
	pergDescription: string;
	respostas: Resposta[];
	titleForms: string;
	modal: boolean;
	onClose: () => void;
}

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

export default function ModalCreateQuiz(props: Props) {
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

	useEffect(() => {
		if (props.pergId) {
			let perguntaEdit: Pergunta = {
				pergId: props.pergId,
				pergTitle: props.pergTitle,
				pergDescription: props.pergDescription,
				respostas: props.respostas,
			};

			setRespostas(perguntaEdit.respostas);
			setPergunta(perguntaEdit);
		}
	}, [props.pergId, props.pergTitle, props.pergDescription, props.respostas]);

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

			const resp = await axios.post("http://localhost:4000/pergunta", perguntaSubmit);

			props.onClose();
			// toastEmitted(["Pergunta salvada com sucesso"], "success");
		} else {
			// toastEmitted(["Selecione uma resposta correta"], "warning");
		}
	}

	return (
		<div className={` ${!props.modal ? "w-full px-14 flex flex-col gap-6 mt-6 h-full" : ""}`}>
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">{props.titleForms}</h1>
				{props.modal == true && (
					<IoMdCloseCircleOutline
						className="text-2xl cursor-pointer"
						onClick={() => {
							props.onClose();
						}}
					></IoMdCloseCircleOutline>
				)}
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
						className="input text-xs input-bordered w-full max-w-xl"
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
					className="textarea text-xs textarea-bordered h-24"
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
								className="textarea text-xs textarea-bordered h-24"
								onChange={(e) => handleRespostaChange(index, e.target.value)}
							></textarea>
						</div>
						<div className="form-control self-end">
							<label className="label cursor-pointer">
								<span className="label-text">Resposta correta</span>
								<input
									type="checkbox"
									checked={resposta.respResposta}
									className="checkbox text-xs checkbox-primary"
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
