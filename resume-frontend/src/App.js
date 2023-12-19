import React, { useState } from 'react';
import { getResumeById, getResumeByName, uploadResumeDetails } from './api';


function App() {
  const [resumeId, setResumeId] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [resumeDetails, setResumeDetails] = useState(null);
  const [resumesByName, setResumesByName] = useState(null);



    const [name, setName] = useState('');
    const [current_job_title, setCurrentJobTitle] = useState('');
    const [ current_job_description , setCurrentJobDescription] = useState('');
    const [current_job_company, setCurrentJobCompany] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);


   

    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Call your API function to upload resume details
        const response = await uploadResumeDetails({
          name,
         current_job_title,
          current_job_description ,
          current_job_company,
        });
  
        // Handle the response as needed
        console.log('Resume upload successful. Resume ID:', response);
  
        // Update state to show success message
        setUploadSuccess(true);
  
        // Clear the form fields after successful submission
        setName('');
        setCurrentJobTitle('');
        setCurrentJobDescription ('');
        setCurrentJobCompany('');
      } catch (error) {
        console.error('Error uploading resume details:', error);
      }
    };
  




  const handleRetrieveById = async () => {
    try {
      const details = await getResumeById(resumeId);
      console.log('Response from API:', details);
      setResumeDetails(details);
      setResumesByName(null); // Reset resumes by name
    } catch (error) {
      console.error('Error retrieving resume by ID:', error);
    }
  };
  




  const handleRetrieveByName = async () => {
    try {
      const resumes = await getResumeByName(encodeURIComponent(resumeName));
      setResumesByName(resumes);
      setResumeDetails(null); // Reset resume details
    } catch (error) {
      console.error('Error retrieving resumes by name:', error);
    }
  };

  return (



    
    <div style={{ display: 'flex' }}>


<style>
        {`
 
          input,label,button {
            margin-left:10px;
          }
        `}
      </style>



    <div style={{ width: '50%',  border: '2px solid black', marginLeft: '10px' }}>
      <h1 style={{ textAlign : 'center', }}>Resume Viewer</h1>
      <div>
        <label>
          Enter Resume ID :  {' '}
          <input type="text" value={resumeId} onChange={(e) => setResumeId(e.target.value)} />
        </label>
        <button onClick={handleRetrieveById}>Retrieve Resume Details</button> <br /><br />
      </div>
      <div>
        <label>
          Enter Resume Name :   {' '}
          <input type="text" value={resumeName} onChange={(e) => setResumeName(e.target.value)} />
        </label>
        <button onClick={handleRetrieveByName}>Retrieve Resumes by Name</button> <br /><br />
      </div>
      <div>
        {resumeDetails && (
          <div>
            <h2>Resume Details</h2>
            <pre>{JSON.stringify(resumeDetails, null, 2)}</pre>
          </div>
        )}
        {resumesByName && (
          <div>
            <h2>Resumes by Name</h2>
            <pre>{JSON.stringify(resumesByName, null, 2)}</pre>
          </div>
        )}
      </div>
</div>
  <form style={{ width: '50%', border: '2px solid black', marginLeft: '10px', marginRight: '10px' }} onSubmit={handleFormSubmit}>
  <h1 style={{ textAlign : 'center', }}>Upload Resume Details</h1>
  <label>
    Name :  {' '}
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
  </label><br />
  <br />

  <label>
    Current Job Title :  {' '}
    <input
      type="text"
      value={current_job_title}
      onChange={(e) => setCurrentJobTitle(e.target.value)}
      required
    />
  </label><br />
  <br />

  <label>
    Current Job Description :  {' '}
    <textarea
      value={ current_job_description }
      onChange={(e) => setCurrentJobDescription(e.target.value)}
      required
    />
  </label><br />
  <br />

  <label>
    Current Job Company :  {' '}
    <input
      type="text"
      value={current_job_company}
      onChange={(e) => setCurrentJobCompany(e.target.value)}
      required
    />
  </label><br />
  <br />

  {/* Add more fields as needed for other details like education, skills, etc. */}
  
  <button style={{ display: 'block', margin: 'auto' , marginTop:'10px', marginBottom :'10px'}}  type="submit">Upload Resume</button>

  {uploadSuccess && (
    <div style={{ color: 'green', marginTop: '10px' }}>
      Resume details uploaded successfully!!  
    </div>  
  )}
</form>




    </div>
  );
}

export default App;




