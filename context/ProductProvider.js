
import React from "react";
import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { createContext } from "react";




const ProductContext = createContext();

const ProductProvider = ({ children }) => {
 
  const socket = io.connect(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);


  const [searchResults, setSearchResults] = useState([]);
 const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [wishlist, setWishlist] = useState(null);
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const [recoverVisible, setRecoverVisible]=useState(false)


  const handleSubmit = () => {
    setIsSignUpVisible(false);
    setIsSignInVisible(true)
  };

  const handleSignIn = () =>{
    setIsSignUpVisible(false);
  }

  const handleRecovery = () => {
    setRecoverVisible(false)
  }


  // add to cart socket
  const handleAddToCart = (productId, userId) => {
    const cartdata = {
      productId: productId,
      userId: userId,
    };

    socket.emit("cartadd", cartdata);
  };

  // remove item from cart
  const handleRemoveFromCart = (productId, userId) => {
    const cartdata = {
      productId: productId,
      userId: userId,
    };

    socket.emit("cartremove", cartdata);
  };

  // minus cart quantity
  const handleCartDecrease = (productId, userId) => {
    const cartdata = {
      productId: productId,
      userId: userId,
    };

    socket.emit("cartminus", cartdata);
  };

  // get the cart products back from the server

  // useEffect(() => {
  //   socket.on("cart", (cartItems) => {
  //     console.log("cart sent back");
  //     setCartProducts(cartItems);
  //   });
  // }, []);


  // useEffect(() => {
  //   const fetchWishlistFromServer = async () => {
  //     try {
  //       // Map through the wishlist IDs and fetch product details
  //       const productsPromises = UserData.wishlist.map(async (productId) => {
  //         const productResponse = await axios.get(
  //           `${process.env.NEXT_PUBLIC_SERVER_URL}admin/commerce/products/${productId}`
  //         );
  //         return productResponse.data; // Adjust to your server's response structure
  //       });

  //       const products = await Promise.all(productsPromises);

  //       setWishlist(products);
  //     } catch (error) {
  //       console.error("Error fetching wishlist from the server:", error);
  //     }
  //   };

  //   // Fetch wishlist from the server when the component mounts
  //   fetchWishlistFromServer();
  // }, []);

 

  // emit signals to add to wish list
  // const handleWishAdd = (productId, userId) => {
  //   const wishdata = {
  //     productId: productId,
  //     userId: userId,
  //   };
  //   socket.emit("wishadd", wishdata);
  // };

  //reevie the response from the server
  // socket.on("wishlist", (userwishlist) => {
  //   // Update the local state with the updated
  //   console.log(userwishlist);
  //   setWishlist(userwishlist);
  //   console.log("returning wishlist", wishlist);
  // });

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
  };

 

   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await axios.get(
           `${process.env.EXPO_PUBLIC_SERVER_URL}admin/commerce/products`
         );
         if (response.status !== 200) {
           throw new Error("Failed to fetch products");
         }
         const fetchedProducts = response.data;
         setAllProducts(fetchedProducts);
       } catch (error) {
         console.error(error.message);
       } finally {
         setLoading(false);
       }
     };

     fetchData();
   }, []);


  // const handleSearch = (searchTerm) => {
  //   console.log("hit", searchTerm);
  //   // Filter products based on the search term
  //   const filteredProducts = allProducts.filter(
  //     (product) =>
  //       product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       product.category.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  //   setSearchResults(filteredProducts);
  //   console.log("filtered", filteredProducts);
  //   console.log("allProduct in provider", allProducts);
  // };

  // console.log("provider search results", searchResults);


  return (
    <ProductContext.Provider
      value={{
        cartProducts,
        handleAddToWishlist,
        wishlist,
        setSearchResults,
        handleRemoveFromCart,
        setLoading,
        loading,
        allProducts,

        handleAddToCart,
        handleRemoveFromCart,
        handleCartDecrease,
        isSignUpVisible,
        setIsSignUpVisible,
        setIsSignInVisible,
        handleSubmit,
        isSignInVisible,
        handleSignIn,
        setRecoverVisible,
        recoverVisible,
        handleRecovery,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

/**
 * Returns the product provider from the React context.
 * @returns {Object} The product provider.
 */
export function UseProductProvider() {
  return useContext(ProductContext);
}
