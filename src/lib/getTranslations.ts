
import { cookies } from "next/headers";
import { translations, Language } from "./translations";

export async function getTranslations() {
    const cookieStore = await cookies();
    const language = (cookieStore.get("language")?.value as Language) || "id";

    return {
        t: translations[language] || translations.id,
        language
    };
}
