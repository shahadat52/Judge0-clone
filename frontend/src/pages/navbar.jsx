import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/contextProvider';

const Navbar = () => {
    const { user, LogOut } = useContext(AuthContext)

    const handleSignOut = () => {
        LogOut()
            .then(() => {
                // Swal.fire("User Log Out", "", "success");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const menuItems = <>
        <li>
            <NavLink to="/"
                className={({ isActive }) =>
                    isActive
                        ? "font-bold text-lg tracking-wide text-primary transition-colors duration-200 hover:text-deep-purple-accent-400"
                        : " tracking-wide text-lg text-black  transition-colors duration-200 hover:text-deep-purple-accent-400"
                }
            >Home</NavLink>
        </li>

        {
            user?.uid ? <>
               
                <div className="dropdown dropdown-bottom dropdown-end">
                    <label tabIndex={0}  className=" avatar "><div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ">
                        <img src={user.photoURL} alt='Profile pictures' />
                    </div></label>
                    <div tabIndex={0} className="dropdown-content bg-primary menu p-2 shadow  rounded-box w-52">
                        <div className="card-body">
                            <li onClick={handleSignOut}><NavLink><span className='text-black text-lg font-bold'>SingOut</span></NavLink></li>
                        </div>
                    </div>
                </div>

            </> : <li><NavLink className={({ isActive }) =>
                isActive
                    ? "font-bold text-lg tracking-wide text-primary transition-colors duration-200 hover:text-deep-purple-accent-400"
                    : " tracking-wide text-lg font-bold text-black  transition-colors duration-200 hover:text-deep-purple-accent-400"
            } to="/login">Login</NavLink></li>
        }
    </>
    return (
        <div className=''>
            <div className="navbar blur-container backdrop-blur-lg flex justify-between bg-black ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <Link className=" normal-case text-primary text-2xl font-bold ">Judge0</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {menuItems}
                    </ul>
                </div>


            </div>

        </div>
    );
};

export default Navbar;