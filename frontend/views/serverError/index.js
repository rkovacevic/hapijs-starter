import React, { Component } from 'react'
import {connect} from 'react-redux'

class NotFound extends React.Component {

    render() {
        return (
            <div>
                <h1>{this.props.error.error}</h1>
                <p>{this.props.error.message}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    error: state.api.error
})

export default connect(mapStateToProps)(NotFound)
