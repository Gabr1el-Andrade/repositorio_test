<?php

use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Rota de login para autenticar o usuário e fornecer um token
Route::post('login', [AuthController::class, 'login']);

// Rotas protegidas pelo middleware 'auth:sanctum'
Route::middleware('auth:sanctum')->group(function () {
    
    // Prefixo para rotas de produtos
    Route::prefix('produtos')->group(function () {
        Route::get('/', [ProdutoController::class, 'index']);          // Lista todos os produtos
        Route::post('/', [ProdutoController::class, 'store']);         // Cria um novo produto
        Route::get('{produto}', [ProdutoController::class, 'show']);   // Mostra um produto específico
        Route::put('{produto}', [ProdutoController::class, 'update']); // Atualiza um produto específico
        Route::delete('{produto}', [ProdutoController::class, 'destroy']); // Deleta um produto específico
    });

    // Prefixo para rotas de categorias
    Route::prefix('categorias')->group(function () {
        Route::get('/', [CategoriaController::class, 'index']);           // Lista todas as categorias
        Route::post('/', [CategoriaController::class, 'store']);          // Cria uma nova categoria
        Route::put('{categoria}', [CategoriaController::class, 'update']); // Atualiza uma categoria específica
        Route::delete('{categoria}', [CategoriaController::class, 'destroy']); // Deleta uma categoria específica
    });
});