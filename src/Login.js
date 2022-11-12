import React,{useState} from "react";

export const Login = (props) =>{
    const [email,setEmail] = useState('');
    const [password,setPassword] =useState('')

    const onSubmitHandler= (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
    }

        return (
        <div className="auth-form-container">
        <form className="login-form" onSubmit={onSubmitHandler}>
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}
             type="email" placeholder="abc@example.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)}
             type="password" placeholder="*******" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={()=> props.onFormSwitch('register')}>Don't have an account? Register</button>
        </div>
    )
}