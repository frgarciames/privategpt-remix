import {Outlet, useLocation, useNavigate} from '@remix-run/react'

import type { MetaFunction } from "@remix-run/node";
import { checkIsPgptHealthy } from "@/lib/pgpt.client";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};


export default function Index() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [environment, setEnvironment, deleteEnvironment] = useLocalStorage<
		string | undefined
	>("pgpt-url", undefined);

	const checkPrivateGptHealth = async (env: string) => {
		try {
			const isHealthy = await checkIsPgptHealthy(env);
			if (!isHealthy) {
				alert("The Private GPT instance is not healthy");
				return deleteEnvironment();
			}
			if (pathname === "/") {
				navigate("/chat");
			}
		} catch {
			alert("The Private GPT instance is not healthy");
			deleteEnvironment();
		}
	};

	useEffect(() => {
		if (!environment) {
			const url = prompt(
				"Please enter the URL of your Private GPT instance",
				"http://localhost:8001",
			);
			if (!url) return;
			setEnvironment(url);
			checkPrivateGptHealth(url);
		} else {
			checkPrivateGptHealth(environment);
		}
	}, [environment]);

	if (environment) return <Outlet />;
	return <div>Loading...</div>;
};
