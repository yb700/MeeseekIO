import { GET_ALL_CHARACTERS_PAGES } from "@/graphql/queries";
import { useQuery } from "@apollo/client/react";

type GetCharactersPagesData = {
    characters?: {
        info?: {
            pages: number;
        };
    };
};

export function useNumberOfPages(status?: string) {
    const { data, loading, error } = useQuery<GetCharactersPagesData>(GET_ALL_CHARACTERS_PAGES, {
        variables: { page: 1 },
    }
    );

    return {
        pages: data?.characters?.info?.pages ?? 0,
        loading,
        error,
    };
}
