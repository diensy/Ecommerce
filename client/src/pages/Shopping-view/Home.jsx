import React, { useEffect, useState } from "react";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import bannerFour from "../../assets/banner-4.png";
import bannerFive from "../../assets/banner-5.webp";
import bannerSix from "../../assets/banner-6.webp";
import { Button } from "@/components/ui/button";
import {
  AlignHorizontalJustifyCenterIcon,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  WatchIcon,
} from "lucide-react";
import { FaFemale, FaMale, FaShoePrints } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/redux/shop/Product-slice";
import ShopingProductTile from "@/components/Shopping-view/ShopingProductTile";
import {
  Md4gPlusMobiledata,
  MdAirlineSeatIndividualSuite,
  MdLocalLaundryService,
  MdOutlineNordicWalking,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/redux/shop/Cart";
import { toast } from "@/hooks/use-toast";
import ProductDetails from "@/components/Shopping-view/ProductDetails";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: FaMale },
  { id: "women", label: "Women", icon: FaFemale },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: FaShoePrints },
];

const brandWithIcon = [
  { id: "nike", label: "Nike", icon: MdOutlineNordicWalking },
  { id: "adidas", label: "Adidas", icon: MdAirlineSeatIndividualSuite },
  { id: "levi", label: "Levi's", icon: MdLocalLaundryService },
  { id: "puma", label: "Puma", icon: Md4gPlusMobiledata },
  { id: "zara", label: "Zara", icon: PlusIcon },
  { id: "h&m", label: "H&M", icon: AlignHorizontalJustifyCenterIcon },
];
const ShoppingHome = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const { productList,productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);
  const slides = [
    bannerOne,
    bannerTwo,
    bannerThree,
    bannerFour,
    bannerFive,
    bannerSix,
  ];

  //For automatic update the slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (productDetails && Object.keys(productDetails).length > 0) {
      setOpenDialog(true);
    } else {
      setOpenDialog(false);
    }
  }, [productDetails]);
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }
  function handleAddtoCart(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }
  function handleToNavigateListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilters = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilters));
    navigate(`/shop/productlist`);
  }
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="relative w-full h-[700px] overflow-hidden">
          {slides.map((slide, index) => (
            <img
              src={slide}
              key={index}
              className={`${
                index === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-full  object-cover transition-opacity duration-1000`}
            />
          ))}
          <Button
            onClick={() => {
              setCurrentSlide(
                (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
              );
            }}
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => {
              setCurrentSlide(
                (prevSlide) => (prevSlide + 1 + slides.length) % slides.length
              );
            }}
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((item) => (
              <Card
                onClick={() => handleToNavigateListingPage(item, "category")}
                className="cursor-pointer hover:shadow-lg transition-shadow "
              >
                <CardContent className="flex flex-col items-center justify-center p-5">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Shop by Brand
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandWithIcon.map((item) => (
              <Card
                onClick={() => handleToNavigateListingPage(item, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow "
              >
                <CardContent className="flex flex-col items-center justify-center p-5">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Feature Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {productList && productList.length > 0
                ? productList.map((productItem) => (
                    <ShopingProductTile
                      product={productItem}
                      handleGetProductDetails={handleGetProductDetails}
                      handleAddtoCart={handleAddtoCart}
                    />
                  ))
                : null}
            </div>
          </div>
        </section>
        <ProductDetails
          open={openDialog}
          setOpen={setOpenDialog}
          productDetails={productDetails}
        />
      </div>
    </>
  );
};

export default ShoppingHome;
