import { createContext, useState, ReactNode } from "react";

interface UserContextType {
    loggedIn: any; // You can replace 'any' with a more specific type if you have a user type defined
    setLoggedIn: React.Dispatch<React.SetStateAction<any>>; // Use a specific type instead of 'any' if applicable
}
// as the actual value I want to access
export const UserContext = createContext<UserContextType>({
    loggedIn: false,
    setLoggedIn: () => null
});

// Define the type for the props if needed (e.g., if you are passing any props to UserProvider)
interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const value = { loggedIn, setLoggedIn }

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChangedListener((user)=> {
    //         if(user) {
    //             createUserDocumentFromAuth(user)
    //         }
    //         setCurrentUser(user)
    //     })
    //     return unsubscribe

    // },[])


    return <UserContext.Provider value={value}>{children}</UserContext.Provider> // anything in the children has access to currentUser and setCurrentUser
}