import { color } from 'framer-motion';
import React, { useState } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name_asc");
    const [products, setProducts] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        window.location.href = '/login'; // Redirect to login page after logout
    };

    const handleSearch = (value) => {
        setSearchQuery(value);
        applySearchSort(products, value, sortBy);
    }

    const handleSort = (value) => {
        setSortBy(value);
        applySearchSort(products, searchQuery, value);
    }

    const applySearchSort = (products, searchQuery, sortBy) => {
        let filteredProducts = products;
        if (searchQuery) {
            filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (sortBy === "price_asc") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price_desc") {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortBy === "name_asc") {
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "name_desc") {
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        }
        setProducts(filteredProducts);
    };


    return (
        <>
            <div className='container-fluid mt-2'>
                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#208894' }}>
                    <div className="container-fluid">
                        <Link className="navbar-brand d-flex align-items-center ms-2" to="/">
                            <img src="/assets/images/hikeventure_logo.png" alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
                            <span className="ms-2 ml-1" style={{color:'white'}}>Hike Venture</span>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                           
                            <form className="d-flex mx-auto w-25 position-relative" role="search">
                                <input onSearch={handleSearch} type="text" className="form-control me-2" placeholder="Search" aria-label="Search" />
                                <FaSearch className="position-absolute top-50 end-0 translate-middle-y me-3" style={{ color: '#208894' }} />
                            </form>
                            <Link to="/cart" className="nav-link d-flex align-items-center">
                                <FaShoppingCart size={28} style={{ color: 'white' }} />
                            </Link>
                            <form className="d-flex mx-5" role="search">
                                {
                                    user ? (
                                        <div className="dropdown">
                                            <a className="btn  dropdown-toggle ms-3" style={{ background: 'white', color: 'black' }} role="hover" data-bs-toggle="dropdown" aria-expanded="false">
                                                Hello, {user.username}
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                                <li><a className="dropdown-item" href="/orderlist">Orders</a></li>
                                                <li><a className="dropdown-item" href="/address">Address</a></li>
                                                <li><a className="dropdown-item" href="/cart">Cart</a></li>
                                                <li><hr className="dropdown-divider" style={{ background: '#208894' }} /></li>
                                                <li><Link onClick={handleLogout} className="dropdown-item" to="/login">Logout</Link></li>
                                            </ul>
                                        </div>
                                    ) : (
                                        <Link to="/login" className="btn" style={{ backgroundColor: 'white', marginLeft: '35px', margin: '0px 30px', color: 'black' }}>Login</Link>
                                    )
                                }
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navbar;

