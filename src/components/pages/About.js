import React from 'react'

function About() {
    // The nice thing about React.Fragment is that it doesn't add any wraper divs on the dom.
    // It acts like a invisible element.
    return (
        <React.Fragment>
            <h1>About</h1>
            <p>This is the about page for the Todo List application of the React Crash Course.</p>
        </React.Fragment>
    )
}

export default About;