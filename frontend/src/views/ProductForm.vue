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
              <div class="mb-3">
                <label for="categoria_id" class="form-label">Categoria ID</label>
                <input
                  type="number"
                  id="categoria_id"
                  class="form-control"
                  v-model="product.categoria_id"
                  min="1"
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

<script setup lang="ts">
import { ref } from 'vue';
import { createProduct, updateProduct } from "@/service/productService";
import type { Produto } from '@/service/productService';

// Emissão de eventos para o componente pai
const emit = defineEmits(['produtoAdicionado']);

const product = ref<Partial<Produto>>({
  name: '',
  description: '',
  price: 0,
  image: '',
  categoria_id: 0,
});

const isEditing = ref(false);
const productId = ref<number | null>(null); // Usado para edição, se necessário

function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file && file.type.startsWith('image/')) {
    product.value.image = file;
  } else {
    alert('Por favor, selecione um arquivo de imagem válido.');
  }
}

async function submitForm() {
  try {
    if (isEditing.value && productId.value !== null) {
      await updateProduct(productId.value, product.value as Produto);
      alert('Produto atualizado com sucesso!');
    } else {
      await createProduct(product.value as Produto);
      alert('Produto cadastrado com sucesso!');
    }

    // Emitir evento para o componente pai
    emit('produtoAdicionado');

    // Limpar o formulário
    product.value = {
      name: '',
      description: '',
      price: 0,
      image: '',
      categoria_id: 0,
    };
    isEditing.value = false;
    productId.value = null;
  } catch (error) {
    alert('Erro ao salvar o produto. Verifique os dados e tente novamente.');
    console.error(error);
  }
}
</script>

<style scoped>
.card {
  border-radius: 10px;
}
.card-header {
  border-radius: 10px 10px 0 0;
}
</style>
