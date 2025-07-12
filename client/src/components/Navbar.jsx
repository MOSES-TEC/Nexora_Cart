import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const { user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, axios, setCartItems } = useAppContext();
    const menuRef = useRef();

    const logout = async () => {
        // setUser(null);
        // navigate('/');
        try {
            const { data } = await axios.get('/api/user/logout');
            if(data.success){
                toast.success(data.message);
                setUser(null);
                setCartItems({});
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    useEffect(() => {
        if(searchQuery.length > 0) {
            navigate("/products");
        }
    },[navigate, searchQuery]);


    useEffect(() => {
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
        }
    };

    if (open) {
        document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
    }, [open]);



  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

        <NavLink to="/" onClick={()=> setOpen(false)}>
            <img className="h-9" src={assets.logo} alt="logo" />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">All Product</NavLink>
            <NavLink to="/contact">Contact</NavLink>

            <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                <img src={assets.search_icon} alt="search" className="w-4 h-4" />
            </div>

            <div onClick={()=> navigate("/cart")} className="relative cursor-pointer">
                <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
                <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()} </button>
            </div>

           {!user ? 
           (
                 <button onClick={()=> setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                    Login
                </button>
           ): (
                 <div className="relative group">
                    <img src={assets.profile_icon} className="w-10" alt="profile" />
                    <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
                        <li onClick={()=> navigate("my-orders")} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">My Orders</li>
                        <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">Logout</li>
                    </ul>
                 </div>
           )}
        </div>


        <div className="flex items-center gap-6 sm:hidden">

            <div onClick={()=> navigate("/cart")} className="relative cursor-pointer">
                <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
                <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()} </button>
            </div>

            {/* Profile Icon */}
            {user && (
                <div onClick={() => navigate("/my-orders")} className="cursor-pointer">
                    <img src={assets.profile_icon} alt="profile" className="w-8 h-8 rounded-full border" />
                </div>
            )}

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <img src={assets.menu_icon} alt="menu" />
            </button>

        </div>


        {/* Mobile Menu */}
        { open && (
            <>
                <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setOpen(false)}></div>

                <div className="fixed top-0 right-0 w-50 h-full bg-white z-50 shadow-lg px-4 flex flex-col justify-center items-center gap-4 text-sm transition-transform duration-300">

                    {/* Profile Icon on Mobile */}
                    {user && (
                        <div className="flex items-center gap-3">
                            <img src={assets.profile_icon} alt="Profile" className="w-10 h-10 rounded-full border" />
                            <span className="text-gray-800 font-medium">{user.name}</span>
                        </div>
                    )}

                    <NavLink to="/" onClick={()=> setOpen(false)}>Home</NavLink>
                    <NavLink to="/products" onClick={()=> setOpen(false)}>All Product</NavLink>
                    { user && 
                        <NavLink to="/my-orders" onClick={()=> setOpen(false)}>My Orders</NavLink>
                    }
                    <NavLink to="/" onClick={()=> setOpen(false)}>Contact</NavLink>

                    {!user ? (
                        <button onClick={()=> {setOpen(false);
                            setShowUserLogin(true);
                        }} className="mt-4 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dull">
                            Login
                        </button>
                    ) : (
                        <button onClick={logout} className="mt-4 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dull">
                            Logout
                        </button>
                    )}
                </div>
            </>
        )}

    </nav>
  );
};

export default Navbar;


