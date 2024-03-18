import { useState } from 'react';
import './App.css'
import {Routes, Route} from "react-router-dom"
import Main from './Components/main';



function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<Main/>}/>
      </Routes>
    </>
  )
}

export default App
