import {Card, CardBody} from "@nextui-org/react";
import NavbarItem from "./NavbarItem.jsx";
import {IconLayoutDashboard, IconTransformFilled, IconTrendingUp, IconUsers, IconWallet} from "@tabler/icons-react";
import {NavLink} from "react-router-dom";

const listNavbarItem = [
	{
		name: "Dashboard",
		icon: IconLayoutDashboard,
		color: 'green',
		url: '/dashboard',
	},
	{
		name: "Wallet",
		icon: IconWallet,
		color: 'fuchsia',
		url: '/wallet',
	},
	{
		name: "Transfer",
		icon: IconTransformFilled,
		color: 'blue',
		url: '/transfer',
	},
	{
		name: "Loan",
		icon: IconTrendingUp,
		color: 'sky',
		url: '/loan',
	},
	{
		name: "Holder",
		icon: IconUsers,
		color: 'orange',
		url: '/holder',
	}
]

const Navbar = () => {
	return <Card className={'overflow-auto flex-grow'}>
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