import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Loading from './Loading';

class App extends React.Component {
/*
	constructor(props) {
		super(props);

		//Only time direction assignment for state is allowed is in initial constructor. 
		this.state = { lat: null, errorMessage: '' };
	}
*/ //The below statement translates to a constructor method. Just simplified. 
	state = {lat: null, errorMessage: ''};

	componentDidMount(){

		window.navigator.geolocation.getCurrentPosition(
			position => this.setState({ lat: position.coords.latitude }),
			err =>  this.setState ({ errorMessage: err.message })
		);	
	}

	renderContent(){
			if(this.state.errorMessage && !this.state.lat) {
			return <div>Error: {this.state.errorMessage}</div>;
			}
			if(!this.state.errorMessage && this.state.lat) {
				return <SeasonDisplay lat={this.state.lat} />;
			} 
			return <Loading message="Reading your location...Please accept location request." />;
	}


	render() {
		return <div>{this.renderContent()}</div>;
	}
}

ReactDOM.render(
	<App />,
	document.querySelector('#root')
);