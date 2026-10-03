import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import App from './App.jsx'
import AssetList from './AssetList.jsx'
import AssetPage from './AssetPage.jsx'
import Home from './Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categories/:type' element={<Home />} />
        <Route path='/categories/:type/:category' element={<Home />} />
        <Route path='/assets/:assetId' element={<AssetPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

{/*<Route path='/categories/:categoryId' element={<AssetList />} />  */}