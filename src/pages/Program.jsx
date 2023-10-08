import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CourseBox from '../components/CourseBox';

import 'bootstrap/dist/css/bootstrap.min.css';


const Program = () => {

    const [courseData, setCourseData] = useState([]);
    const { program } = useParams();

    useEffect(() => {
        fetch('http://localhost:5000/program/' + program)
            .then((response) => {
                if (!response.ok)
                    throw new Error('error from network');
                return response.json();
            })
            .then((data) => { setCourseData(data); });
    }, []);

    if (!courseData || !courseData.overall) return <p>Chargement en cours...</p>;

    console.log(courseData.overall)

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-10'>

                    <h2>{program}</h2>
                    <CourseBox courseData={courseData.overall} title="Tous les cours" />

                    <h3>Cours</h3>
                    {courseData.courses.map((e) => (
                        <a href={'../course/' + e.acronym} >
                            <CourseBox courseData={e} title={e.title} />
                        </a>
                    ))}

                </div>
            </div>
        </div >
    );
}

export default Program;