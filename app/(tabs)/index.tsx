import { View, ActivityIndicator, FlatList, Text, useWindowDimensions } from "react-native";
import { useRef, useState, useCallback } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_CHARACTERS } from "@/graphql/queries";
import CharacterCard from "@/components/CharacterCard";
import { Character, FilterCharacter } from "@/graphql/Schema";
import CharacterFilterBar from "@/components/FilterBar";

type Data = { characters?: { info?: { next?: number | null }; results?: Character[] | null } | null };

export default function Index() {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<Partial<FilterCharacter>>({});
  const loadingMoreRef = useRef(false);

  const { width } = useWindowDimensions();
  const isSmall = width < 600;

  const { data, loading, error, fetchMore, refetch } = useQuery<Data>(
    GET_ALL_CHARACTERS,
    { variables: { page: 1, filter }, fetchPolicy: "cache-first", notifyOnNetworkStatusChange: true }
  );

  const results = data?.characters?.results ?? [];
  const hasNext = (data?.characters?.info?.next ?? null) !== null;

  const onEndReached = useCallback(async () => {
    if (!hasNext || loadingMoreRef.current) return;
    loadingMoreRef.current = true;
    try {
      await fetchMore({ variables: { page: data?.characters?.info?.next } });
    } finally {
      loadingMoreRef.current = false;
    }
  }, [fetchMore, hasNext, data?.characters?.info?.next]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch({ page: 1 });
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  if (loading && results.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <ActivityIndicator />
        <Text className="text-white mt-2">Loading characters…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900 p-4">
        <Text className="text-red-400">Failed to load characters.</Text>
      </View>
    );
  }

  return (
    <FlatList
      className="bg-gray-600 py-16 md:py-4 px-2 scroll no-scrollbar w-full"
      data={results}
      keyExtractor={(item) => item.id.toString()}
      numColumns={isSmall ? 1 : 2}
      columnWrapperClassName={!isSmall ? "gap-3 mb-3" : undefined}
      contentContainerClassName="p-2 gap-2"
      initialNumToRender={isSmall ? 8 : 10}
      maxToRenderPerBatch={isSmall ? 8 : 10}
      windowSize={5}
      removeClippedSubviews
      renderItem={({ item }) => (
        <CharacterCard character={item} />
      )}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <View className="mb-4">
          <Text className="text-white/70 mb-2">MeeseekIO</Text>
          <Text className="text-4xl font-bold text-white mb-2">
            Explore All Your Favorite Characters
          </Text>
          <Text className="text-lg text-gray-200">
            Meet the wacky cast from the multiverse.
          </Text>
          <CharacterFilterBar
            value={filter}
            onChange={(next) => setFilter(next)}
            onClear={() => setFilter({})}
          />
        </View>
      }
      ListFooterComponent={
        hasNext ? (
          <View className="py-6">
            <ActivityIndicator />
          </View>
        ) : null
      }
    />
  );
}