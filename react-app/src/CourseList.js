import React, { useEffect, useState } from 'react';
import axios from 'axios';


const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get('http://localhost:5000/api/course'); // Adjust URL as needed
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses.");
      }
    }

    fetchCourses();
  }, []);

 return (
    <div>
      <h1>Course List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
              <li key={course.id || course.name || course.start_date}> {/* Use a unique key prop */}
                  <h3>{course.name}</h3>
                  <p>{course.description}</p>
                  <p>Start Date: {course.start_date}</p>
                  <p>End Date: {course.end_date}</p>
                  <p>Paid: {course.payed ? 'Yes' : 'No'}</p>
              </li>
          ))}
        </ul>
      ) : (
          <p>No courses available</p>
      )}
    </div>
  );
};

export default CourseList;