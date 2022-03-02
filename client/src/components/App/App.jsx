import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "../../redux/store";
// import RegForm from "../RegForm/RegForm";
import NavBar from "../NavBar/NavBar";
import ProductList from "../ProductList/ProductList";
import Home from "../Home/Home";
import ProductCurrentCard from '../../components/ProductCurrentCard/ProductCurrentCard'
import Profile from "../Profile/Profile";
import SearchMy from '../Search/Search'
import Reviews from "../Reviews/Reviews";
import Footer from "../Footer/Footer";
import Info from "../Info/Info";
import AddingReviews from "../AddingReviews/AddingReviews";
import Slider from "../Slider/Slider";
import EditCardForm from '../EditCardForm/EditCardForm'
import Wholesale from "../Wholesale/Wholesale";
import Admin from "../Admin/Admin";
import Signin from "../Signin/Signin"
import Signup from "../Signup/Signup";
import { initProductsListAC } from '../../redux/actionCreators/productsAC'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'


function App() {

  const dispatch = useDispatch();
  

  useEffect(() => {
    fetch('http://localhost:5000/products', {
      credentials: 'include',
    })
    .then(data => data.json())
    .then(data => {
      if(data.message === 'sucsess') {
        dispatch(initProductsListAC(data.products))
      } else if (data.message === 'noproducts') {
        console.log('noproducts');
      } else (console.log(data.error))})
    .catch(error => error.message)
}, [dispatch]);

  const { cartProducts } = useSelector(state => state.cartReducer);

useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cartProducts));
}, [cartProducts]);

  return (
    <Provider store={store}>
      <BrowserRouter>
      <NavBar/>


      <Slider/>


        <div style={{ marginTop: '4%' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/products/:id" element={<ProductCurrentCard />} />
          <Route path="/products/edit/:id" element={<EditCardForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reviews" element={<Reviews />} />

          <Route path="/info" element={<Info/>} />


          <Route path="/addreviews" element={<AddingReviews/>} />

          <Route path="/wholesale" element={<Wholesale/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
