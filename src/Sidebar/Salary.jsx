import React from 'react'
import Button from './Button'
import InputField from '../component/InputField'
const Salary = ({handleChange, handleClick}) => {
  return (
    <div>
        <h4 className='text-lg font-medium mb-2'>Salary</h4>
        <div className='mb-4'>
            <Button onClikHandler={handleClick} value="" title="Hourly"/>
            <Button onClikHandler={handleClick} value="Monthly" title="Monthly"/>
            <Button onClikHandler={handleClick} value="Yearly" title="Yearly"/>
        </div>
        <div>
            <label className='sidebar-label-container'>
                        <input type="radio" name='test' id='test' value="" onChange={handleChange}/>
                        <span className='checkmark'></span>All
            </label>
            <InputField handleChange={handleChange} value={30} title="< 30,000" name='test'/>
            <InputField handleChange={handleChange} value={50} title="< 50,000" name='test'/>
            <InputField handleChange={handleChange} value={80} title="< 80,000" name='test'/>
            <InputField handleChange={handleChange} value={100} title="< 100,000" name='test'/>
        </div>
    </div>
  )
}

export default Salary