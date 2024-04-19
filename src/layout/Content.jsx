import {Card, CardBody} from "@nextui-org/react";
import {Outlet} from "react-router-dom";

const Content = () => {
	return <Card className={'h-full w-full overflow-y-auto p-3'}>
		<CardBody>
			<Outlet/>
		</CardBody>
	</Card>
}

export default Content