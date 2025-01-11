<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    public function index()
    {
        return Produto::with('categoria')->paginate(10);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|max:50',
            'descricao' => 'required|max:200',
            'preco' => 'required|numeric|min:0',
            'data_validade' => 'required|date|after_or_equal:today',
            'imagem' => 'required|file|mimes:jpg,jpeg,png|max:2048',
            'categoria_id' => 'required|exists:categorias,id',
        ]);

        $fileName = time() . '_' . $request->file('imagem')->getClientOriginalName();
        $request->file('imagem')->storeAs('produtos', $fileName, 'public');

        return Produto::create(array_merge($request->all(), ['imagem' => $fileName]));
    }

    public function show(Produto $produto)
    {
        return $produto->load('categoria');
    }

    public function update(Request $request, Produto $produto)
    {
        $request->validate([
            'nome' => 'required|max:50',
            'descricao' => 'required|max:200',
            'preco' => 'required|numeric|min:0',
            'data_validade' => 'required|date|after_or_equal:today',
            'imagem' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
            'categoria_id' => 'required|exists:categorias,id',
        ]);

        $data = $request->all();

        if ($request->hasFile('imagem')) {
            $fileName = time() . '_' . $request->file('imagem')->getClientOriginalName();
            $request->file('imagem')->storeAs('produtos', $fileName, 'public');
            $data['imagem'] = $fileName;
        }

        $produto->update($data);
        return $produto;
    }

    public function destroy(Produto $produto)
    {
        $produto->delete();
        return response()->noContent();
    }
}