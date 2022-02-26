import { ADD_PRODUCT, INIT_CURRENT_PRODUCT_CARD, INIT_PRODUCTS_LIST, DELETE_PRODUCT, UPDATE_PRODUCT, CHANGE_PRODUCT_STATUS} from '../actionsTypes/productsAT';

const initialState = { products: [], currentProduct: {}};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      const newProduct = action.payload.product;

      return {
        ...state,
        products: state.products ? [...state.products, newProduct] : [newProduct],
      };

    case INIT_PRODUCTS_LIST:
      return { ...state, products: action.payload };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product.id !== Number(action.payload)),
      };

    // case INIT_CURRENT_PRODUCT_CARD:
    //   return {
    //     ...state,
    //     currentProduct: action.payload,
    //   };

    case UPDATE_PRODUCT:
      const updatedProduct = action.payload;
      return {
        ...state,
        products: state.products.map(el => {
          if (el.id === action.payload.id) {
            return {
              name: updatedProduct.name,
              description: updatedProduct.description,
              price: updatedProduct.price,
              photo: updatedProduct.photo,

            };
          } else {
            return el;
          }
        }),
      };

      case CHANGE_PRODUCT_STATUS:
        return {
          ...state,
          products: state.products.filter(product => product.id === Number(action.payload)),
        };


    default:
      return state;
  }
};
