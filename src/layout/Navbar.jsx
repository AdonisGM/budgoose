import {Card, CardBody} from "@nextui-org/react";
import NavbarItem from "./NavbarItem.jsx";
import {IconTrendingUp, IconUsers} from "@tabler/icons-react";
import {NavLink} from "react-router-dom";

const listNavbarItem = [
	{
		name: "Transaction",
		icon: IconTrendingUp,
		color: 'sky',
		url: '/transaction',
	},
	{
		name: "Holder",
		icon: IconUsers,
		color: 'orange',
		url: '/holder',
	}
]

const Navbar = () => {
	return <Card className={'h-full'}>
		<CardBody>
			{listNavbarItem.map((item, index) => (
				<NavLink to={item.url} key={index}>
					{({ isActive }) => (
						<NavbarItem
							name={item.name}
							icon={item.icon}
							color={item.color}
							isActive={isActive}
						/>
					)}
				</NavLink>
			))}

		</CardBody>
	</Card>
}

export default Navbar;