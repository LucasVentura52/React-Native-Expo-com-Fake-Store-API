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
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    flexGrow: 1,
  },
  image: { width: 220, height: 220, marginBottom: 20, resizeMode: "contain" },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
    color: "#111827",
  },
  price: {
    fontSize: 18,
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: { textAlign: "justify", marginBottom: 20, color: "#374151" },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
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
    fontSize: 14,
  },
});