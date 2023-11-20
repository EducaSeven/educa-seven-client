import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
interface Props {
	quesId: string;
	quesTittle: string;
	quesDescription: string;
}

export default function CardQuiz(props: Props) {
	const router = useRouter();
	const handleViewClick = () => {
		const queryParams = { quesId: props.quesId };

		router.push({
			pathname: "/create_quiz",
			query: queryParams,
		});
	};

	return (
		<div className="card card-compact w-96 bg-base-100 shadow-xl min-w-[28rem]">
			<figure>
				<img
					className="object-cover w-full h-48 rounded-t-lg"
					src="https://source.unsplash.com/random"
					alt={props.quesTittle}
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title">{props.quesTittle}</h2>
				<p>{props.quesDescription}</p>
				<div className="card-actions justify-end">
					<Link href="/create_question" legacyBehavior>
						<button className="btn btn-primary" onClick={handleViewClick}>
							Visualizar
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
