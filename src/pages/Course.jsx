import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CourseBox from '../components/CourseBox';

import 'bootstrap/dist/css/bootstrap.min.css';


const Course = () => {

    const [courseData, setCourseData] = useState([]);
    const { course } = useParams();

    useEffect(() => {
        fetch('http://localhost:5000/course/' + course)
            .then((response) => {
                if (!response.ok)
                    throw new Error('error from network');
                return response.json();
            })
            .then((data) => {
                setCourseData(data);
            })
            .catch((error) => { console.error(error); });
    }, []);

    if (!courseData || !courseData.overall || !courseData.byProfessor) return <p>Chargement en cours...</p>;

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-10'>

                    <h2>{courseData.overall.acronym}: {courseData.overall.title}</h2>
                    <CourseBox courseData={courseData.overall} title="Tous les professeurs" />

                    <h3>Par professeur</h3>
                    {courseData.byProfessor.map((e) => (
                        <a href={'../professor/' + e.title} >
                            <CourseBox courseData={e} title={e.title} />
                        </a>
                    ))}

                </div>
            </div>
        </div >
    );
}

export default Course;