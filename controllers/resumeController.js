const db = require('../db');

async function uploadResumeDetails(req, res) {
  try {
    // Extract data from the request body
    const { name, current_job_title, current_job_description, current_job_company } = req.body;

    // Perform database insertion and get the generated ID
    const result = await db.query(
      `INSERT INTO resumes (name, current_job_title, current_job_description, current_job_company) 
      VALUES (?, ?, ?, ?)`,
      [name, current_job_title, current_job_description, current_job_company]
    );
    // console.log('Database Insertion Result:', result);

  
    if (result[0]?.affectedRows === 1) {
        // Successful insertion
        res.status(200).json({ resumeId: result[0].insertId });
      } else {
        // Bad request
        res.status(400).json({ error: 'Bad request' });
      }
    }
    catch (error) {
    console.error('Error uploading resume details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getResumeById(req, res) {
    try {
      const resumeId = req.params.id;
  
      // Validate the resumeId parameter
      if (!resumeId || isNaN(resumeId)) {
        return res.status(400).json({ error: 'Bad request. Invalid resume ID.' });
      }
  
      // Fetch resume details by ID from the database
      const [resume] = await db.query(
        `SELECT * FROM resumes WHERE id = ?`,
        [resumeId]
      );
  
      if (resume) {
        // Resume found
        res.status(200).json(resume);
      } else {
        // Resume not found
        res.status(404).json({ error: 'Resume not found.' });
      }
    } catch (error) {
      console.error('Error getting resume by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

async function getResumeByName(req, res) {
    try {
        const encodedName = req.params.name;
        const decodedName = decodeURIComponent(encodedName.replace(/\+/g, ' '));
    
        // Validate that the input contains both first name and last name
        const nameParts = decodedName.split(' ');
        if (nameParts.length !== 2) {
          return res.status(400).json({ error: 'Bad request. Input should contain both first name and last name.' });
        }
    
        const firstName = nameParts[0];
        const lastName = nameParts[1];
        console.log('First Name:', firstName);
console.log('Last Name:', lastName);



console.log('SQL Query:', `SELECT * FROM resumes WHERE name = ? OR name = ?`, [firstName, lastName]);

        // Query the database for resumes matching both first and last names
        const result = await db.query(
            `SELECT * FROM resumes WHERE name LIKE ? OR name LIKE ?`,
            [`%${firstName}%`, `%${lastName}%`]
          );
          console.log('SQL Query:', result.sql);

          console.log('Result:', result);

         

        res.json({ data: result[0]});
      } 
      catch (error) {
        console.error('Error retrieving resumes by name:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
  

module.exports = {
  uploadResumeDetails,
  getResumeById,
  getResumeByName
};



