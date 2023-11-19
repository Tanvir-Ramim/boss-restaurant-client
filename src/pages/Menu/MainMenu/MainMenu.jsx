import { Helmet } from "react-helmet-async";
import Cover from "../../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg"
import dessertImg from "../../../assets/menu/dessert-bg.jpeg"
import  saladImg from "../../../assets/menu/salad-bg.jpg"
import  soupImg from "../../../assets/menu/soup-bg.jpg"
import pizzaImg from "../../../assets/menu/pizza-bg.jpg"
import useMenu from "../../../components/hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";


const MainMenu = () => {
     const [menu]=useMenu()
     const dessert=menu.filter(item=> item.category==='dessert')
     const soup=menu.filter(item=> item.category==='soup')
     const pizza=menu.filter(item=> item.category==='pizza')
     const salad=menu.filter(item=> item.category==='salad')
     const offered=menu.filter(item=> item.category==='offered')
    return (
        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
          {/* main cover */}
            <Cover img={menuImg} title='our Menu'></Cover>
            <SectionTitle heading="---Don't miss---" subHeading="To Days Offer"></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>
            {/* dessert  */}
            <MenuCategory
              items={dessert}
              title='Dessert'
              img={dessertImg}
            
            ></MenuCategory>
            {/*  pizzza*/}
            <MenuCategory
              items={pizza}
              title='Pizza'
              img={pizzaImg}
            
            ></MenuCategory>
            {/* salad */}
            <MenuCategory
              items={salad}
              title='Salad'
              img={saladImg}
            
            ></MenuCategory>
            <MenuCategory
              items={soup}
              title='Soup'
              img={soupImg}
            
            ></MenuCategory>
        </div>
    );
};

export default MainMenu;