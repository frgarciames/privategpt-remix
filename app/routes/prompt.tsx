import { ClientOnly } from "remix-utils/client-only";
import { Prompt } from "@/components/prompt";

export default function Index() {
	return <ClientOnly>{() => <Prompt />}</ClientOnly>;
}
