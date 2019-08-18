import React, { Component, Fragment } from 'react';
import {
	withRouter
} from 'react-router-dom';

class Orgs extends Component {
    state = {
        isLoading: true,
        orgs: []
    };

    async componentDidMount() {
        // const response = await fetch('/api/smokeTest');
        // const orgs = await response.json();
        const orgs = [
            {uid:'org1', name:'org 1'},
            {uid:'org2', name:'org 2'}
        ];
        //console.log(orgs);
        this.setState({
          orgs: orgs,
          isLoading: false
        });
    }

    render() {
        const {orgs, isLoading} = this.state;
        console.log('orgs: ', orgs);

        return (
            <div>
            <h2>Org List</h2>
                {orgs.map(org =>
                    <div key={org.uid}>
                    {org.name}
                    </div>
                )
                }
            </div>
        );
    }
};

export default withRouter(Orgs);