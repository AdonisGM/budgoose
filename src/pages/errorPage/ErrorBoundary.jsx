import {useNavigate, useRouteError} from "react-router-dom";
import {Accordion, AccordionItem, Button, Card, CardBody, Spacer} from "@nextui-org/react";

const ErrorBoundary = () => {
	let error = useRouteError();

	const navigate = useNavigate();

	return <div className={'flex flex-col items-center justify-center'}>
		<Card className={'max-w-[800px] w-[800px] mt-5'}>
			<CardBody>
				<p className={'text-red-800 text-center font-bold mt-3'}>
					Đã xảy ra lỗi!
				</p>
				<p className={'text-default-600 text-sm text-center'}>
					Nếu điều này vẫn xảy ra hãy liên hệ với admin nhé
				</p>
				<Spacer y={5}/>
				<div className={'flex flex-col items-center justify-center'}>
					<Button
						size="sm"
						className={'bg-default-900 text-white w-fit'}
						onClick={() => {
							navigate(`/`);
						}}
					>
						Trở về trang chủ
					</Button>
				</div>
			</CardBody>
		</Card>
		<Spacer y={2}/>
		<div className={'max-w-[800px] w-[800px]'}>
			<Accordion variant="splitted" className={'px-0'}>
				<AccordionItem aria-label="Xem thêm" title={
					<p className={'text-default-700 text-sm'}>
						Xem thêm ...
					</p>
				}>
					<div className={'bg-gray-100 p-5'}>
						<p className={'text-default-500 text-[10px] font-mono whitespace-pre-line'}>
							{error.stack}
						</p>
					</div>
				</AccordionItem>
			</Accordion>
		</div>

		<Spacer y={16}/>
	</div>;
}

export default ErrorBoundary;