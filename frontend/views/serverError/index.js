import React, { Component } from 'react'
import {connect} from 'react-redux'
import { pushState } from 'redux-router'

class ServerError extends React.Component {

    constructor(props) {
        super(props)
        if (props.error.error === undefined) {
            props.dispatch(pushState(undefined, '/'))
        }
    }

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

export default connect(mapStateToProps)(ServerError)
