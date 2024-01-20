import { ChangeEvent, FormEvent, useState, useContext } from "react"
import { UserContext } from "../../contexts/user.context"
import FormInput from "../form-input/form-input"
import Button from "../button/button"
import {SignInContainer, ButtonsContainer} from './sign-in-form.styles'
import {signIn} from 'aws-amplify/auth'

const defaultFormFields = {
    username: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { username, password } = formFields
    const {setLoggedIn} = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        try {
            await signIn({username, password})
            setLoggedIn(true)
            resetFormFields()
            console.log("successfully signed in")


        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign up withh your username and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Username' type="text" required onChange ={handleChange} name="username" value={username}></FormInput>
                <FormInput label='Password' type="password" required onChange ={handleChange} name="password" value={password}></FormInput>

                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                </ButtonsContainer>
                
            </form>
        </SignInContainer>
    )
}

export default SignInForm