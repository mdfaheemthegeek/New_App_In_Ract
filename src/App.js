
import './App.css';
import React, { Component } from 'react'
import Navbar from './Component/Navbar';
import News from './Component/News.js';
import About from './Component/About.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
 apikey = process.env.React_App_News_API
  state = {
    progress : 0
  }
  setProgress = (progress)=> {
    this.setState({
      progress : progress
    })
  }

  render() {
   let pageSize = 5;
   let country = 'in'
   
    return (
      <div>
          <BrowserRouter>  
              <Navbar/>    
              <LoadingBar
                color='#f11946'
                progress={100}
                
      />
                  <div className="container my-3" >    
                      <Routes>
                      <Route exact path="/"  element={<News setProgress = {this.setProgress}   apikey = {this.apikey} key ="general" pageSize ={pageSize} country = {country} category = "general"/>} />  
                          <Route exact path="/general"  element={<News setProgress = {this.setProgress}  apikey = {this.apikey} key ="general" pageSize ={pageSize} country = {country} category = "general"/>} />  
                          <Route exact path="/business"element={<News setProgress = {this.setProgress}  apikey = {this.apikey} pageSize ={pageSize}  key ="business"  country = {country} category = "business"/>} />
                          <Route exact path="/sport"  element={<News setProgress = {this.setProgress}  apikey = {this.apikey} pageSize ={pageSize} key ="sport" country = {country} category = "sport"/>} />
                          <Route exact path="/entertainment"  element={<News setProgress = {this.setProgress} apikey = {this.apikey} pageSize ={pageSize} key ="entertainment" country = {country} category = "entertainment"/>} />
                          <Route exact path="/health"  element={<News setProgress = {this.setProgress}  apikey = {this.apikey} key ="health" pageSize ={pageSize} country = {country} category = "health"/>} />
                          <Route exact path="/science"  element={<News setProgress = {this.setProgress}  apikey = {this.apikey} pageSize ={pageSize} key ="science" country = {country} category = "science"/>} />
                          <Route exact path="/technology"  element={<News setProgress = {this.setProgress}  apikey = {this.apikey} pageSize ={pageSize} key ="technology" country = {country} category = "technology"/>} />
                          <Route exact path="/about"  element={<About/>} />
                         </Routes>
                  </div>
          </BrowserRouter>
      </div>
    )
  }
}

