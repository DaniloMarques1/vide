import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App'
import Home from './Home'

import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";


const container = document.getElementById('root')

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />
	}, {
		path: '/home',
		element: <Home />
	}
]);

const root = createRoot(container!)

root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
