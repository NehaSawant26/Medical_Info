import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineArrowLeft } from 'react-icons/ai';
import { State, City } from 'country-state-city';
import Select from 'react-select';
import { FaHospital } from "react-icons/fa6";
import { IoMdBulb } from "react-icons/io";


function App() {
  const [selectedGender, setSelectedGender] = useState('Male');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [step, setStep] = useState(1);
  const [ages, setAges] = useState({});
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const members = [
    { label: 'Self', icon: <AiOutlineUser /> },
    { label: 'Wife', icon: <AiOutlineUser /> },
    { label: 'Son', icon: <AiOutlineUser /> },
    { label: 'Daughter', icon: <AiOutlineUser /> },
    { label: 'Father', icon: <AiOutlineUser /> },
    { label: 'Mother', icon: <AiOutlineUser /> },
    { label: 'Grandfather', icon: <AiOutlineUser /> },
    { label: 'Grandmother', icon: <AiOutlineUser /> },
  ];

  const Cities = [
    'Mumbai', 'Bangalore', 'Chennai', 'Delhi', 'Goa', 'Kochi', 'Kolkata', 'Mangalore', 'Hyderabad'
  ];

  const checkboxOptions = [
    { label: "Diabetes" },
    { label: "Blood Pressure" },
    { label: "Heart Disease" },
    { label: "Any Surgery" },
    { label: "Thyroid" },
    { label: "Asthma" },
    { label: "Other Disease" },
    { label: "Non of These" },
  ];

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((selectedOption) => selectedOption !== option);
      }
      else {
        return [...prevSelectedOptions, option];
      }
    });
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleMemberSelect = (member) => {
    if (selectedMembers.includes(member)) {
      setSelectedMembers(selectedMembers.filter((m) => m !== member));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleAgeChange = (member, age) => {
    setAges((prevAges) => ({ ...prevAges, [member]: age }));

  };

  const statesInIndia = State?.getStatesOfCountry('IN').map((state) => ({
    label: state.name,
    value: state.isoCode,
  }));

  const citiesInState = selectedState
    ? City.getCitiesOfState('IN', selectedState.value).map((city) => ({
      label: city.name,
      value: city.name,
    }))
    : [];

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setSelectedCity(null);
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const handleContinue = () => {
    if (step === 1 && selectedMembers.length > 0) {
      setStep(2);
    }
    else if (step === 2) {
      setStep(3);
    }
    else if (step === 3) {
      setStep(4);
    }
    else if (step === 4) {
      setStep(5);
    }
    else {
      alert('Please select at least one member to insure.');
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-slate-100 p-10">
        {step === 1 && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-8"> Find the best plan for your family </h1>
            <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl w-full h-auto">
              <div className="flex justify-center space-x-6 mb-6 ">
                <button className={`px-8 py-3 rounded-lg font-semibold ${selectedGender === 'Male' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`}
                  onClick={() => handleGenderSelect('Male')}> Male
                </button>
                <button className={`px-6 py-2 rounded-lg font-semibold ${selectedGender === 'Female' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`}
                  onClick={() => handleGenderSelect('Female')}> Female
                </button>
              </div>

              <h2 className="text-lg font-semibold text-gray-700 mb-6"> Select members you want to insure </h2>
              <div className="grid grid-cols-3 gap-4">
                {members.slice(0, showMore ? members.length : 6).map((member) => (
                  <button key={member.label} className={`flex items-center justify-center px-4 py-5 border rounded-lg text-md font-semibold ${selectedMembers.includes(member.label) ? 'border-black bg-gray-200' : 'border-gray-300 bg-white'}`}
                    onClick={() => handleMemberSelect(member.label)}> {member.icon} <span className="ml-2">{member.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button onClick={() => setShowMore(!showMore)}
                  className="text-gray-500 text-lg font-bold">
                  {showMore ? 'Less members' : 'More members'}
                </button>
              </div>

              <button className="w-full bg-black text-white text-lg font-semibold py-3 mt-6 rounded-lg" onClick={handleContinue}>
                Continue →
              </button>

              <p className="text-gray-500 text-md text-center mt-6">
                By clicking on "Continue", you agree to our
                <a href="#" className="text-blue-500"> Privacy Policy, Terms of Use & Disclaimer</a>.
              </p>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
            <button className="flex items-center text-gray-600 mb-6"
              onClick={handleBack}> <AiOutlineArrowLeft className="mr-2" /> Back
            </button>
            <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">
              Select age of covered member(s)
            </h2>

            {selectedMembers.map((member) => (
              <div key={member} className="mb-4 flex flex-col space-x-4">
                <div className="flex items-center space-x-2 ml-5">
                  <AiOutlineUser className="text-xl" />
                  <span className="text-lg ">{member}'s age</span>
                </div>

                <div className='m-3'>
                  <Select
                    options={Array.from({ length: 100 }, (_, i) => ({
                      label: `${i + 1} yr`,
                      value: i + 1,
                    }))}
                    value={ages[member] ? { label: `${ages[member]} yr`, value: ages[member] } : null}
                    onChange={(selectedOption) => handleAgeChange(member, selectedOption.value)}
                    placeholder="Select Age"
                  />
                </div>
              </div>
            ))}
            <button
              className="w-full bg-black text-white text-lg font-semibold py-3 mt-6 rounded-lg"
              onClick={handleContinue}>
              Continue →
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
            <button className="flex items-center text-gray-600 mb-5"
              onClick={handleBack}> <AiOutlineArrowLeft className="mr-2" /> Back
            </button>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-5">
              Select your State and City
            </h2>
            <div className="mb-5 font-semibold" >
              <label>Select State: </label>
              <Select
                options={statesInIndia}
                value={selectedState}
                onChange={handleStateChange}
                placeholder="Select State"
              />
            </div>
            <div className="mb-5 font-semibold">
              <label>Select City: </label>
              <Select
                options={citiesInState}
                value={selectedCity}
                onChange={handleCityChange}
                placeholder="Select City"
                isDisabled={!selectedState}
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-700 mb-6"> Popular Cities</h2>
            <div className="grid grid-cols-5 gap-2 mb-8">
              {Cities.map((city) => (
                <button key={city}
                  className="px-4 py-2 border rounded-lg font-semibold" > {city}
                </button>
              ))}
            </div>

            <div className=" flex mb-3 ml-2 border-2 p-4 rounded-md">
              <FaHospital className="size-6 mr-3" />
              <p className="text-gray-600 text-sm">
                This will help us in finding the network of
                <br /><strong>Cashless Hospitals in your city</strong>. <br />
              </p>
            </div>

            <button
              className="w-full bg-black text-white text-lg font-semibold py-3 mt-6 rounded-lg"
              onClick={handleContinue}>
              Continue →
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
            <button className="flex items-center text-gray-600 mb-3"
              onClick={handleBack}> <AiOutlineArrowLeft className="mr-2" /> Back
            </button>

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
              Medical History
            </h2>
            <h2 className="text-md font-semibold text-gray-700 mb-4 text-center">
               Do any member(s) have any existing illnesses for which they take regular medication?
            </h2>

            <h2 className="text-xl font-bold mb-4">Select Options:</h2>
            <div className="grid grid-cols-2 gap-2">
              {checkboxOptions.map((option, index) => (
                <div key={index} className="flex  border border-gray-300 rounded-lg py-3 px-3 mb-2">
                  <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    value={option}
                    checked={selectedOptions.includes(option.label)}
                    onChange={() => handleCheckboxChange(option.label)}
                    className="mr-3 mt-2 h-4 w-4 border-gray-300 rounded "
                  />
                  <label htmlFor={`checkbox-${index}`} className="text-gray-700 text-md font-semibold mt-1 ">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>

            <h2 className=" flex text-sm pt-3 pl-5 rounded-xl bg-amber-100 w-4/5 h-12 font-semibold text-gray-700 mb-4 mt-4 ml-16"> <IoMdBulb className="size-5 mr-1" /> We will find you plans that cover your condition.
            </h2>

            <div className="flex justify-between m-4">
              <h1>Get Updates on WhatsApp</h1>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-300 rounded-full  duration-500 peer-checked:after:translate-x-full after:absolute after:top-[4px] after:left-[2px] after:bg-white after:rounded-full  after:h-4 after:w-4 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <button
              className="w-full bg-black text-white text-lg font-semibold py-3 mt-1 rounded-lg"
              onClick={handleContinue}>
              Continue →
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="bg-white shadow-md rounded-lg p-5 max-w-3xl w-full">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">Thank you for choosing our Family Health Plan</h2>
            <h2 className="text-lg text-gray-600 ml-6"> Below are the details of your plan.</h2>

            <ul className=" pl-5 mt-4 ">
              {selectedMembers.map((member, idx) => (
                <li key={idx} className="text-black flex gap-7 border rounde-xl pl-5 pt-2 pb-2 justify-between pr-20">
                  <p className="text-lg">Member {idx + 1} : {member}</p>
                  <p className="text-lg"> Age : {ages[member]} yrs</p>
                </li>
              ))}
            </ul>

            <div className="pl-5 mt-2 border rounded-lg p-4 ml-5">
              <p className="text-lg">Location : {selectedCity.label}, {selectedState.label}</p>
            </div>

            <ul className=" pl-5 mt-2 border rounded-lg ml-5 mb-4">
              <p className="text-lg mt-1">Disease : </p>
              <div className="grid grid-cols-3">
                {selectedOptions.map((selectedOption, idx) => (
                  <li key={idx} className="text-black m-1 border rounded-lg p-2"> {selectedOption}
                  </li>
                ))}
              </div>
            </ul>

            <div className="border rounded-xl bg-slate-200 p-3 ml-10 mr-10">
              <h2>We are delighted to be your partner in your family’s health and well-being.</h2>
              <strong>Stay Healthy, Stay Protected!</strong>
            </div>
          </div>
        )}
      </div>
    </>
  );

}

export default App;
