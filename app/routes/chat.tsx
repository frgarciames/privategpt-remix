import { Chat } from "@/components/chat";
import { ClientOnly } from "remix-utils/client-only";

export default function Index() {
	return <ClientOnly>{() => <Chat />}</ClientOnly>;
}
