import axios from 'axios';

// Base URL para a API (ajuste conforme necessário)
const API_URL = 'http://localhost:9000/api/produtos';

// Função para buscar produtos (com suporte à busca e paginação)
export const getProducts = async (search = '', page = 1) => {
  try {
    const response = await axios.get(API_URL, {
      params: { search, page },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

// Função para buscar um produto pelo ID
export const getProductById = async (id: number) => {
  try {
    const response = await axios.get(${API_URL}/${id});
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    throw error;
  }
};

// Função para criar um novo produto
export const createProduct = async (product: any) => {
  try {
    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error;
  }
};

// Função para atualizar um produto
export const updateProduct = async (id: number, product: any) => {
  try {
    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }
    const response = await axios.put(${API_URL}/${id}, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw error;
  }
};

// Função para excluir um produto
export const deleteProduct = async (id: number) => {
  try {
    const response = await axios.delete(${API_URL}/${id});
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    throw error;
  }
};