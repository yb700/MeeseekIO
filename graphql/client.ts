import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({ uri: "https://rickandmortyapi.com/graphql" }),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    characters: {
                        keyArgs: ["filter"],
                        merge(existing = { results: [] }, incoming) {
                            const results = existing?.results ? existing.results.slice(0) : [];
                            if (incoming?.results) results.push(...incoming.results);
                            return { ...incoming, results };
                        },
                    },
                },
            },
        },
    })
});

export default client;