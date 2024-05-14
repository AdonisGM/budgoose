import {useState} from "react";
import packageData from "../../package.json";
import {Card, CardBody} from "@nextui-org/react";

const Header = () => {
	const [version, ] = useState(packageData.version);

	return <Card className={'h-12 flex-grow-0 flex-shrink-0 mb-3'} isPressable={true}>
		<CardBody>
			<div className={'px-2 flex flex-row justify-between items-center overflow-hidden'}>
				<h1 className={'text-default-500 m-0 text-md font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-400'}>Budgoose</h1>
				<p className={'text-default-500 m-0 text-xs font-mono'}>v{version}</p>
			</div>
		</CardBody>
	</Card>
}

export default Header