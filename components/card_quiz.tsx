import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
	id: string;
	title: string;
	description: string;
}

export default function CardQuiz(props: Props) {
	const router = useRouter();
	const handleViewClick = () => {
		const queryParams = { id: props.id };

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
					alt={props.title}
				/>
			</figure>
			<div className="card-body">
				<div className="flex justify-between">
					<h2 className="card-title">{props.title}</h2>
					<div className="badge badge-secondary h-6">{props.id}</div>
				</div>
				<p>{props.description}</p>
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
