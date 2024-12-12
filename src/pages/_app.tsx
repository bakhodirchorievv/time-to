import { AppProps } from "next/app";
import Layout from "../Components/Layout";
import ScrollToTop from "../Utils/ScrollTop";
// import Update from "../Utils/Update";

import "../global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			{/* <Update /> */}
			<ScrollToTop />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
};

export default MyApp;
