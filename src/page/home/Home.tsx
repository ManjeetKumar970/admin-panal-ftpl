import FeaturedProducts from "@/components/featuredProducts/FeaturedProducts";
import { Footer } from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { NewArrivals } from "@/components/newArrivals/NewArrivals";
import ProductCategories from "@/components/productCategories/ProductCategories";
import { ThermalRibbons } from "@/components/thermalRibbons/ThermalRibbons";
import { TopSelling } from "@/components/topSelling/TopSelling";
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";

const Home = () => {
  return (
    <>
      <Header/>
      <Sidebar />
      <ProductCategories />
      <TopSelling />
      <NewArrivals />
      <FeaturedProducts />
      <ThermalRibbons />
      <Footer />
    </>
  );
};

export default Home;
