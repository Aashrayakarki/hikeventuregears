import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../apis/api";
import FooterCard from "../../components/FooterCard";
import ProductCard from "../../components/ProductCard";
import "./Style.css";

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        "/assets/images/trek1.jpg",
        "/assets/images/trek2.jpg",
        "/assets/images/trek3.avif",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 8000); // 8000ms = 8s

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className='banner-container '>
            <img src={images[currentIndex]} alt='banner' className='banner-image' />
        </div>
    );
};

const categories = [
    { name: "Trekking Shoes", img: "/assets/icon/shoes.png" },
    { name: "Trekking Poles", img: "/assets/icon/poles.png" },
    { name: "Trekking Backpacks", img: "/assets/icon/bag.png" },
    { name: "Trekking Jackets", img: "/assets/icon/jacket.png" },
    { name: "Trekking Bottles", img: "/assets/icon/bottle.png" },
    
];

const Pagination = ({ currentPage, totalPages, paginate }) => {
    return (
        <div className='pagination-container'>
            <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            <input
                type='number'
                value={currentPage}
                onChange={(e) => paginate(Number(e.target.value))}
                min='1'
                max={totalPages}
                className='page-input'
            />
            <span>of {totalPages}</span>
            <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
};

const Dashboard = () => {
    // State for all fetched products
    const [products, setProducts] = useState([]); //array
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    // Call API initially (page load) - set all fetched products to state
    useEffect(() => {
        getAllProducts()
            .then((res) => {
                //response : res.data.products (all products)
                setProducts(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Calculate the products to display on the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    // Change page
    const paginate = (pageNumber) => {
        if (pageNumber < 1) pageNumber = 1;
        if (pageNumber > Math.ceil(products.length / productsPerPage))
            pageNumber = Math.ceil(products.length / productsPerPage);
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className='dashboard'>
                <Banner />
                <div className='categories-container mt-5'>
                    {/* <h2 className='title'>Explore Categories</h2> */}
                    <div className='categories'>
                        {categories.map((category, index) => (
                            <div key={index} className='category-item'>
                                <img
                                    src={category.img}
                                    alt={category.name}
                                    className='category-image'
                                />{" "}
                                <br />
                                <span>{category.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <h4>Featured Products</h4>

                <div className='row container-fluid'>
                    {currentProducts.map((singleProduct, index) => (
                        <div key={index} className='col-12 p-1 col-sm-6 col-lg-3'>
                            <ProductCard productInformation={singleProduct} color={"green"} />
                        </div>
                    ))}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(products.length / productsPerPage)}
                    paginate={paginate}
                />
            </div>
            <FooterCard />
        </>
    );
};

export default Dashboard;