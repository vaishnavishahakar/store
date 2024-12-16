import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PRODUCTS = [
  {
    item: "Surf-Excel",
    price: 200,
    quantity: 5,
  },
  {
    item: "TATA Salt",
    price: 100,
    quantity: 10,
  },
  {
    item: "Pears Soap",
    price: 30,
    quantity: 15,
  },
  {
    item: "Nivea Body Lotion",
    price: 120,
    quantity: 8,
  },
  {
    item: "Loreal Paris Shampoo",
    price: 180,
    quantity: 3,
  },
];

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.get("/products", (req, res) => {
  res.json({
    success: true,
    data: PRODUCTS,
    message: "Products fetched successfully",
  });
});

app.post("/products", (req, res) => {
  const { item, price, quantity } = req.body;

  //validation
  if (!quantity) {
    return res.status(400).json({
      success: false,
      message: "quantity is required",
    });
  }
  if (!item) {
    return res.status(400).json({
      success: false,
      message: "item is required",
    });
  }
  if (!price) {
    return res.status(400).json({
      success: false,
      message: "price is required",
    });
  }

  const productWithItem = PRODUCTS.find((prod) => {
    if (prod.item === item) {
      return prod;
    }
  });

  if (productWithItem) {
    return res.status(400).json({
      success: false,
      message: "This product is already exists",
    });
  }

  const products = {
    item,
    price,
    quantity,
  };

  PRODUCTS.push(products);

  res.status(201).json({
    success: true,
    data: products,
    message: "Products added successfully",
  });
});

app.delete("/products/:item", (req, res) => {
  const { item } = req.params;
  const productIndex = PRODUCTS.findIndex((prod) => prod.item === item);

  if (productIndex === -1) {
    return res.json({
      success: false,
      message: `Product with item name '${item}' does not exist`,
    });
  }

  const deletedProduct = PRODUCTS.splice(productIndex, 1);

  res.json({
    success: true,
    data: deletedProduct[0],
    message: `Product '${item}' deleted successfully`,
  });
});

app.put("/products/:item", (req, res) => {
  const { item } = req.params;
  const { price, quantity } = req.body;

  const productIndex = PRODUCTS.findIndex((prod) => prod.item === item);

  if (productIndex === -1) {
    return res.json({
      success: false,
      message: `Product with item name '${item}' does not exist`,
    });
  }

  if (price !== undefined) PRODUCTS[productIndex].price = price;
  if (quantity !== undefined) PRODUCTS[productIndex].quantity = quantity;

  res.json({
    success: true,
    data: PRODUCTS[productIndex],
    message: `Product '${item}' updated successfully`,
  });
});

app.patch("/products/:item", (req, res) => {
  const { item } = req.params;
  const { price, quantity } = req.body;

  const productIndex = PRODUCTS.findIndex((prod) => prod.item === item);

  if (productIndex === -1) {
    return res.json({
      success: false,
      message: `Product with item name '${item}' does not exist`,
    });
  }

  if (price !== undefined) PRODUCTS[productIndex].price = price;
  if (quantity !== undefined) PRODUCTS[productIndex].quantity = quantity;

  res.json({
    success: true,
    data: PRODUCTS[productIndex],
    message: `Product '${item}' updated successfully`,
  });
});

app.get("/products/:item", (req, res) => {
    const { item } = req.params;
  
    const productIndex = PRODUCTS.findIndex((prod) => prod.item === item);
  
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Product with item name '${item}' does not exist`,
      });
    }
  
  const products = PRODUCTS[productIndex];
  
    res.status(200).json({
      success: true,
      data: PRODUCTS[productIndex],
      message: `Product '${item}' updated successfully`,
    });
  });

app.get("*", (req, res) => {
  res.json({
    success: false,
    message: "Invalid API",
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
