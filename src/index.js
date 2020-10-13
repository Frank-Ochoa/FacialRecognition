import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleWare from 'redux-thunk'
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { searchImage } from "./components/ImageLinkFrom/reducers";
import 'tachyons'

// Can add further reducers as necessary
const rootReducer = combineReducers({searchImage});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));
//Provider takes care of pass to component tree of the app*
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App/>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
