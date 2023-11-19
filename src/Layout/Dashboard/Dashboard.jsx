import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../components/hooks/useAdmin";


const Dashboard = () => {
     
    const [isAdmin]=useAdmin()
    console.log(isAdmin)
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
               <ul className="menu p-4">
                   {
                    isAdmin ? <>
                   <li>
                    <NavLink to='/dashboard/adminHome'>  <FaHome></FaHome>Admin Home</NavLink>
                    </li>
                   <li>
                    <NavLink to='/dashboard/addItems'> <FaCalendar></FaCalendar>Add Items</NavLink>
                    </li>

                    <li>
                    <NavLink to='/dashboard/manageItems'>  <FaList></FaList> Manage Items</NavLink>
                    </li>

                   <li>
                    <NavLink to='/dashboard/bookings'><FaBook></FaBook>Manage Bookings</NavLink>
                    </li>
                   <li>
                    <NavLink to='/dashboard/users'><FaUser></FaUser>All Users</NavLink>
                    </li></>  
                    :  
                    
                    <>
                     <li>
                    <NavLink to='/dashboard/cart'>  <FaShoppingCart></FaShoppingCart>My Cart</NavLink>
                    </li>
                   <li>
                    <NavLink to='/dashboard/userHone'>  <FaHome></FaHome>User Home</NavLink>
                    </li>
                   <li>
                    <NavLink to='/dashboard/reservation'> <FaCalendar></FaCalendar>Reservation</NavLink>
                    </li>
                   <li>
                    <NavLink to='/dashboard/review'><FaAd></FaAd>Add a Review</NavLink>
                    </li>
                   <li>
                    <NavLink to='/dashboard/bookings'><FaList></FaList>My Booking</NavLink>
                    </li>
                    </>
                   }




                    <div className="divider">OR</div>


                    <li>
                    <NavLink to='/'>  <FaShoppingCart></FaShoppingCart>Home</NavLink>
                    </li>

                    <li>
                    <NavLink to='/order/salad'>  <FaSearch></FaSearch>Menu</NavLink>
                    </li>

                    <li>
                    <NavLink to='/order/contact'>  <FaEnvelope></FaEnvelope> Contact</NavLink>
                    </li>
               </ul>
            </div>
            <div className="flex-1 p-8">
                   <Outlet></Outlet>  
            </div>
        </div>
    );
};

export default Dashboard;