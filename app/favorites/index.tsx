import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { getFavorites, toggleFavorite } from "../../src/storage/favorites";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Favorites() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Product[]>([]);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  const handleToggleFavorite = async (product: Product) => {
    await toggleFavorite(product);
    await loadFavorites();
    Alert.alert("Sucesso", "Removido dos favoritos");
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Nenhum favorito encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Favoritos</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => router.push(`/products/${item.id}`)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleToggleFavorite(item)}
            >
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bfdbfe",
    paddingTop: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bfdbfe",
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e3a8a",
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 110,
    resizeMode: "contain",
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontWeight: "600",
    fontSize: 14,
    color: "#1e3a8a",
    marginBottom: 6,
    textAlign: "center",
    minHeight: 44,
    lineHeight: 20,
  },
  price: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#2563eb",
    marginBottom: 8,
  },
  removeButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 6,
    width: "100%",
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});