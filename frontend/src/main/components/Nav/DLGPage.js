import React from 'react';
import axios from 'axios';

class DLGEntrees extends React.Component{
    constructor(props){
        super(props);
        this.state = {sampleData: []};
    };
    pullData(){
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
        const dayOfTheWeek = current.getDay();
        const hour = current.getHours();
        const minute = current.getMinutes();
        var mealOfTheDay; 

        if ((dayOfTheWeek != 0 && dayOfTheWeek != 6) && (((7 == hour && minute > 15) || hour > 7) && hour < 10)){
            mealOfTheDay = "breakfast"; 
        }
        else if ((dayOfTheWeek != 0 && dayOfTheWeek != 6) && ((hour >= 11) && hour < 15)){
            mealOfTheDay = "lunch"; 
        }
        else if ((hour >= 17) && (hour <= 20 && minute <= 30)) {
            mealOfTheDay = "dinner"; 
        }
        else if ((dayOfTheWeek == 0 || dayOfTheWeek == 6) && (hour <= 10 && hour < 14)) {
            mealOfTheDay = "brunch";
        }
        else {
            this.setState({sampleData: "No Meals at the Current Time"});
            return;
        }
        const url = "https://testkitchensinknew.herokuapp.com/api/dining/menu?date=" + date + "&diningCommonsCode=portola&mealCode=" + mealOfTheDay;
        
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

export default DLGEntrees; 