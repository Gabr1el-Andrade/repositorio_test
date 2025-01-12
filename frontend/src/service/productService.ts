import api from '../api';

export interface Produto {
  id?: number;
  name: string;
  description: string;
  price: number;
  data_validade: string;
  image: File | string;
  categoria_id: number;
}

export const getProducts = async (search = '', page = 1): Promise<Produto[]> => {
  try {
    const response = await api.get('/produtos', {
      params: { search, page },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw new Error('Não foi possível buscar os produtos.');
  }
};

export const getProductById = async (id: number): Promise<Produto> => {
  try {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    throw new Error(`Não foi possível buscar o produto com ID ${id}.`);
  }
};

export const createProduct = async (product: Produto): Promise<Produto> => {
  try {
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value instanceof File ? value : String(value));
    });

    const response = await api.post('/produtos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw new Error('Não foi possível criar o produto.');
  }
};

export const updateProduct = async (id: number, product: Produto): Promise<Produto> => {
  try {
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value instanceof File ? value : String(value));
    });

    const response = await api.put(`/produtos/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw new Error(`Não foi possível atualizar o produto com ID ${id}.`);
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await api.delete(`/produtos/${id}`);
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    throw new Error(`Não foi possível excluir o produto com ID ${id}.`);
  }
};
