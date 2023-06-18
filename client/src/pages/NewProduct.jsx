import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import axios from "../axios";
import "./NewProduct.css";

function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [discountPercentage, setDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [numberItems, setnumberItems] = useState("");
  const [infoAdd, setinfoAdd] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState([]);
  const [specifications,setspecifications]=useState('')
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return alert("Please fill out all the fields");
    }
    createProduct({
      name,
      description,
      price,
      discountPercentage,
      category,
      images,
      age,
      infoAdd,
      location,
      brand,
      specifications
    }).then(({ data }) => {
      if (data.length > 0) {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    });
  }

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "pitz",
        uploadPreset: "peter-main",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 className="mt-4">Create a product</h1>
            {isSuccess && (
              <Alert variant="success">Product created with succcess</Alert>
            )}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Product description"
                style={{ height: "100px" }}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
  <Form.Label>Product specifications</Form.Label>
  <Form.Control
    as="textarea"
    placeholder="Product specifications"
    style={{ height: "300px" }}
    value={specifications}
    required
    onChange={(e) => setspecifications(e.target.value)}
  />
</Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price ($)"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Discount(%)</Form.Label>
              <Form.Control
                type="number"
                placeholder="discount (%)"
                value={discountPercentage}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>{" "}
            <Form.Group className="mb-3">
   <Form.Label>Additional info</Form.Label>
   <Form.Control
     type="text"
     placeholder="additional info"
     value={infoAdd}
     onChange={(e) => setinfoAdd(e.target.value)}
   />
 </Form.Group>{" "}
 <Form.Group className="mb-3">
   <Form.Label>Age of the item in months</Form.Label>
   <Form.Control
     type="number"
     placeholder="age in months"
     value={age}
     onChange={(e) => setAge(e.target.value)}
   />
 </Form.Group>{" "}
 <Form.Group className="mb-3">
   <Form.Label>Location of the item</Form.Label>
   <Form.Control
     type="text"
     placeholder="location"
     value={location}
     onChange={(e) => setLocation(e.target.value)}
   />
 </Form.Group>{" "}
 <Form.Group className="mb-3">
  <Form.Label>Brand</Form.Label>
  <Form.Control
    type="text"
    placeholder="location"
    value={brand}
    onChange={(e) => setBrand(e.target.value)}
  />
</Form.Group>{" "}
            <Form.Group
              className="mb-3"
              onChange={(e) => setCategory(e.target.value)}
            >
              <Form.Label>Category</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select One --
                </option>
                <option value="technology">technology</option>
                <option value="tablets">tablets</option>
                <option value="phones">phones</option>
                <option value="laptops">laptops</option>
                <option value="electronics">Electronics</option>
                <option value="funatures">Furnatures</option>
                <option value="cars">Cars</option>
                <option value="clothing">Clothing</option>
                <option value="shoes">Shoes</option>
                <option value="houses">Houses</option>
                <option value="land">Plots</option>
                <option value="others">Others</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>
                Upload Images
              </Button>
              <div className="images-preview-container">
                {images.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} />
                    {imgToRemove != image.public_id && (
                      <i
                        className="fa fa-times-circle"
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>
            <Form.Group>
              <Button type="submit" disabled={isLoading || isSuccess}>
                Create Product
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product__image--container"></Col>
      </Row>
    </Container>
  );
}

export default NewProduct;
