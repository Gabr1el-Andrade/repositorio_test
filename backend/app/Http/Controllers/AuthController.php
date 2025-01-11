<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produto; 
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function login(Request $request)
    {
    
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($credentials)) {
           
            $user = Auth::user();
            $token = $user->createToken('YourAppName')->plainTextToken;
            
            return response()->json(['token' => $token]);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
