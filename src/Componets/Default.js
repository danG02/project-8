import React, { Component } from 'react';

class Default extends React.Component {
    render() { 
        console.log(this.props);
        return (
        <div>
            <h3>Page not found</h3>
        </div>
        );
    }
}
 
export default Default;