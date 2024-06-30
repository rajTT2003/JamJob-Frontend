import { useLoaderData, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '../firebase/firebase.config'; // Adjust the path if necessary

const UpdateJob = () => {
    const {id} = useParams();
    //console.log(id)
    const {_id, jobTitle, companyName, minPrice, maxPrice,
        salaryType, jobLocation, postingDate, experienceLevel, companyLogo, 
        employmentType, description, postedBy, skills
    } = useLoaderData()
    const [selectedOptions, setSelectedOptions] = useState(null); 
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const [email, setEmail] = useState("");
    const [currentDate, setCurrentDate] = useState("");

    const apiUrl = process.env.REACT_APP_API_URL

    
    const onSubmit = async (data) => {
        data.skills = selectedOptions;
        console.log(data);

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





        fetch(`${apiUrl}/update-job/${id}`, {
            method: "PATCH",
            headers: {"content-type": "application/json" },
            body: JSON.stringify(data)
        }).then(res => res.json()).then((result) =>{
            console.log(result);
            if(result.acknowledged === true){
                // Display success notification
                toast.success('Job Updated Successfully!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                })}
                reset()
        })
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
        { value: "CSS", label: "CSS" },
        { value: "React", label: "React" },
        { value: "Angular", label: "Angular" },
        { value: "Vue.js", label: "Vue.js" },
        { value: "Node.js", label: "Node.js" },
        { value: "Django", label: "Django" },
        { value: "Flask", label: "Flask" },
        { value: "Spring", label: "Spring" },
        { value: "Kotlin", label: "Kotlin" },
        { value: "Go", label: "Go" },
        { value: "Rust", label: "Rust" },
        { value: "Perl", label: "Perl" },
        { value: "Scala", label: "Scala" },
        { value: "Haskell", label: "Haskell" },
        { value: "MATLAB", label: "MATLAB" },
        { value: "SAS", label: "SAS" },
        { value: "Tableau", label: "Tableau" },
        { value: "Power BI", label: "Power BI" },
        { value: "Excel", label: "Excel" },
        { value: "Word", label: "Word" },
        { value: "PowerPoint", label: "PowerPoint" },
        { value: "Outlook", label: "Outlook" },
        { value: "AWS", label: "AWS" },
        { value: "Azure", label: "Azure" },
        { value: "Google Cloud", label: "Google Cloud" },
        { value: "DevOps", label: "DevOps" },
        { value: "CI/CD", label: "CI/CD" },
        { value: "Docker", label: "Docker" },
        { value: "Kubernetes", label: "Kubernetes" },
        { value: "Jenkins", label: "Jenkins" },
        { value: "Git", label: "Git" },
        { value: "Agile", label: "Agile" },
        { value: "Scrum", label: "Scrum" },
        { value: "Project Management", label: "Project Management" },
        { value: "Product Management", label: "Product Management" },
        { value: "Business Analysis", label: "Business Analysis" },
        { value: "Data Analysis", label: "Data Analysis" },
        { value: "Data Science", label: "Data Science" },
        { value: "Machine Learning", label: "Machine Learning" },
        { value: "Deep Learning", label: "Deep Learning" },
        { value: "Artificial Intelligence", label: "Artificial Intelligence" },
        { value: "Natural Language Processing", label: "Natural Language Processing" },
        { value: "Computer Vision", label: "Computer Vision" },
        { value: "Big Data", label: "Big Data" },
        { value: "Hadoop", label: "Hadoop" },
        { value: "Spark", label: "Spark" },
        { value: "Blockchain", label: "Blockchain" },
        { value: "Cryptocurrency", label: "Cryptocurrency" },
        { value: "Cybersecurity", label: "Cybersecurity" },
        { value: "Penetration Testing", label: "Penetration Testing" },
        { value: "Ethical Hacking", label: "Ethical Hacking" },
        { value: "Network Security", label: "Network Security" },
        { value: "Information Security", label: "Information Security" },
        { value: "Compliance", label: "Compliance" },
        { value: "Risk Management", label: "Risk Management" },
        { value: "Quality Assurance", label: "Quality Assurance" },
        { value: "Testing", label: "Testing" },
        { value: "Manual Testing", label: "Manual Testing" },
        { value: "Automation Testing", label: "Automation Testing" },
        { value: "Selenium", label: "Selenium" },
        { value: "Appium", label: "Appium" },
        { value: "JIRA", label: "JIRA" },
        { value: "Confluence", label: "Confluence" },
        { value: "Trello", label: "Trello" },
        { value: "Asana", label: "Asana" },
        { value: "Basecamp", label: "Basecamp" },
        { value: "Salesforce", label: "Salesforce" },
        { value: "HubSpot", label: "HubSpot" },
        { value: "Zoho CRM", label: "Zoho CRM" },
        { value: "SAP", label: "SAP" },
        { value: "Oracle", label: "Oracle" },
        { value: "Microsoft Dynamics", label: "Microsoft Dynamics" },
        { value: "QuickBooks", label: "QuickBooks" },
        { value: "Xero", label: "Xero" },
        { value: "NetSuite", label: "NetSuite" },
        { value: "Marketing", label: "Marketing" },
        { value: "Digital Marketing", label: "Digital Marketing" },
        { value: "SEO", label: "SEO" },
        { value: "SEM", label: "SEM" },
        { value: "Content Marketing", label: "Content Marketing" },
        { value: "Social Media Marketing", label: "Social Media Marketing" },
        { value: "Email Marketing", label: "Email Marketing" },
        { value: "Affiliate Marketing", label: "Affiliate Marketing" },
        { value: "PPC", label: "PPC" },
        { value: "Google Ads", label: "Google Ads" },
        { value: "Facebook Ads", label: "Facebook Ads" },
        { value: "Copywriting", label: "Copywriting" },
        { value: "Graphic Design", label: "Graphic Design" },
        { value: "Photoshop", label: "Photoshop" },
        { value: "Illustrator", label: "Illustrator" },
        { value: "InDesign", label: "InDesign" },
        { value: "Adobe XD", label: "Adobe XD" },
        { value: "Figma", label: "Figma" },
        { value: "Sketch", label: "Sketch" },
        { value: "UI/UX Design", label: "UI/UX Design" },
        { value: "Web Design", label: "Web Design" },
        { value: "Mobile App Design", label: "Mobile App Design" },
        { value: "Video Editing", label: "Video Editing" },
        { value: "Final Cut Pro", label: "Final Cut Pro" },
        { value: "Adobe Premiere", label: "Adobe Premiere" },
        { value: "After Effects", label: "After Effects" },
        { value: "3D Modeling", label: "3D Modeling" },
        { value: "AutoCAD", label: "AutoCAD" },
        { value: "Revit", label: "Revit" },
        { value: "SketchUp", label: "SketchUp" },
        { value: "Blender", label: "Blender" },
        { value: "Maya", label: "Maya" },
        { value: "3ds Max", label: "3ds Max" },
        { value: "ZBrush", label: "ZBrush" },
        { value: "Unity", label: "Unity" },
        { value: "Unreal Engine", label: "Unreal Engine" },
        { value: "Game Development", label: "Game Development" },
        { value: "Game Design", label: "Game Design" },
        { value: "Game Programming", label: "Game Programming" },
        { value: "Sound Design", label: "Sound Design" },
        { value: "Music Production", label: "Music Production" },
        { value: "Audio Engineering", label: "Audio Engineering" },
        { value: "Customer Service", label: "Customer Service" },
        { value: "Customer Support", label: "Customer Support" },
        { value: "Technical Support", label: "Technical Support" },
        { value: "Help Desk", label: "Help Desk" },
        { value: "IT Support", label: "IT Support" },
        { value: "IT Management", label: "IT Management" },
        { value: "System Administration", label: "System Administration" },
        { value: "Network Administration", label: "Network Administration" },
        { value: "Cloud Administration", label: "Cloud Administration" },
        { value: "Database Administration", label: "Database Administration" },
        { value: "Healthcare", label: "Healthcare" },
        { value: "Nursing", label: "Nursing" },
        { value: "Patient Care", label: "Patient Care" },
        { value: "Medical Billing", label: "Medical Billing" },
        { value: "Medical Coding", label: "Medical Coding" },
        { value: "Pharmacy", label: "Pharmacy" },
        { value: "Pharmaceuticals", label: "Pharmaceuticals" },
        { value: "Clinical Research", label: "Clinical Research" },
        { value: "Laboratory Skills", label: "Laboratory Skills" },
        { value: "Medical Devices", label: "Medical Devices" },
        { value: "Biotechnology", label: "Biotechnology" },
        { value: "Genetics", label: "Genetics" },
        { value: "Microbiology", label: "Microbiology" },
        { value: "Chemistry", label: "Chemistry" },
        { value: "Biology", label: "Biology" },
        { value: "Physics", label: "Physics" },
        { value: "Mathematics", label: "Mathematics" },
        { value: "Statistics", label: "Statistics" },
        { value: "Economics", label: "Economics" },
        { value: "Finance", label: "Finance" },
        { value: "Accounting", label: "Accounting" },
        { value: "Bookkeeping", label: "Bookkeeping" },
        { value: "Tax Preparation", label: "Tax Preparation" },
        { value: "Auditing", label: "Auditing" },
        { value: "Financial Analysis", label: "Financial Analysis" },
        { value: "Investment Banking", label: "Investment Banking" },
        { value: "Trading", label: "Trading" },
        { value: "Portfolio Management", label: "Portfolio Management" },
        { value: "Risk Analysis", label: "Risk Analysis" },
        { value: "Insurance", label: "Insurance" },
        { value: "Real Estate", label: "Real Estate" },
        { value: "Property Management", label: "Property Management" },
        { value: "Construction", label: "Construction" },
        { value: "Civil Engineering", label: "Civil Engineering" },
        { value: "Mechanical Engineering", label: "Mechanical Engineering" },
        { value: "Electrical Engineering", label: "Electrical Engineering" },
        { value: "Chemical Engineering", label: "Chemical Engineering" },
        { value: "Project Engineering", label: "Project Engineering" },
        { value: "Manufacturing", label: "Manufacturing" },
        { value: "Operations Management", label: "Operations Management" },
        { value: "Supply Chain Management", label: "Supply Chain Management" },
        { value: "Logistics", label: "Logistics" },
        { value: "Procurement", label: "Procurement" },
        { value: "Inventory Management", label: "Inventory Management" },
        { value: "Warehouse Management", label: "Warehouse Management" },
        { value: "Transportation", label: "Transportation" },
        { value: "Shipping", label: "Shipping" },
        { value: "Retail", label: "Retail" },
        { value: "Sales", label: "Sales" },
        { value: "B2B Sales", label: "B2B Sales" },
        { value: "B2C Sales", label: "B2C Sales" },
        { value: "Inside Sales", label: "Inside Sales" },
        { value: "Outside Sales", label: "Outside Sales" },
        { value: "Telemarketing", label: "Telemarketing" },
        { value: "Customer Relationship Management", label: "Customer Relationship Management" }
    ];
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
         {/* Form */}
         <div className='bg-[#ffffff] py-10 px-4 lg:px-16 border-rounded  custom-shadow-xl  rounded-lg'>
         <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                    {/*1st Row*/}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Title</label>
                            <input type="text" placeholder='Ex: Web Developer' defaultValue={jobTitle}{...register("jobTitle")} className='create-job-input' required/>
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Company Name</label>
                            <input type="text" placeholder='Ex: Microsoft' defaultValue={companyName}{...register("companyName")} className='create-job-input' required/>
                        </div>
                    </div>

                    {/*2nd Row*/}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Minimum Salary</label>
                            <input type="text" placeholder='$20k' defaultValue={minPrice} {...register("minPrice")} className='create-job-input'required/>
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Maximum Salary</label>
                            <input type="text" placeholder='$180k' defaultValue={maxPrice} {...register("maxPrice")} className='create-job-input' required/>
                        </div>
                    </div>

                    {/*3rd Row*/}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Salary Type</label>
                            <select {...register("salaryType")} className='create-job-input custom-select' required>
                                <option value={salaryType} >{salaryType}</option>
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
                                <option value={jobLocation}>{jobLocation}</option>
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
                        {/*
                        <div className='lg:w-1/2 w-full hidden disabled'>
                            <label className='block mb-2 text-lg'>Posting Date</label>
                            <input type="date" defaultValue={currentDate} {...register("postingDate")} className='create-job-input' required/>
                        </div>
                        */}
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Experience Level</label>
                            <select {...register("experienceLevel")} className='create-job-input custom-select' required>
                                <option value={experienceLevel}>{experienceLevel}</option>
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
                            defaultValue={skills}
                            onChange={setSelectedOptions}
                            options={selectedOptions}
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
                                <option value={employmentType}>{employmentType}</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Temporary">Temporary</option>
                            </select>
                        </div>
                    </div>

                    {/*7th Row*/}
                    <div className='w-full'>
                        <label className='block mb-2 text-lg'>Job Description</label>
                        <textarea {...register("description")} defaultValue={description} className='w-full pl-3 create-job-input rounded-md border py-1.5 focus:outline-none placeholder:text-gray-400' 
                        rows={6} placeholder='Job Description' required/>
                    </div>

                    {/*8th Row*/}
                    <div className='w-full'>
                        <label className='block mb-2 text-lg'>Job Posted By</label>
                        <input type="email" value={postedBy} disabled className='create-job-input' defaultValue={email}required/>
                    </div>

                    <input type="submit" className='block mt-12 bg-green text-white font-semibold px-8 py-2 rounded-sm cursor-pointer'/>
                </form>
        </div>
        <ToastContainer />
    </div>
  )
}

export default UpdateJob