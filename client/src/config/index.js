// Register Form controls
export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your Password",
    componentType: "input",
    type: "password",
  },
];
//Login Form Controls

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your Password",
    componentType: "input",
    type: "password",
  },
];

// Product Controls

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    placeholder: "Enter Product Title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter Product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      {
        id: "men",
        label: "Men",
      },
      {
        id: "women",
        label: "Women",
      },
      {
        id: "kids",
        label: "Kids",
      },
      {
        id: "accessories",
        label: "Accessories",
      },
      {
        id: "footwear",
        label: "Footwear",
      },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      {
        id: "nike",
        label: "Nike",
      },
      {
        id: "adidas",
        label: "Adidas",
      },
      {
        id: "puma",
        label: "Puma",
      },
      {
        id: "levi",
        label: "Levi's",
      },
      {
        id: "zara",
        label: "Zara",
      },
      {
        id: "h&m",
        label: "H&M",
      },
    ],
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter product price",
    componentType: "input",
    type: "number",
  },
  {
    name: "saleprice",
    label: "Sale Price",
    placeholder: "Enter product price (optional)",
    componentType: "input",
    type: "number",
  },
  {
    name: "totalstock",
    label: "Total Stock",
    placeholder: "Enter total stock",
    componentType: "input",
    type: "number",
  },
];

// Shoping View

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/productlist",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/productlist",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/productlist",
  },
  {
    id: "footWear",
    label: "Footwear",
    path: "/shop/productlist",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/productlist",
  },
];

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "levi", label: "Levi's" },
    { id: "puma", label: "Puma" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

//Address form controls
export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your Address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your City",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your Pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter additional notes",
  },
];
