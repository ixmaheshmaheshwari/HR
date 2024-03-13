import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import persistConfig from '../store/rootreducer'
const store = createStore(persistConfig);
const persistor = persistStore(store);

export { store, persistor };
