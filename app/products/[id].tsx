import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import api from "../../src/services/api";
import { toggleFavorite, isFavorite } from "../../src/storage/favorites";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      const data = response.data;
      setProduct(data);
      const fav = await isFavorite(data.id);
      setFavorite(fav);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar o produto");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!product) return;
    await toggleFavorite(product);
    const fav = await isFavorite(product.id);
    setFavorite(fav);
    Alert.alert(
      "Sucesso",
      fav ? "Adicionado aos favoritos" : "Removido dos favoritos"
    );
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity
          style={[
            styles.button,
            favorite ? styles.buttonRemove : styles.buttonAdd,
          ]}
          onPress={handleToggleFavorite}
        >
          <Text style={styles.buttonText}>
            {favorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  errorText: {
    fontSize: 16,
    color: "#ef4444",
  },
  container: {
    backgroundColor: "#bfdbfe",
    padding: 16,
    flexGrow: 1,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 12,
    resizeMode: "contain",
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e3a8a",
    textAlign: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: "#374151",
    textAlign: "justify",
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    elevation: 2,
  },
  buttonAdd: {
    backgroundColor: "#2563eb",
  },
  buttonRemove: {
    backgroundColor: "#ef4444",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});