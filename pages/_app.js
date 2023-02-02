import "../styles/globals.css";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function MyApp({ Component, pageProps }) {

	const lightTheme = createTheme({
		type: "light",
		theme: {
			colors: {
				primary: "linear-gradient(112deg, #3e48c7 -63.59%, #4ee1ff -20.3%, #0037f5 70.46%)",
				gradient: "linear-gradient(112deg, #3e48c7 -63.59%, #4ee1ff -20.3%, #0037f5 70.46%)",
			},
		},
	});

	const darkTheme = createTheme({
		type: "dark",
		theme: {
			colors: {
				primary: "linear-gradient(112deg, #3e48c7 -63.59%, #4ee1ff -20.3%, #0037f5 70.46%)",
				gradient: "linear-gradient(112deg, #3e48c7 -63.59%, #4ee1ff -20.3%, #0037f5 70.46%)",
			},
		},
	});

	return (
		<NextThemesProvider
			defaultTheme="system"
			attribute="class"
			value={{
				light: lightTheme.className,
				dark: darkTheme.className,
			}}
		>
			<NextUIProvider>
				<Component {...pageProps} />
				<Toaster
					position="bottom-center"
					reverseOrder={true}
				/>
			</NextUIProvider>
		</NextThemesProvider>
	);
}