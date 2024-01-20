import { ChangeEvent, FormEvent, useState, useContext } from "react"
import { UserContext } from "../../contexts/user.context"
import FormInput from "../form-input/form-input"
import Button from "../button/button"
import {SignUpContainer} from './sign-up-form.styles'
import {signUp} from 'aws-amplify/auth'

const defaultFormFields = {
    username: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const {setLoggedIn} = useContext(UserContext)
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { username, password, confirmPassword } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        console.log("submitted form")
        event.preventDefault()
        if (password !== confirmPassword) {
            alert("passwords do not match")
            return
        }
        try {
            await signUp({
              username,
              password,
            });
  
            setLoggedIn(true)
            resetFormFields()
            alert('successfully signed up')
        } catch (error) {
            console.log("user creation encountered an error", error)
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up withh your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Username' type="text" required onChange ={handleChange} name="username" value={username}></FormInput>
                <FormInput label='Password' type="password" required onChange ={handleChange} name="password" value={password}></FormInput>
                <FormInput label='Confim Password' type="password" required onChange ={handleChange} name="confirmPassword" value={confirmPassword}></FormInput>

            
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm