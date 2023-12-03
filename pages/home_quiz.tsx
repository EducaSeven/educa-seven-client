import Link from "next/link";
import { AiOutlinePlusCircle } from "react-icons/ai";
import CardQuiz from "../components/card_quiz";
import { useEffect, useState } from "react";
import axios from "axios";

interface Questionario {
	quesId: string;
	quesTittle: string;
	quesDescription: string;
}

export default function HomeQuiz() {
	const [ProviderQuestionario, setProviderQuestionario] = useState<Questionario[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const resp = (await axios.get("http://192.168.3.66:3000/questionario/all")).data;
			setProviderQuestionario(resp);
		};

		fetchData();
	}, []);

	return (
		<div className="w-full px-12">
			<Link href="/create_quiz" legacyBehavior className={"flex justify-end"}>
				<AiOutlinePlusCircle
					style="color: #03A4FF"
					className="w-10 h-10 justify-end right-6 top-6 text-blue-500 cursor-pointer"
				></AiOutlinePlusCircle>
			</Link>
			<div className="w-full my-10 grid gap-y-12 gap-x-12 2xl:grid-cols-3 xl:grid-cols-2 justify-center">
				{ProviderQuestionario.map((question, index) => (
					<CardQuiz
						key={index}
						quesId={question.quesId}
						quesTittle={question.quesTittle}
						quesDescription={question.quesDescription}
					/>
				))}
			</div>
		</div>
	);
}
