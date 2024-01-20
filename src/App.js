import Navigation from "./routes/navigation/navigation";
import Home from "./routes/home/home";
import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/authentication/authentication";
import Shop from "./routes/shop/shop";
import Checkout from "./routes/checkout/checkout";
import { Amplify } from 'aws-amplify'
import config from './amplifyconfiguration.json'

Amplify.configure(config)
const App = () => {
  // const {setLoggedIn} = useContext(UserContext)
  // useEffect(()=>{
  //   AssessLoggedIn()
  // },[])
  // const AssessLoggedIn = async() => {
  //   try {
  //     await getCurrentUser()
  //       setLoggedIn(true)
  //       console.log("log in true")
  //   } catch (error) {
  //     setLoggedIn(false)
  //     console.log(error)
  //   }
    
  // }

  
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path="shop/*" element={<Shop/>}/>
        <Route path="auth" element={<Authentication/>}/>
        <Route path='checkout' element={<Checkout/>}></Route>

      </Route>
      

    </Routes>
    
  );
}

export default App;
