import { useState } from 'react';
import Cover from '../../Shared/Cover/Cover';
import orderCover from '../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../components/hooks/useMenu';

import OrderTab from './oderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Order = () => {
  const categories=['Salad','Pizza','Soup','Dessert','Drinks']
  const {category}= useParams()
  const initialIndex=categories.indexOf(category)
    const [tabIndex,setTabIndex]=useState(initialIndex)
    const [menu]=useMenu()
    
    const dessert=menu.filter(item=> item.category==='dessert')
    const soup=menu.filter(item=> item.category==='soup')
    const pizza=menu.filter(item=> item.category==='pizza')
    const salad=menu.filter(item=> item.category==='salad')
    const drinks=menu.filter(item=> item.category==='drinks')
    return (
        <div>
           <Helmet>
                <title>Bistro | Order Food</title>
            </Helmet>
            <Cover img={orderCover} title='Order Food'></Cover>

            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
  <TabList>
    <Tab>Salad</Tab>
    <Tab>Pizza</Tab>
    <Tab>Soup</Tab>
    <Tab>Dessert</Tab>
    <Tab>Drinks</Tab>
  </TabList>
  <TabPanel>
    <OrderTab items={salad}></OrderTab>
  </TabPanel>
  <TabPanel>
  <OrderTab items={pizza}></OrderTab>
  </TabPanel>
  <TabPanel>
  <OrderTab items={soup}></OrderTab>
  </TabPanel>
  <TabPanel>
  <OrderTab items={dessert}></OrderTab>
  </TabPanel>
  <TabPanel>
  <OrderTab items={drinks}></OrderTab>
  </TabPanel>
</Tabs>
        </div>
    );
};

export default Order;