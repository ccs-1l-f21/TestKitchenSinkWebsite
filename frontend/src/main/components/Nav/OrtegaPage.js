import React from 'react';
import axios from 'axios';

class OrtegaEntrees extends React.Component{
    constructor(props){
        super(props);
        this.state = {sampleData: []};
    };
    pullData(){
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
        const dayOfTheWeek = current.getDay();
        const hour = current.getHours();

        if (dayOfTheWeek == 0 || dayOfTheWeek == 6) {
            this.setState({sampleData: "No Ortega today"});
            return;
        }
        else {
            if (hour < 11 || hour > 18) {
                this.setState({sampleData: "No Ortega at this time"});
                return;  
            }
        }
        
        const url = "https://testkitchensinknew.herokuapp.com/api/dining/menu?date=" + date + "&diningCommonsCode=ortega&mealCode=lunch";
        axios.get(url)
            .then(
                (res) => {
                    let rawData = JSON.parse(JSON.stringify(res.data));
                    rawData.push({ name : "none", station : "none" });
                    let newData = [];
                    let i = 0;
                    while(rawData[i].station != "none") {
                        newData.push(rawData[i].name + ", ");
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
    mealItemToDivElement(item) {
        return (
            <div>{item}</div>
        )
    }
    render() {
        if (this.props.update){
            this.pullData();
            this.props.setUpdate(false);
        }
        return (
            <div>
                <p>{this.state.sampleData.forEach(this.mealItemToDivElement)}</p>
            </div> 
        )
    }
}

export default OrtegaEntrees; 