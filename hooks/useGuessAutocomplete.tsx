import { GET_CHARACTER_BY_NAME } from "@/graphql/queries";
import type { Character } from "@/graphql/Schema";
import { useQuery } from "@apollo/client/react";

type CharacterData = {
    characters: {
        results: Character[] | null;
    } | null;
};

export default function useGuessAutocomplete({ name }: { name: string }) {

    const { data, loading, error } = useQuery<CharacterData>(GET_CHARACTER_BY_NAME, {
        variables: { name: name },
        fetchPolicy: "cache-and-network",
    });

    const suggestions = data?.characters?.results ?? [];

    return {
        suggestions,
        loading,
        error
    };
}
