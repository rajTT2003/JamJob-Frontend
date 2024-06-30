import Banner from '../component/Banner'
import Jobs from './Jobs'
import Card from '../component/Card'
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Newsletter from '../component/Newsletter'
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, SetJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const apiUrl = process.env.REACT_APP_API_URL
  useEffect(() =>{
    setIsLoading(true);
    fetch(`${apiUrl}/all-jobs`).then(res => res.json()).then(data => {
      SetJobs(data)
      setIsLoading(false);
    })
  }, [])
 // console.log(jobs);
  


  const [query, setQuery] = useState("");
    const handleInputChange = (event) => {
        setQuery(event.target.value)
    }

    //Filter Jobs by title
    const filteredItems = jobs.filter((job) =>  job.jobTitle.toLowerCase().indexOf(query.toLowerCase())!== -1)
    console.log(filteredItems)

    //--------------- Radio Filtering -------------
    const handleChange = (event) => {
      setSelectedCategory(event.target.value)
    }

    //--------------- Button Based Filtering ----------
    const handleClick = (event) => {
      setSelectedCategory(event.target.value)
    }

    //calculate the index range
    const calculatePageRange = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return{startIndex, endIndex};
    }
    //function for the next page
    const nextPage = () => {
      if (currentPage < Math.ceil(filteredItems.length / itemsPerPage))
        {
          setCurrentPage(currentPage + 1);
        }
    }

    //function for the previous page
    const prevPage = () => {
      if(currentPage > 1 ){
        setCurrentPage(currentPage - 1);
      }
    }

  // Main Functions
   const filteredData = (jobs, selected, query) =>{
      let filteredJobs = jobs;

      //Filtering input items
      if(query){
        filteredJobs = filteredItems;
      }
      //Category filtering
      if(selected){
        
        filteredJobs = filteredJobs.filter(({jobLocation, maxPrice, experienceLevel, 
          salaryType, employmentType, postingDate}) => 
          
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          postingDate >= selected ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase() ||
          experienceLevel.toLowerCase()  ===  selected.toLowerCase()
      );
     
        console.log(filteredJobs)
    
      }
      
     
      //Slice the data based on current page
      const{startIndex, endIndex} = calculatePageRange();
      filteredJobs = filteredJobs.slice(startIndex, endIndex);
      return filteredJobs.map((data, i) =>  <Card key={i} data ={data} />)
   }
   
   const result = filteredData(jobs, selectedCategory, query);

    return (
    <div >
      <Banner query = {query} handleInputChange ={handleInputChange}/>

      <div className='bg-[#fafafa] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>

       {/* Left Side */}
      <div className='bg-white p-4 rounded-lg shadow-lg'>
          <Sidebar handleChange = {handleChange} handleClick = {handleClick}/>
        </div>

        {/* Job Cards */}
        <div className='col-span-2 bg-white p-4 rounded-lg shadow-lg'>
          {
            isLoading ? (<p className='font-medium'>Loading...</p>) : result.length > 0 ? (<Jobs result = {result} />) : <>
            <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
            <p>No Job Found!</p>
            </>
          }
          {/*Pagination Here */}
          {
            result.length > 0 ? (
              <div className='flex justify-center mt-4 space-x-8'>
                <button onClick={prevPage} disabled ={currentPage === 1 }
                className='pagination'>Prev</button>
                <span className='mx-2 py-2'>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                <button onClick={nextPage}disabled ={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} 
                 className='pagination'>Next</button>
              </div>
              
            ) : ""
          }
        </div>

         {/* Right Side */}
        <div className='bg-white p-4 rounded-lg shadow-lg'>
            <Newsletter/>
        </div>
       
      </div>
    </div>
  )
}

export default Home