import FilterProduct from "@/components/Shopping-view/FilterProduct";
import ProductDetails from "@/components/Shopping-view/ProductDetails";
import ShopingProductTile from "@/components/Shopping-view/ShopingProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/redux/shop/Cart";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/redux/shop/Product-slice";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const ShoppingProductLIst = () => {
  const { toast } = useToast();
  const [filters, setFilter] = useState({});
  const [sort, setSort] = useState(null);
  const [search, setSearch] = useSearchParams();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  // Fetch All Products
  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  function handleSort(value) {
    setSort(value);
  }
  function handleFilter(getSectionId, getCurrentOptions) {
    console.log(getSectionId, getCurrentOptions);
    let cpyFilters = { ...filters };
    const indexOfCurrent = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCurrent === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOptions],
      };
    } else {
      const indexOfCurrent =
        cpyFilters[getSectionId].indexOf(getCurrentOptions);
      if (indexOfCurrent === -1) {
        cpyFilters[getSectionId].push(getCurrentOptions);
      } else {
        cpyFilters[getSectionId].splice(indexOfCurrent, 1);
      }
    }
    setFilter(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }
  // Default Sort and Filter
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilter(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  // For create search for filtering
  function createSearchParamsHelper(filterParams) {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");

        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }
    return queryParams.join("&");
  }
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearch(new URLSearchParams(createQueryString));
    }
  }, [filters]);
  // Get one product details
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  // For open Details Dialog
  useEffect(() => {
    if (productDetails && Object.keys(productDetails).length > 0) {
      setOpenDialog(true);
    } else {
      setOpenDialog(false);
    }
  }, [productDetails]);
  // for add to cart
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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
        <FilterProduct filters={filters} handleFilter={handleFilter} />
        <div className="bg-background w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex items-center  justify-between">
            <h2 className="text-lg font-extrabold ">All Products</h2>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">
                {productList.length} Products{" "}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={handleSort}
                  >
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShopingProductTile
                    key={productItem._id}
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
        <ProductDetails
          open={openDialog}
          setOpen={setOpenDialog}
          productDetails={productDetails}
        />
      </div>
    </>
  );
};

export default ShoppingProductLIst;
