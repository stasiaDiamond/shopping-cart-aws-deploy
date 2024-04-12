import React, { useState } from 'react';
import { Card, Accordion, Button, Container, Row, Col, Image } from "react-bootstrap";

// Simulated getting products from "Database"
const products = [
  { name: 'Apples', country: 'Italy', cost: 3, instock: 11 },
  { name: 'Oranges', country: 'Spain', cost: 4, instock: 3 },
  { name: 'Beans', country: 'USA', cost: 2, instock: 5 },
  { name: 'Cabbage', country: 'USA', cost: 1, instock: 8 },
];

const Products = () => {
  const [items, setItems] = useState(products);
  const [cart, setCart] = useState([]);

  // Calculate the total cost dynamically for display
  const totalCost = cart.reduce((total, item) => total + item.cost, 0);

  const addToCart = (e) => {
    const name = e.target.name;
    const itemIndex = items.findIndex(item => item.name === name);
    if (items[itemIndex].instock > 0) {
      const updatedItems = items.map(item =>
        item.name === name ? { ...item, instock: item.instock - 1 } : item
      );
      setItems(updatedItems);

      const itemToAdd = updatedItems[itemIndex];
      setCart(currentCart => [...currentCart, { ...itemToAdd, quantity: 1 }]);
    }
  };

  const deleteCartItem = (index) => {
    const itemToRemove = cart[index];
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);

    if (itemToRemove) {
        setItems(items =>
            items.map(item =>
                item.name === itemToRemove.name ? { ...item, instock: item.instock + itemToRemove.quantity } : item
            )
        );
    }
  };

  const checkOut = () => {
    console.log(`Total checked out: $${totalCost}`);
    setCart([]); // Clear cart after checkout
  };

  let list = items.map((item, index) => (
    <li key={index}>
      <Image src={`https://picsum.photos/id/${1049 + index}/50/50`} width={70} roundedCircle />
      <Button variant="success" size="large" name={item.name} onClick={addToCart}>
        {item.name}: ${item.cost} - Qty in Stock: {item.instock}
      </Button>
    </li>
  ));

  let cartList = cart.map((item, index) => (
    <Accordion.Item key={index} eventKey={index.toString()}>
      <Accordion.Header>{item.name}</Accordion.Header>
      <Accordion.Body onClick={() => deleteCartItem(index)}>
        ${item.cost} from {item.country} - Click to Return Stock
      </Accordion.Body>
    </Accordion.Item>
  ));

  return (
    <Container>
      <Row>
        <Col>
          <h1>Product List</h1>
          <ul style={{ listStyleType: 'none' }}>{list}</ul>
        </Col>
        <Col>
          <h1>Cart Contents</h1>
          <Accordion defaultActiveKey="0">{cartList}</Accordion>
        </Col>
        <Col>
          <h1>CheckOut </h1>
          <Button onClick={checkOut}>CheckOut $ {totalCost}</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
