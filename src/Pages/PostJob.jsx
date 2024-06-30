import { useNavigate } from 'react-router-dom'; // Import useNavigate
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '../firebase/firebase.config'; // Adjust the path if necessary

export const PostJob = () => {
    const [selectedOptions, setSelectedOptions] = useState(null);
    const [email, setEmail] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [needsPayment, setNeedsPayment] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate(); // Use useNavigate hook
    const apiUrl = process.env.REACT_APP_API_URL

    useEffect(() => {
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email);
            } else {
                setEmail("");
            }
        });

        // Set the current date in YYYY-MM-DD format
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setCurrentDate(formattedDate);
    }, []);

    const onSubmit = async (data) => {
        data.skills = selectedOptions;
        data.postedBy = email;
        data.createdAt = new Date().toISOString();

        // Handle file upload for company logo
        const file = data.companyLogo[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            // Adjust the endpoint to handle file uploads
            const uploadResponse = await fetch(`${apiUrl}/upload-logo`, {
                method: "POST",
                body: formData
            });
            if (!uploadResponse.ok) {
                console.error("File upload failed");
                return;
            }
            const uploadResult = await uploadResponse.json();
            if (uploadResult.url) {
                data.companyLogoUrl = uploadResult.url; // Store the uploaded logo URL
            }
        }

        const response = await fetch(`${apiUrl}/post-job`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        });

        
        if (response.status === 402) {
            setNeedsPayment(true);
            toast.error('Purchase failed. Please try again.', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            return;
        }

          const result = await response.json();
        if (result.acknowledged) {
            // Display success notification
            toast.success('Job Posted Successfully!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            reset();
            setNeedsPayment(false); // Reset payment requirement
            // Redirect to My Jobs page after a short delay to allow toast to display
            setTimeout(() => {
                navigate('/my-jobs', { state: { message: 'Purchase successful and job posted successfully.' } });
            }, 1000);
        } else {
            toast.error('Error posting job. Please try again.', {
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
    };
    const handlePayment = async () => {
        const response = await fetch(`${apiUrl}/create-paypal-payment`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ amount: 60.00 }) // Adjust the amount as needed
        });
        const data = await response.json();
        if (data.forwardLink) {
            window.location.href = data.forwardLink;
        }
    };

    const options = [
        { value: "Javascript", label: "JavaScript" },
        { value: "Python", label: "Python" },
        { value: "Java", label: "Java" },
        { value: "C#", label: "C#" },
        { value: "C++", label: "C++" },
        { value: "PHP", label: "PHP" },
        { value: "Ruby", label: "Ruby" },
        { value: "Swift", label: "Swift" },
        { value: "Objective-C", label: "Objective-C" },
        { value: "SQL", label: "SQL" },
        { value: "R", label: "R" },
        { value: "HTML", label: "HTML" },
        { value: "Telemarketing", label: "Telemarketing" },
        { value: "Customer Relationship Management", label: "Customer Relationship Management" },
        { value: "Medical Coding", label: "Medical Coding" },
        { value: "Pharmacy", label: "Pharmacy" },
        { value: "Pharmaceuticals", label: "Pharmaceuticals" },
        { value: "Economics", label: "Economics" },
        { value: "Finance", label: "Finance" },
        { value: "Civil Engineering", label: "Civil Engineering" },
        { value: "Mechanical Engineering", label: "Mechanical Engineering" },
        { value: "Electrical Engineering", label: "Electrical Engineering" },
        { value: "Chemical Engineering", label: "Chemical Engineering" },
        { value: "Project Engineering", label: "Project Engineering" },
        { value: "Manufacturing", label: "Manufacturing" },
    ];

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <div className='bg-[#ffffff] py-10 px-4 lg:px-16 border-rounded custom-shadow-xl rounded-lg'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                    {/*1st Row*/}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Title</label>
                            <input type="text" placeholder='Ex: Web Developer' {...register("jobTitle")} className='create-job-input' required/>
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Company Name</label>
                            <input type="text" placeholder='Ex: Microsoft' {...register("companyName")} className='create-job-input' required/>
                        </div>
                    </div>

                    {/*2nd Row*/}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Minimum Salary</label>
                            <input type="text" placeholder='$20k' {...register("minPrice")} className='create-job-input'required/>
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Maximum Salary</label>
                            <input type="text" placeholder='$180k' {...register("maxPrice")} className='create-job-input' required/>
                        </div>
                    </div>

                    {/*3rd Row*/}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Salary Type</label>
                            <select {...register("salaryType")} className='create-job-input custom-select' required>
                                <option value="">Choose Your Salary</option>
                                <option value="Hourly">Hourly</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Bi-Weekly">Bi-Weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Location</label>
                            <select {...register("jobLocation")} className='create-job-input custom-select' required>
                                <option value="">Choose Job Location</option>
                                <option value="kingston">Kingston</option>
                                <option value="st. andrew">St. Andrew</option>
                                <option value="st. catherine">St. Catherine</option>
                                <option value="clarendon">Clarendon</option>
                                <option value="manchester">Manchester</option>
                                <option value="st. elizabeth">St. Elizabeth</option>
                                <option value="westmoreland">Westmoreland</option>
                                <option value="hanover">Hanover</option>
                                <option value="st. james">St. James</option>
                                <option value="st. ann">St. Ann</option>
                                <option value="st. mary">St. Mary</option>
                                <option value="portland">Portland</option>
                                <option value="st. thomas">St. Thomas</option>
                                <option value="remote">Remote</option>
                            </select>
                        </div>
                    </div>

                    {/*4th Row*/}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full  disabled'>
                            <label className='block mb-2 text-lg'>Posting Date</label>
                            <input type="date" defaultValue={currentDate} {...register("postingDate")} className='create-job-input' required disabled/>
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Experience Level</label>
                            <select {...register("experienceLevel")} className='create-job-input custom-select' required>
                                <option value="">Select experience level</option>
                                <option value="Any experience">Any experience</option>
                                <option value="Internship">Internship</option>
                                <option value="Work remotely">Work Remotely</option>
                            </select>
                        </div>
                    </div>

                    {/*5th Row*/}
                    <div>
                        <label className='block mb-2 text-lg'>Required Skills Set</label>
                        <CreatableSelect
                            className='create-job-input2'
                            defaultValue={selectedOptions}
                            onChange={setSelectedOptions}
                            options={options}
                            isMulti
                        />
                    </div>

                    {/*6th Row*/}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Company Logo</label>
                            <input type="file" {...register("companyLogo")} className='create-job-input' required/>
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Employment Type</label>
                            <select {...register("employmentType")} className='create-job-input custom-select' required>
                                <option value="">Select Employment Type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Temporary">Temporary</option>
                            </select>
                        </div>
                    </div>

                    {/*7th Row*/}
                    <div className='w-full'>
                        <label className='block mb-2 text-lg'>Job Description</label>
                        <textarea {...register("description")} className='w-full pl-3 create-job-input rounded-md border py-1.5 focus:outline-none placeholder:text-gray-400' 
                        rows={6} placeholder='Job Description' required/>
                    </div>

                    {/*8th Row*/}
                    <div className='w-full'>
                        <label className='block mb-2 text-lg'>Job Posted By</label>
                        <input type="email" value={email} disabled className='create-job-input' required/>
                    </div>

                    <input type="submit" className='block mt-12 bg-green text-white font-semibold px-8 py-2 rounded-sm cursor-pointer'/>
                </form>
                {needsPayment && (
                    <div className="payment-section">
                        <button onClick={handlePayment} className="bg-blue-500 text-black font-semibold px-8 py-2 rounded-sm cursor-pointer">
                            Pay $10.00 with PayPal
                        </button>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}

export default PostJob;
