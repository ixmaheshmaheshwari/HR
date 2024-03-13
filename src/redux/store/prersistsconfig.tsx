import { PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { RootState } from './rootreducer';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  
//   whitelist: ['auth'], // Specify which slices of state to persist
};

export default persistConfig;