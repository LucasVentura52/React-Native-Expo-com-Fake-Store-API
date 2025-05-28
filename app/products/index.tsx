import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import api from "../../src/services/api";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 16 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/products/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 14,
    color: "#111827",
    marginBottom: 6,
    textAlign: "center",
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#2563eb",
  },
});