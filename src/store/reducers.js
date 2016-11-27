import { combineReducers } from 'redux';
import artigos from './modules/artigos/reducers';
import documentos from './modules/documentos/reducers';
import etiquetas from './modules/etiquetas/reducers';

export default combineReducers({
  artigos,
  documentos,
  etiquetas,
});
