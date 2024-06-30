import React, { useState } from 'react'
import InputField from '../component/InputField'
import {IoMdArrowDropdown, IoMdArrowDropup} from 'react-icons/io'
const Location = ({handleChange}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () =>{
        setIsDropdownOpen(!isDropdownOpen);
    };
  return (
    <div>
        <div className='flex items-center justify-between'>
            <h4 className='text-lg font-medium mb-2'>Location</h4>
            {isDropdownOpen ? (
                <IoMdArrowDropup onClick={toggleDropdown} className='cursor-pointer '/>
            ) :(
                <IoMdArrowDropdown onClick={toggleDropdown} className='cursor-pointer'/>
            )}
        </div>

       {isDropdownOpen && (
            <div>
                <div>
                    <label className='sidebar-label-container'>
                        <input type="radio" name='test' id='test' value="" onChange={handleChange}/>
                        <span className='checkmark'></span>All
                    </label>
                </div>
                <InputField handleChange={handleChange} value="kingston" title="Kingston" name='test'/>
                <InputField handleChange={handleChange} value="st. andrew" title="St. Andrew" name='test'/>
                <InputField handleChange={handleChange} value="st. catherine" title="St. Catherine" name='test'/>
                <InputField handleChange={handleChange} value="clarendon" title="Clarendon" name='test'/>
                <InputField handleChange={handleChange} value="manchester" title="Manchester" name='test'/>
                <InputField handleChange={handleChange} value="st. elizabeth" title="St. Elizabeth" name='test'/>
                <InputField handleChange={handleChange} value="westmoreland" title="Westmoreland" name='test'/>
                <InputField handleChange={handleChange} value="hanover" title="Hanover" name='test'/>
                <InputField handleChange={handleChange} value="st. james" title="St. James" name='test'/>
                <InputField handleChange={handleChange} value="trelawny" title="Trelawny" name='test'/>
                <InputField handleChange={handleChange} value="st. ann" title="St. Ann" name='test'/>
                <InputField handleChange={handleChange} value="st. mary" title="St. Mary" name='test'/>
                <InputField handleChange={handleChange} value="portland" title="Portland" name='test'/>
                <InputField handleChange={handleChange} value="st. thomas" title="St. Thomas" name='test'/>
                <InputField handleChange={handleChange} value="remote" title="Remote" name='test'/>
            </div>
       ) }  
    </div>
    
  )
}

export default Location