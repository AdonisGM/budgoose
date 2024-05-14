import Navbar from "./Navbar.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Content from "./Content.jsx";

const MainLayout = () => {

	return <div className={'max-h-screen w-screen h-screen bg-green-50 flex flex-col p-3'}>
		<div className={'flex flex-row gap-3 flex-grow overflow-auto -m-3 p-3'}>
			<div className={'min-w-[250px] w-[250px] max-w-[250px] flex flex-col'}>
				<Header/>
				<Navbar/>
			</div>
			<Content/>
		</div>
		<Footer/>
	</div>
}

export default MainLayout