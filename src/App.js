
import './App.css';
import React  from 'react'
import Navbar from './Component/Navbar';
import News from './Component/News.js';
import About from './Component/About.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App =()=>{
    //apikey = process.env.React_App_News_API
    let apikey ="d11fa29bbc4f4d2783017007a23922a2"
    let pageSize = 5;
    let country = 'in'
   
    return (
      <div>
          <BrowserRouter>  
              <Navbar/>    
              <LoadingBar
                color='#f11946'
                progress={100}/>
              <div className="container my-3" >    
                      <Routes>
                      <Route exact path="/"  element={<News progress = {100} apikey = {apikey} key ="general" pageSize ={pageSize} country = {country} category = "general"/>} />  
                          <Route exact path="/general"  element={<News progress = {100} apikey = {apikey} key ="general" pageSize ={pageSize} country = {country} category = "general"/>} />  
                          <Route exact path="/business"element={<News progress = {100}  apikey = {apikey} pageSize ={pageSize}  key ="business"  country = {country} category = "business"/>} />
                          <Route exact path="/sport"  element={<News progress = {100} apikey = {apikey} pageSize ={pageSize} key ="sport" country = {country} category = "sport"/>} />
                          <Route exact path="/entertainment"  element={<News progress = {100} apikey = {apikey} pageSize ={pageSize} key ="entertainment" country = {country} category = "entertainment"/>} />
                          <Route exact path="/health"  element={<News progress = {100} apikey = {apikey} key ="health" pageSize ={pageSize} country = {country} category = "health"/>} />
                          <Route exact path="/science"  element={<News progress = {100} apikey = {apikey} pageSize ={pageSize} key ="science" country = {country} category = "science"/>} />
                          <Route exact path="/technology"  element={<News progress = {100} apikey = {apikey} pageSize ={pageSize} key ="technology" country = {country} category = "technology"/>} />
                          <Route exact path="/about"  element={<About/>} />
                         </Routes>
               </div>
          </BrowserRouter>
      </div>
    )
  }
  export default App
