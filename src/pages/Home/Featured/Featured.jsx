import SectionTitle from "../../../components/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'
const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            <SectionTitle subHeading={'FROM OUR MENU'} heading={'---Check it out---'}></SectionTitle>
            <div className="md:flex justify-center items-center pb-20 bg-slate-500 bg-opacity-60  pt-12 px-36 ">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10 ">
                    <p>Aug 20,2029</p>
                    <p className="uppercase">Where can i get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, voluptatem assumenda consectetur sunt, explicabo, impedit velit numquam cumque voluptate expedita deserunt earum quasi laudantium recusandae praesentium soluta suscipit labore dicta!</p>
                    <button className="btn btn-outline border-b-4 border-0">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;