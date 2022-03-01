import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initProductsListAC, filterProductsListAC, sortProductsListAC } from '../../redux/actionCreators/productsAC'
import ProductCard from '../ProductCard/ProductCard'
import { Grid, Container} from '@material-ui/core';
import Advertising from '../Advertising/Advertising';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CurrencyYenTwoTone } from '@mui/icons-material';

export default function ProductList({visibility}) {
  const { productsFilter } = useSelector(state => state.productsReducer);
  const { sortFilter } = useSelector(state => state.productsReducer);


  const refContainerSex = useRef();
  const refContainerPrice = useRef();

  // const [containerSex, setContainerSex] = useState('')
  // const [containerPrice, setContainerPrice] = useState('')


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



  return (
    <>


    <Advertising/>
    <Container
            sx={{
                mt: '1rem'
            }}
            style={{paddingTop: '7rem'}}
        >
<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Пол</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          // value={age}
          label="Gender"
           onChange={(event)=>dispatch(filterProductsListAC(event.target.value))}
         
        >
          <MenuItem value="none">
            <em>По умолчанию</em>
          </MenuItem>
          <MenuItem value='male'>Мужское</MenuItem>
          <MenuItem value='female'>Женское</MenuItem>
          <MenuItem value='kid'>Детское</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Сортировка</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          // value={age}
          label="Sort"
     
          onChange={(event) => dispatch(sortProductsListAC(event.target.value))}

        >
          <MenuItem value="none">
            <em>По умолчанию</em>
          </MenuItem>
          <MenuItem value='up'>По возрастанию цены</MenuItem>
          <MenuItem value='down'>По убыванию цены</MenuItem>
          <MenuItem value='upRating'>По возрастанию рейтинга</MenuItem>
          <MenuItem value='downRating'>По убыванию рейтинга</MenuItem>
        </Select>
      </FormControl>
    <Grid container spacing={2}>
    {(productsFilter?.length) ? productsFilter.map(product => (
              <ProductCard  key={product.id} product={product}/>
          )) : <></>}
   </Grid>
   </Container>
   </>
  );
}

