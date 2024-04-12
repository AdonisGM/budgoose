import Navbar from "./Navbar.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Content from "./Content.jsx";

const MainLayout = () => {

	return <div className={'w-screen h-screen bg-green-50 flex flex-col gap-3 p-3'}>
		<div className={'flex flex-row gap-3 h-full'}>
			<div className={'min-w-[250px] w-[250px] max-w-[250px] flex flex-col gap-3'}>
				<Header/>
				<Navbar/>
			</div>
			<Content/>
		</div>
		<Footer/>
	</div>
}

export default MainLayout