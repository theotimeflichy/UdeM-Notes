import React from 'react';
import { Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const CourseBox = (data) => {

    const courseData = data.courseData;
    const title = data.title;

    const graphData = [
        {
            name: 'A+',
            grade: parseInt(courseData['A+'])
        },
        {
            name: 'A',
            grade: parseInt(courseData['A'])
        },
        {
            name: 'A-',
            grade: parseInt(courseData['A-'])
        },
        {
            name: 'B+',
            grade: parseInt(courseData['B+'])
        },
        {
            name: 'B',
            grade: parseInt(courseData['B'])
        },
        {
            name: 'B-',
            grade: parseInt(courseData['B-'])
        },
        {
            name: 'C+',
            grade: parseInt(courseData['C+'])
        },
        {
            name: 'C',
            grade: parseInt(courseData['C'])
        },
        {
            name: 'C-',
            grade: parseInt(courseData['C-'])
        },
        {
            name: 'D+',
            grade: parseInt(courseData['D+'])
        },
        {
            name: 'D',
            grade: parseInt(courseData['D'])
        },
        {
            name: 'E',
            grade: parseInt(courseData['E'])
        },
        {
            name: 'F',
            grade: parseInt(courseData['F'])
        },
        {
            name: 'W',
            grade: parseInt(courseData['W'])
        }
    ].reverse();

    return (

        <div className='courseBox'>
            <div className='row'>
                <div className='col-lg-5'>
                    {title ? (
                        <h3>{title}</h3>
                    ) : (
                        <h3>Récapitulatif</h3>
                    )}
                    <small><b>Note la plus fréquente:</b> {courseData.mostFrequentGrade}</small><br />

                    <small><b>Sessions:</b></small>
                    <div className='content content-light content-dark'>
                        <small>{courseData.sessions}</small>
                    </div>

                </div>
                <div className='col-lg-7'>

                    <ResponsiveContainer width="100%" height="100%">


                        <AreaChart isResponsive data={graphData} >
                            <XAxis
                                dataKey="name"
                                stroke="rgba(14, 22, 65,.8)"
                                tick={{ fontSize: 12 }} />
                            <YAxis stroke="rgba(0,0,0,0)" />

                            <Tooltip />



                            <Line type="monotone" dataKey="grade" stroke="#f04e24" strokeWidth={3} />

                            <defs>
                                <linearGradient id="greenToRed" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#D83F31" stopOpacity={0.6} />
                                    <stop offset="33%" stopColor="#EE9322" stopOpacity={0.6} />
                                    <stop offset="66%" stopColor="#E9B824" stopOpacity={0.6} />
                                    <stop offset="100%" stopColor="#219C90" stopOpacity={0.6} />
                                </linearGradient>
                                <linearGradient id="greenToRedLine" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#D83F31" stopOpacity={0.8} />
                                    <stop offset="33%" stopColor="#EE9322" stopOpacity={0.8} />
                                    <stop offset="66%" stopColor="#E9B824" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#219C90" stopOpacity={0.8} />
                                </linearGradient>
                            </defs>

                            <Area
                                type="monotone"
                                dataKey="grade"
                                stroke="url(#greenToRedLine)"
                                fillOpacity={1}
                                fill="url(#greenToRed)"
                                name="Nombre de notes"
                            />

                        </AreaChart>

                    </ResponsiveContainer>
                </div>
            </div>
        </div >

    );
}


export default CourseBox;