import {
 combineReducers,
 createStore,
} from 'redux';

// actions.js
export const getImage = () => ({
 type: 'OPEN_ALBUM',
 payload: '',
});

// reducers.js
export const album = (state, action) => {
 switch (action.type) {
   case "ABRIR_ALBUM":
   return{
     ...state,
     album: action.payload,
   }
   case "ABRIR_FOTO":
   return{
     ...state,
     foto: action.foto,
     url: action.url,
   }
   case "SALVAR_DADOS":
   return{
     ...state,
     data: action.data,
   }
   default:
   return state
 }
};


// store.js
const inicio = {
  album: 0,
  data: null,
  foto: false,
  url: '',
}

export function configureStore(initialState = inicio) {
 const store = createStore(
   album,
   initialState
 )
 return store;
};

export const store = configureStore();
