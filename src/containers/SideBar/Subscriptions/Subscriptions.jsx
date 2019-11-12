import React from 'react';
import Subscription from "./Subscription/Subscription";
import { Divider } from "semantic-ui-react";
import SideBarHeader from '../SideBarHeader/SideBarHeader';

const Subscriptions = () => {
    return (
        <>
            <SideBarHeader title='Subscriptions'/>
            <Subscription label='MusicChannel' broadcasting/>
            <Subscription label='Arsenal FC' amountNewVideos={10}/>
            <Subscription label='Traversy Media' amountNewVideos={23}/>
            <Subscription label='LoveThoughts' amountNewVideos={4}/>
            <Subscription label='Udacity' amountNewVideos={114}/>
            <Divider/>
        </>
    );
}

export default Subscriptions;
