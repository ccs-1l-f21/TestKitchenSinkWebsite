import React from 'react';
import DiningCommons from 'main/components/DiningCommons/DiningCommons'
const DiningCommonPage = (props) => {
    return (
        <DiningCommons diningCommonCode={props.diningCommonCode}/>
    );
}

export default DiningCommonPage;