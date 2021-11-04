import React from 'react';
import axios from 'axios';

class OrtegaEntrees extends React.Component{
    constructor(props){
        super(props);
        this.state = {sampleData: []};
    };
    pullData(){
        
        axios.get("http://localhost:8080/ortega")
            .then(
                (res) => {
                    let rawData = JSON.parse(JSON.stringify(res.data));
                    let newData = [];
                    let i = 0;
                    while(rawData[i].name != NULL) {
                        newData.push(rawData[i].name + "\n");
                        i++;
                    }
                    this.setState({sampleData: newData});
                    
                }

            )
        
    }
    componentDidMount(){
        this.checkInterval = setInterval(() => {
            this.pullData();
        }, 3000);
    }
    componentWillUnmount(){
        clearInterval(this.checkInterval);
    }
    render() {
        if (this.props.update){
            this.pullData();
            this.props.setUpdate(false);
        }
        return (
            
            <div>
                <p>{this.state.sampleData}</p>
            </div> 
        )
    }
}

export default OrtegaEntrees; 