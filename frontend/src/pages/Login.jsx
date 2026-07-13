import { useState } from "react";

function Login() {

    const [email,setEmail]=useState("");

    const [password,setPassword]=useState("");

    const [message,setMessage]=useState("");

    const login=async(e)=>{

        e.preventDefault();

        const response=await fetch("http://localhost:5000/api/auth/login",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                email,
                password
            })

        });

        const data=await response.json();

        if(response.ok){

            localStorage.setItem("token",data.token);

            localStorage.setItem("user",JSON.stringify(data.user));

            setMessage("Login Successful");

        }

        else{

            setMessage(data.message);

        }

    };

    return(

<div className="flex min-h-screen items-center justify-center bg-gray-100">

<div className="bg-white p-8 rounded-xl shadow-md w-96">

<h1 className="text-2xl font-bold mb-6">

Login

</h1>

<form onSubmit={login} className="space-y-4">

<input

type="email"

placeholder="Email"

className="w-full border p-3 rounded"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>

<input

type="password"

placeholder="Password"

className="w-full border p-3 rounded"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>

<button

className="w-full bg-black text-white p-3 rounded"

>

Login

</button>

</form>

<p className="mt-4 text-center">

{message}

</p>

</div>

</div>

);

}

export default Login;