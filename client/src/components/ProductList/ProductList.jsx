import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initProductsListAC } from '../../redux/actionCreators/productsAC'
import ProductCard from '../../components/ProductCard/ProductCard'
import { Link } from 'react-router-dom';
// import ProductCurrentCard from '../../ProductCurrentCard/ProductCurrentCard'


export default function ProductList({visibility}) {
  const {products} = useSelector(state => state.productsReducer);


  const dispatch = useDispatch();

  useEffect(() => {
      fetch('http://localhost:5000/api/products', {
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



  return (
    <div>
      <h3>Все товары</h3>
      <ul>
        {products?.length && products.map(product => (
            <li key={product.id} >
              <Link to={`/products/${product.id}`}>
              <ProductCard product={product}/>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

