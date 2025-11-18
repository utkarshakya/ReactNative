import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const extractProduct = (data) => {
      const filteredData = data.map((item) => ({
        id: item.id,
        name: item.title,
        description: item.description,
        image: item.images,
        price: item.price,
        rating: item.rating,
        brand: item.brand,
        category: item.category,
      }));
      setProducts(filteredData);
    };
    // This is an IIFE
    (async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=10"
        );
        const data = await response.json();
        const products = data?.products;
        if (products) {
          console.log("Got Products");
        }
        extractProduct(products);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  return (
    <>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={{ padding: 8 }}
      />
    </>
  );
};

export default ProductSection;
