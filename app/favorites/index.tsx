import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { getFavorites, toggleFavorite } from '../../src/storage/favorites';

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
    Alert.alert('Sucesso', 'Removido dos favoritos');
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
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 16 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/products/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleToggleFavorite(item)}
            >
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    width: '46%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 13,
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#2563eb',
    marginBottom: 8,
  },
  removeButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
});
