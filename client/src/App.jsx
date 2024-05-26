import Login from './pages/Login'
import Registration from './pages/Registration'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Seller from './pages/Seller'
import PropertyForm from './pages/PropertyForm'
function App() {


  return (
    <>
    <BrowserRouter>
    
      <Routes>
        <Route path='/' element ={<Home />} />
        <Route path='/login' element ={<Login/>} />
        <Route path='/registration' element ={<Registration />} />
        <Route path='/seller' element ={<Seller />} />
        <Route path='/addproperty' element ={<PropertyForm />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
