import React, { useState, useEffect } from 'react';

const ShowResults = (data) => {

    const results = data.results;

    return (

        <div>
            {results.departments.length > 0 && (
                <div>
                    <h3>Départements</h3>
                    <ul>
                        {results.departments.map((r) => (
                            <a href={`/departement/${r.name}`}>
                                <div className='content content-light'>
                                    <span className='badge badge-blue'>{r.acronym}</span> {r.name}
                                </div>
                            </a>
                        ))}
                    </ul>
                </div>
            )}

            {results.programs.length > 0 && (
                <div>
                    <h3>Programmes</h3>
                    <ul>
                        {results.programs.map((r) => (
                            <a href={`/program/${r.name}`}>
                                <div className='content content-light'>
                                    {r.name}
                                </div>
                            </a>
                        ))}
                    </ul>
                </div>
            )}

            {results.courses.length > 0 && (
                <div>
                    <h3>Cours</h3>
                    <ul>
                        {results.courses.map((r) => (
                            <a href={`/course/${r.acronym}`}>
                                <div className='content content-light'>
                                    <span className='badge badge-blue'>{r.acronym}</span> {r.title}
                                </div>
                            </a>
                        ))}
                    </ul>
                </div>
            )}

            {results.professors.length > 0 && (
                <div>
                    <h3>Professeurs</h3>
                    <ul>
                        {results.professors.map((r) => (
                            <a href={`/professor/${r.professor}`}>
                                <div className='content content-light'>
                                    {r.professor}
                                </div>
                            </a>
                        ))}
                    </ul>
                </div>
            )}
        </div>

    );
}


export default ShowResults;