import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';

const Card = ({ data }) => {
  const {
    companyName,
    jobTitle,
    companyLogoUrl,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    employmentType,
    description
  } = data;
  const apiUrl = process.env.REACT_APP_API_URL

  // Assuming your server base URL is "http://localhost:2000/"
  const imageUrl = `${apiUrl}/get-logo${companyLogoUrl}`;

  return (
    <section className='card'>
      <Link to={"/"} className="flex gap-4 flex-col sm:flex-row items-start">
        {companyLogoUrl && (
          <img src={imageUrl} alt={`${companyName} Logo`} className="w-16 h-16 object-cover rounded-md" />
        )}
        <div>
          <h4 className='text-primary mb-1'>{companyName}</h4>
          <h3 className='text-lg font-semibold mb-2'>{jobTitle}</h3>
          <div className='text-primary/70 text-base flex flex-wrap gap-2 mb-2'>
            <span className='flex items-center gap-2'><FiMapPin /> {jobLocation}</span>
            <span className='flex items-center gap-2'><FiClock /> {employmentType}</span>
            <span className='flex items-center gap-2'><FiDollarSign /> {minPrice}-{maxPrice}K</span>
            <span className='flex items-center gap-2'><FiCalendar /> {postingDate}</span>
          </div>
          <p className='text-base text-primary/70'>{description}</p>
        </div>
      </Link>
    </section>
  );
};

export default Card;
