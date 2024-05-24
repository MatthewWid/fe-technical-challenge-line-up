import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { queryClient } from "./lib/query-client.ts";
import { theme } from "./lib/theme.ts";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<MantineProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</MantineProvider>
	</React.StrictMode>
);
