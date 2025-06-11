import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";
import api from "../../src/services/api";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const categories = [
  { name: "Todos", icon: "grid" },
  { name: "Eletrônicos", icon: "cpu" },
  { name: "Roupas", icon: "shopping-bag" },
  { name: "Livros", icon: "book-open" },
];

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

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

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={
          <>
            <View style={styles.searchContainer}>
              <Icon
                name="search"
                size={18}
                color="#9ca3af"
                style={{ marginRight: 8 }}
              />
              <TextInput
                placeholder="Buscar produtos..."
                placeholderTextColor="#9ca3af"
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScroll}
              contentContainerStyle={{ paddingHorizontal: 12 }}
            >
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.name}
                  style={[
                    styles.categoryButton,
                    selectedCategory === cat.name && styles.categorySelected,
                  ]}
                  onPress={() => setSelectedCategory(cat.name)}
                >
                  <Icon
                    name={cat.icon}
                    size={16}
                    color={selectedCategory === cat.name ? "#fff" : "#1e3a8a"}
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === cat.name && { color: "#fff" },
                    ]}
                    numberOfLines={1}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/products/${item.id}`)}
            activeOpacity={0.8}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bfdbfe",
    paddingTop: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bfdbfe",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#1e3a8a",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e3a8a",
    textAlign: "center",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1e3a8a",
  },
  categoryScroll: {
    marginBottom: 16,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e7ff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    alignSelf: "flex-start",
  },
  categorySelected: {
    backgroundColor: "#2563eb",
  },
  categoryText: {
    color: "#1e3a8a",
    fontSize: 14,
    fontWeight: "500",
    flexShrink: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
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
    elevation: 3,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 120,
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
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
    fontSize: 16,
    color: "#2563eb",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#2563eb",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});
