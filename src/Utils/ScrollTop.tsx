import { useEffect } from "react";
import { useRouter } from "next/router";

const ScrollToTop = () => {
	const { pathname } = useRouter();

	useEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 20);
	}, [pathname]);

	return null;
};

export default ScrollToTop;
