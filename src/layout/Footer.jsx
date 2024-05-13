import {Card, CardBody} from "@nextui-org/react";
import {IconBrandGithubFilled, IconPower} from "@tabler/icons-react";

const Footer = () => {
	return <div className={'flex flex-row gap-3'}>
		<Card className={'h-12 min-w-12'} isPressable={true}>
			<CardBody>
				<div className={'h-full w-full flex justify-center items-center overflow-hidden'}>
					<IconPower size={18} className={'text-red-600'} onClick={() => {
						document.location.href = import.meta.env.VITE_SSO_URL + '/settings'
					}}/>
				</div>
			</CardBody>
		</Card>
		<Card className={'h-12 w-full'}>
			<CardBody>
				<div className={'h-full w-full flex justify-center items-center overflow-hidden'}>
					<p className={'text-xs text-gray-400'}>©{new Date(Date.now()).getFullYear()} Adonis Willer | All Rights Reserved | admin@nmtung.dev</p>
				</div>
			</CardBody>
		</Card>
		<Card className={'h-12 min-w-12'} isPressable={true}>
			<CardBody>
				<div className={'h-full w-full flex justify-center items-center overflow-hidden'}>
					<IconBrandGithubFilled size={18} className={'text-black'}/>
				</div>
			</CardBody>
		</Card>
	</div>
}

export default Footer