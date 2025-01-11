<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow">
            <div class="card-header bg-primary text-white">
              <h4 class="mb-0">{{ isEditing ? 'Editar Produto' : 'Cadastrar Produto' }}</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitForm">
                <div class="mb-3">
                  <label for="name" class="form-label">Nome do Produto</label>
                  <input
                    type="text"
                    id="name"
                    class="form-control"
                    v-model="product.name"
                    placeholder="Digite o nome do produto"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">Descrição</label>
                  <textarea
                    id="description"
                    class="form-control"
                    v-model="product.description"
                    placeholder="Digite a descrição do produto"
                    required
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="price" class="form-label">Preço</label>
                  <input
                    type="number"
                    id="price"
                    class="form-control"
                    v-model="product.price"
                    min="0"
                    step="0.01"
                    placeholder="Digite o preço do produto"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="image" class="form-label">Imagem</label>
                  <input
                    type="file"
                    id="image"
                    class="form-control"
                    @change="handleImageUpload"
                    required
                  />
                </div>
                <div class="text-end">
                  <button type="submit" class="btn btn-success">
                    {{ isEditing ? 'Salvar Alterações' : 'Cadastrar Produto' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { createProduct, updateProduct, getProductById } from '../services/productService';
  
  const product = ref({
    name: '',
    description: '',
    price: 0,
    image: null,
  });
  
  const isEditing = ref(false);
  const productId = ref(null); // Caso seja usado para edição
  
  function handleImageUpload(event) {
    const file = event.target.files[0];
    product.value.image = file;
  }
  
  async function submitForm() {
    try {
      if (isEditing.value) {
        await updateProduct(productId.value, product.value);
        alert('Produto atualizado com sucesso!');
      } else {
        await createProduct(product.value);
        alert('Produto cadastrado com sucesso!');
      }
      // Redirecionar ou limpar o formulário
      product.value = {
        name: '',
        description: '',
        price: 0,
        image: null,
      };
    } catch (error) {
      alert('Erro ao salvar o produto. Verifique os dados e tente novamente.');
      console.error(error);
    }
  }
  </script>
  
  <style>
  .card {
    border-radius: 10px;
  }
  .card-header {
    border-radius: 10px 10px 0 0;
  }
  </style>