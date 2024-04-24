const axios = require("axios");
let apikey = process.env.NEXT_PUBLIC_REST_API_KEY
console.log(apikey)
const apiUrl = "https://xenomart-backend.onrender.com/api";

const axiosClient = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `Bearer ${apikey}`
    }
});

const getLatestProducts = () => axiosClient.get('/products?populate=*');
const getProductById = (id) => axiosClient.get('/products/' + id + '?populate=*');
const getProductByCategory = (category) => axiosClient.get('/products?filters[category][$eq]=' + category + "&populate=*")
const addToCart = (data) => axiosClient.post('/carts', data)
const getUserCartItem = (email) => axiosClient.get('/carts?populate[product][populate][0]=banner&filters[email][$eq]=' + email)
const deleteCartItem = (id) => axiosClient.delete('/carts/' + id)
const addToWishList = (data) => axiosClient.post('/wishlists', data)
const getToWishList = (email) => axiosClient.get('/carts?populate[product][populate][0]=banner&filters[email][$eq]=' + email)
const deleteToWishList = (id) => axiosClient.delete('/carts/' + id)

module.exports = {
    getLatestProducts,
    getProductById,
    getProductByCategory,
    addToCart,
    getUserCartItem,
    deleteCartItem,
    addToWishList,
    getToWishList,
    deleteToWishList
};