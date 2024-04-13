import {Card, CardBody, Spinner} from "@nextui-org/react";

const TableLoading = () => {
	return <div className={'h-full w-full bg-white/40 flex flex-col items-center justify-center'}>
		<Card>
			<CardBody>
				<Spinner size="sm"/>
			</CardBody>
		</Card>
	</div>
}

export default TableLoading