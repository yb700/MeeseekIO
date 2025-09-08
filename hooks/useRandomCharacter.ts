import { useNumberOfPages } from "./useNumberOfPages";
import { useState, useCallback } from "react";
import { GET_ALL_CHARACTERS } from "@/graphql/queries";
import { Character } from "@/graphql/Schema";
import client from "@/graphql/client";

type GetAllCharactersData = {
    characters: {
        info: { pages: number };
        results: Character[];
    };
};

export function useRandomCharacter(status?: string) {
    const { pages, loading, error } = useNumberOfPages(status);
    const [character, setCharacter] = useState<Character | undefined>();

    const fetchRandomCharacter = useCallback(async () => {
        if (!pages || loading || error) return;
        const randomPage = Math.floor(Math.random() * pages) + 1;
        const { data } = await client.query<GetAllCharactersData>({
            query: GET_ALL_CHARACTERS,
            variables: { page: randomPage, status },
            fetchPolicy: "no-cache",
        });
        const results = data?.characters?.results ?? [];
        if (results.length > 0) {
            const randomIndex = Math.floor(Math.random() * results.length);
            setCharacter(results[randomIndex]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pages, status]);

    return { character, next: fetchRandomCharacter, loading, error };
}