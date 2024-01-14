import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import FormInput from "../form-input/form-input"
import Button, {BUTTON_TYPE_CLASSES} from "../button/button"
import {SignInContainer, ButtonsContainer} from './sign-in-form.styles'
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action"


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const dispatch = useDispatch()
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields


    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = () => {
       dispatch(googleSignInStart())
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        try {
            dispatch(emailSignInStart(email, password))

            resetFormFields()


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
            <span>Sign up withh your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type="email" required onChange ={handleChange} name="email" value={email}></FormInput>
                <FormInput label='Password' type="password" required onChange ={handleChange} name="password" value={password}></FormInput>

                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google sign in</Button>
                </ButtonsContainer>
                
            </form>
        </SignInContainer>
    )
}

export default SignInForm