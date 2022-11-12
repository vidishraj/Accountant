import React,{useState} from "react"

export const Register = (props) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('');
    const [password,setPassword] =useState('')

    const onSubmitHandler= (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
    }

        return (
        <div className="auth-form-container">
        <form className="register-form" onSubmit={onSubmitHandler}>
            <label htmlFor="name">Enter name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}
            placeholder="Enter name" id="name" name="name"/>
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}
             type="email" placeholder="abc@example.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)}
             type="password" placeholder="*******" id="password" name="password" />
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={()=> props.onFormSwitch('login')}>Already have an account? Login here</button>
        </div>
        )
}