# 🛍️ Fake Store App

Aplicativo mobile desenvolvido com **React Native (Expo)**, que consome a API pública da [Fake Store API](https://fakestoreapi.com/).

O app permite:

- ✅ Login estático
- ✅ Listagem de produtos
- ✅ Detalhes dos produtos
- ✅ Adicionar ou remover dos favoritos (armazenado localmente)
- ✅ Persistência de favoritos entre sessões

---

## 📱 Screenshots

| Tela de Login | Lista de Produtos | Detalhes do Produto | Favoritos |
| :-----------: | :----------------: | :-----------------: | :-------: |
| ✅             | ✅                  | ✅                   | ✅         |

---

## 🔥 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Expo Router](https://expo.github.io/router/)
- [Axios](https://axios-http.com/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) – Para favoritos localmente

---

## 📦 Instalação

1️⃣ Clone o repositório:

```bash
git clone https://github.com/LucasVentura52/React-Native-Expo-com-Fake-Store-API.git
```

2️⃣ Acesse a pasta do projeto:

```bash
cd React-Native-Expo-com-Fake-Store-API
```

3️⃣ Instale as dependências:

```bash
npm install
```

4️⃣ Rode o projeto:

```bash
npx expo start
```

---

## 🚀 Funcionalidades

### 🔑 Tela de Login
- Login estático:
  - **Email:** `admin@admin`
  - **Senha:** `123456`
- Se falhar, exibe mensagem de erro.

### 🛍️ Lista de Produtos
- Busca os produtos da API pública.
- Exibe imagem, nome e preço.
- Navegação para detalhes.

### 🔎 Detalhes do Produto
- Visualiza descrição completa, imagem e preço.
- Botão para adicionar ou remover dos favoritos.

### ❤️ Favoritos
- Lista dos produtos favoritos.
- Persistente usando `AsyncStorage`.

---

## 🌐 API Utilizada

[Fakestoreapi.com](https://fakestoreapi.com/)

- Endpoint utilizado para produtos:

```bash
GET https://fakestoreapi.com/products
```

---

## 🗂️ Estrutura do Projeto

```
/app
 ┣ index.tsx           → Tela de Login
 ┣ products/[id].tsx   → Detalhes do Produto
 ┣ products/index.tsx  → Lista de Produtos
 ┣ favorites/index.tsx → Tela de Favoritos
/src
 ┣ /services/api.ts    → Configuração Axios
 ┗ /storage/favorites.ts → Manipulação dos favoritos no AsyncStorage
```

---

## ✍️ Autor

Desenvolvido por [Lucas Ventura](https://github.com/LucasVentura52)

---