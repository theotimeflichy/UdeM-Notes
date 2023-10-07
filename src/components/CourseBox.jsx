import React, { PureComponent } from 'react';
import { ReferenceArea, LineChart, Line, Bar, XAxis, YAxis, BarChart, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import ReactDOM from 'react-dom';

const CourseBox = (data) => {

    const courseData = data.courseData;

    const graphData = [
        {
            name: 'A+',
            grade: courseData['A+']
        },
        {
            name: 'A',
            grade: courseData['A']
        },
        {
            name: 'A-',
            grade: courseData['A-']
        },
        {
            name: 'B+',
            grade: courseData['B+']
        },
        {
            name: 'B',
            grade: courseData['B']
        },
        {
            name: 'B-',
            grade: courseData['B-']
        },
        {
            name: 'C+',
            grade: courseData['C+']
        },
        {
            name: 'C',
            grade: courseData['C']
        },
        {
            name: 'C-',
            grade: courseData['C-']
        },
        {
            name: 'D+',
            grade: courseData['D+']
        },
        {
            name: 'D',
            grade: courseData['D']
        },
        {
            name: 'E',
            grade: courseData['E']
        },
        {
            name: 'F',
            grade: courseData['F']
        }
    ].reverse();

    const graphDataOthers = [
        {
            name: 'W',
            grade: courseData['W'] + 5
        },
        {
            name: '(S)',
            grade: courseData['(S)'] + 4
        },
        {
            name: '(E)',
            grade: courseData['(E)'] + 2
        }
    ]

    return (

        <div className='content content-lightblue'>
            <div className='row'>
                <div className='col-lg-5'>
                    <h3>Tous les professeurs</h3>
                    <small><b>Note la plus fréquente:</b> {courseData.mostFrequentGrade}</small><br />
                    <small><b>Sessions:</b></small>
                    <div className='content content-light content-dark'>
                        <small>{courseData.sessions}</small>
                    </div>

                </div>
                <div className='col-lg-7'>

                    <ResponsiveContainer width="100%" height="100%">


                        <AreaChart isResponsive
                            data={graphData}
                        >
                            <XAxis dataKey="name" />
                            <Tooltip />



                            <Line type="monotone" dataKey="grade" stroke="#f04e24" strokeWidth={2} />

                            <defs>
                                <linearGradient id="topToBottom" x1="1" y1="0" x2="1" y2="1">
                                    <stop offset="5%" stopColor="#0057ac" stopOpacity={0.7} />
                                    <stop offset="95%" stopColor="#0057ac" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>

                            <Area
                                type="monotone"
                                dataKey="grade"
                                stroke="#0057ac"
                                fillOpacity={1}
                                fill="url(#topToBottom)"
                                name="Nombre de notes"
                            />

                        </AreaChart>

                    </ResponsiveContainer>
                </div>
            </div>
        </div>

    );
}


export default CourseBox;