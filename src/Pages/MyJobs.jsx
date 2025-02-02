import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '../firebase/firebase.config'; // Adjust the path if necessary

const MyJobs = () => {
  const [email, setEmail] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsloading] = useState(true);

  const auth = getAuth(firebaseApp);
  const location = useLocation(); // Use useLocation hook
  const apiUrl = 'https://jamjob.onrender.com'

  // Fetch user email
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail(null);
      }
    });
  }, [auth]);

  // Fetch jobs based on email
  useEffect(() => {
    if (email) {
      setIsloading(true);
      fetch(`${apiUrl}/my-jobs/${email}`)
        .then(res => res.json())
        .then(data => {
          setJobs(data);
          setIsloading(false);
        })
        .catch(error => {
          console.error('Error fetching jobs:', error);
          toast.error('Error fetching jobs');
          setIsloading(false);
        });
    }
  }, [email]);

// Display success toast if redirected with success message
  useEffect(() => {
    if (location.state && location.state.message) {
      toast.success(location.state.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
  }, [location.state]);


  //SET CURRENT PAGE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  //PAGINATION
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJob = jobs.slice(indexOfFirstItem, indexOfLastItem);

  // NEXT AND PREVIOUS BUTTON
  const nextPage = () => {
    if (indexOfLastItem < jobs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = () => {
    const filter = jobs.filter((job) => job.jobTitle.toLowerCase().includes(searchText.toLowerCase()));
    setJobs(filter);
    setIsloading(false);
  };

  const handleDelete = (id) => {
    fetch(`${apiUrl}/job/${id}`, {
      method: "DELETE"
    }).then(res => res.json()).then(data => {
      if (data.acknowledged === true) {
        toast.success('Job Deleted Successfully!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
      }
    }).catch(error => {
      console.error('Error deleting job:', error);
      toast.error('Error deleting job');
    });
  };

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className='my-jobs-container'>
        <h1 className='text-center p-4'>ALL MY JOBS</h1>
        <div className='p-2 text-center mb-2'>
          <input 
            onChange={(e) => setSearchText(e.target.value)}
            type="text" name='search' id='search' className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full focus-within:ring-2 focus-within:ring-inset focus-within:ring-green' />
          <button className='bg-green text-white font-semibold px-8 py-2 rounded-sm mb-4' onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/*TABLE*/}
      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">All Jobs</h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link to={"/post"}>
                    <button className="bg-green text-white active:bg-green/55 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                      Post New Job
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      NO.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Job Title
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Company Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Salary
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Edit
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Delete
                    </th>
                  </tr>
                </thead>

                {isLoading ? (
                  <div className='flex items-center justify-center h-20'><p>Loading...</p></div>
                ) : (
                  <tbody>
                    {currentJob.map((job, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {job.jobTitle}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {job.companyName}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          ${job.minPrice} - ${job.maxPrice}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button className='bg-gold py-2 px-6 text-primary rounded-sm'>
                            <Link to={`/edit-job/${job?._id}`}>Edit</Link>
                          </button>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button onClick={() => handleDelete(job._id)} className='bg-red-700 py-2 px-6 text-white rounded-sm'>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>

        {/*PAGINATION*/}
        <div className='flex justify-center text-black space-x-8 mb-8'>
          {currentPage > 1 && (
            <button className='hover:underline' onClick={prevPage}>Previous</button>
          )}
          {indexOfLastItem < jobs.length && (
            <button className='hover:underline' onClick={nextPage}>Next</button>
          )}
        </div>
      </section>

      <ToastContainer />
    </div>
  );
};

export default MyJobs;
