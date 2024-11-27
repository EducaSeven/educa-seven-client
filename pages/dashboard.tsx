import { MdCheck, MdCheckCircle, MdCreate, MdCreateNewFolder, MdLocalFireDepartment, MdVideogameAsset } from "react-icons/md"
import { ResponsiveContainer, LineChart, Line, YAxis } from "recharts";

const data = [
	{ date: "10/12", points: 900 },
	{ date: "11/12", points: 1100 },
	{ date: "12/12", points: 1000 },
	{ date: "13/12", points: 800 },
	{ date: "14/12", points: 700 },
	{ date: "15/12", points: 1500 },
	{ date: "16/12", points: 2000 },
];

export default function Dashboard() {
	return (
		<div className="w-full sm:p-0 xl:px-14 flex flex-col gap-6 mt-6 h-full">
			{/* Header */}
			<header className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">Dashboard</h1>
			</header>

			<div className="pt-8">
				<h2>Informações do usuário:</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
					<div className="h-32 flex flex-col items-center justify-center border text-white rounded-md text-xl border-slate-500">
						<div className="flex items-center gap-2">
							<MdLocalFireDepartment />
							<p>Streak de vitórias</p>
						</div>
						<p>2</p>
					</div>
					{/* Quadrado 2 */}
					<div className="h-32 flex flex-col items-center justify-center border text-white rounded-md text-xl border-slate-500">
						<div className="flex items-center gap-2">
							<MdCheck />
							<p>Respostas Certas</p>
						</div>
						<p>13</p>
					</div>
					{/* Quadrado 3 */}
					<div className="transparent h-32 flex flex-col items-center justify-center border text-white rounded-md text-xl border-slate-500 ">
						<div className="flex items-center gap-2">
							<MdCheckCircle />
							<p>Perguntas Respondidas</p>
						</div>
						<p>20</p>
					</div>
					{/* Quadrado 4 */}
					<div className="border h-32 flex flex-col items-center justify-center text-white rounded-md text-xl border-slate-500 ">
						<div className="flex items-center gap-2">
							<MdCreate />
							<p>Perguntas Criadas</p>
						</div>
						<p>10</p>
					</div>
					{/* Quadrado 5 */}
					<div className="border h-32 flex flex-col items-center justify-center text-white rounded-md text-xl border-slate-500">
						<div className="flex items-center gap-2">
							<MdVideogameAsset />
							<p>Quizzes Jogados</p>
						</div>
						<p>2</p>
					</div>
					{/* Quadrado 6 */}
					<div className="border h-32 flex flex-col items-center justify-center text-white rounded-md text-xl border-slate-500 ">
						<div className="flex items-center gap-2">
							<MdCreateNewFolder />
							<p>Quizzes Criados</p>
						</div>
						<p>2</p>
					</div>
				</div>
			</div>

			<div className="pt-8">
				<div className="pb-8">
					<p>Histórico de pontos:</p>
				</div>
				<ResponsiveContainer width="100%" height={240}>
					<LineChart data={data} style={{ fontSize: 12 }}>
						<YAxis axisLine={false} tickLine={false} />
						<Line type="linear" strokeWidth={2} dataKey="points"></Line>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
