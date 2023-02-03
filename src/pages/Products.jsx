import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import { getProductsThunk } from "../store/slices/getProducts.slice";
import { useEffect, useState } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Cart4 } from "react-bootstrap-icons";
import axios from "axios";
import "../assets/styles/Poducts.css";
import getConfig from "/src/utils/getConfig";
import { addCartProductThunk } from "/src/store/slices/cartProducts.slice";
import FormGroup from "react-bootstrap/FormGroup";
import Form from "react-bootstrap/Form";

const Products = () => {
  const product = useSelector((state) => state.getProducts);
  const [categorie, setCategories] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [input, setInput] = useState("");
  const [range, setRange] = useState({ min: 0, max: 0 });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
    axios
      .get(`https://e-commerce-api.academlo.tech/api/v1/products/categories`)
      .then((resp) => setCategories(resp?.data?.data?.categories))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    setProductsFiltered(product);
  }, [product]);

  const filterByCategory = (e) => {
    const name = e.target.name;
    const productsFiltered = product.filter((p) => p.category.name == name);
    setProductsFiltered(productsFiltered);
  };

  const filterByName = () => {
    const productsFiltered = product.filter((prdt) =>
      prdt.title.toLowerCase().includes(input)
    );

    setProductsFiltered(productsFiltered);
  };

  const filterByPrice = () => {
    const productsFiltered = product.filter((prdt) => {
      if (
        (!range.min || prdt.price >= Number(range.min)) &&
        (prdt.price <= Number(range.max) || !range.max)
      )
        return true;
      return false;
    });

    setProductsFiltered(productsFiltered);
  };

  const handleAddCart = (product) => {
    dispatch(addCartProductThunk(product, 1));
  };

  return (
    <div>
      {/* <h1 className="titel">Products</h1> */}
      <div className="Botonera">
        {categorie.map((category) => (
          <Button
            key={category.id}
            variant="warning"
            onClick={filterByCategory}
            name={category.name}
          >
            {category.name}
          </Button>
        ))}
        <Button variant="warning" onClick={() => dispatch(getProductsThunk())}>
          All
        </Button>
      </div>
      <div className="filter-container">
        <div className="filter">
          <FormGroup>
            <Form.Label htmlFor="name">By Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              className="butt"
              value={input}
              onChange={(event) => setInput(event.target.value.toLowerCase())}
            />
            <Button variant="warning" onClick={filterByName}>
              Search
            </Button>
          </FormGroup>
        </div>
        <div className="filter">
          <FormGroup>
            <Form.Label htmlFor="min">By Price</Form.Label>
            <div className="division">
              <div>
                <Form.Control
                  id="min"
                  type="number"
                  className="butt"
                  value={range.min}
                  onChange={(event) =>
                    setRange({
                      ...range,
                      min: event.target.value,
                    })
                  } 
                />
              </div>
              <div className="low-Hight" >
                <Form.Label htmlFor="min"> <p></p>  Low  </Form.Label>
          
                <Form.Label htmlFor="min"> High <p></p> </Form.Label>
              </div>
              <div>
                <Form.Control
                  id="max"
                  type="number"
                  className="butt"
                  value={range.max}
                  onChange={(event) =>
                    setRange({
                      ...range,
                      max: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <Button variant="warning" onClick={filterByPrice}>
              Search
            </Button>
          </FormGroup>
        </div>
      </div>
      <div className="conteiner__pro">
        <div className="Products">
          <Row xs={1} md={2} xl={3}>
            {productsFiltered?.map((producItem) => (
              <Col key={producItem.id}>
                <Card className="container__cards">
                  {/* inicio de carousel */}
                  <Carousel interval="15000">
                    <Carousel.Item className="cards">
                      <img
                        className="d-block w-100"
                        src={producItem.productImgs[0]}
                        style={{ height: 200, width: 200, objectFit: "cover" }}
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item className="cards">
                      <img
                        className="d-block w-100"
                        src={producItem.productImgs[1]}
                        style={{ height: 200, objectFit: "cover" }}
                        alt="Second slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item className="cards w-100">
                      <img
                        className="d-block w-100"
                        src={producItem.productImgs[2]}
                        style={{ height: 200, objectFit: "cover" }}
                        alt="Third slide"
                      />
                    </Carousel.Item>
                  </Carousel>

                  <Card.Body className="card__body">
                    <Card.Title>{producItem.title}</Card.Title>
                    <Card.Text>${producItem.price}</Card.Text>
                    <div className="bu">
                      <Button
                        variant="secondary"
                        as={Link}
                        to={`/product/${producItem.id}`}
                      >
                        Details
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => handleAddCart(producItem)}
                      >
                        <Cart4 />
                      </Button>
                    </div>

                    {/* crear condiconal para entrar al carrito */}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Products;
