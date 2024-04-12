import {Accordion, AccordionItem, Card, CardBody} from "@nextui-org/react";
import {IconTrendingUp, IconUsers} from "@tabler/icons-react";
import {Fragment} from "react";

const Navbar = () => {
	const itemClasses = {
		base: "w-full h-12",
		title: "font-normal text-sm",
		trigger: "py-0 data-[hover=true]:bg-default-100 rounded-xl h-10 flex items-center",
		indicator: "text-sm",
		content: "text-small",
	};

	const iconClasses = ""

	return <Card className={'h-full'}>
		<CardBody>
			<Accordion
				showDivider={false}
				className="p-0 flex flex-col gap-1 w-full max-w-[300px]"
				itemClasses={itemClasses}
			>
				<AccordionItem
					key="1"
					aria-label="Transaction"
					startContent={<div className={'bg-sky-100 h-10 w-10 flex justify-center items-center rounded-xl'}>
							<IconTrendingUp size={16} className={'text-sky-600'}/>
						</div>
					}
					indicator={<Fragment/>}
					title="Transaction"
				>
					asd
				</AccordionItem>
				<AccordionItem
					key="2"
					aria-label="Holder"
					startContent={<div className={'bg-orange-100 h-10 w-10 flex justify-center items-center rounded-xl'}>
						<IconUsers size={16} className={'text-orange-600'}/>
					</div>
					}
					indicator={<Fragment/>}
					title="Holder"
				>
					asd
				</AccordionItem>
			</Accordion>
		</CardBody>
	</Card>
}

export default Navbar;