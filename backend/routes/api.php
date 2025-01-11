<?php

use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    
    Route::prefix('produtos')->group(function () {
        Route::get('/', [ProdutoController::class, 'index']);          
        Route::post('/', [ProdutoController::class, 'store']);        
        Route::get('{produto}', [ProdutoController::class, 'show']);  
        Route::put('{produto}', [ProdutoController::class, 'update']); 
        Route::delete('{produto}', [ProdutoController::class, 'destroy']); 
    });

    Route::prefix('categorias')->group(function () {
        Route::get('/', [CategoriaController::class, 'index']);           
        Route::post('/', [CategoriaController::class, 'store']);          
        Route::put('{categoria}', [CategoriaController::class, 'update']); 
        Route::delete('{categoria}', [CategoriaController::class, 'destroy']); 
    });
});
