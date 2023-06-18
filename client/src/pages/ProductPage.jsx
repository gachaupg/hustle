import axios from "../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  Container,
  Row,
  Col,
  Badge,
  ButtonGroup,
  Form,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import "./ProductPage.css";
import { LinkContainer } from "react-router-bootstrap";
import { useAddToCartMutation } from "../services/appApi";
import ToastMessage from "../components/ToastMessage";

function ProductPage() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [addToCart, { isSuccess }] = useAddToCartMutation();

  const handleDragStart = (e) => e.preventDefault();
  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product);
      setSimilar(data.similar);
    });
  }, [id]);

  if (!product) {
    return <Loading />;
  }
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const images = product.pictures.map((picture) => (
    <img
      className="product__carousel--image"
      src={picture.url}
      onDragStart={handleDragStart}
    />
  ));

  let similarProducts = [];
  if (similar) {
    similarProducts = similar.map((product, idx) => (
      <div className="item" data-value={idx}>
        <SimilarProduct {...product} />
      </div>
    ));
  }
  // const playAudio = () => {
  // const audioElement = document.getElementById('audioElement');
  // audioElement.play();
  //   };

  const audioElement = new Audio(
    "https://res.cloudinary.com/pitz/video/upload/v1686999687/peter/w662vmqsldm7u0bu2ekm.mp3"
  );

  const playAudio = () => {
    audioElement.play();
  };

  const pauseAudio = () => {
    audioElement.pause();
  };

  return (
    <Container className="pt-4" style={{ position: "relative" }}>
      <Row>
        <Col lg={4}>
          <AliceCarousel
            mouseTracking
            items={images}
            controlsStrategy="alternate"
          />
        </Col>
        <Col>
          {/* <div>
      <button onClick={playAudio}>Play</button>
      <button onClick={pauseAudio}>Pause</button>
      <br />
      <progress value={audioElement.currentTime} max={audioElement.duration} />
    </div> */}
          <h1>{product.name}</h1>
          {/* <button onClick={playAudio}>Play Audio</button> */}
          {/* <audio id="audioElement"> */}
          {/* <source src='https://res.cloudinary.com/pitz/video/upload/v1686999687/peter/w662vmqsldm7u0bu2ekm.mp3' type="audio/mpeg" /> */}
          {/* Your browser does not support the audio element. */}
          {/* </audio> */}
          <p></p>
          <div style={{ display: "flex", gap: "6rem" }}>
            {" "}
            <p
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {" "}
              <span> ksh{product.discountPrice}</span>
              <span className="price">
                {product.discountPercentage > 0 && (
                  <div className="last-price"></div>
                )}
                ksh{product.price}
              </span>{" "}
              {""}
            </p>
            <p>{product.discountPercentage}%</p>
            <div style={{ display: "flex", gap: "2rem" }}>
              <p> {product.age} months old</p>
              <p> location : {product.location}</p>
            </div>{" "}
          </div>

          <div style={{ display: "flex", gap: "5rem" }}>
            <p style={{ textAlign: "justify" }} className="py-3">
              <strong>Description:</strong> {product.description}
            </p>
            <p>specifications:{product.specifications}</p>
          </div>

          {user && !user.isAdmin && (
              <Button
                size="lg"
                onClick={() =>
                  addToCart({
                    userId: user._id,
                    productId: id,
                    price: product.price,
                    image: product.pictures[0].url,
                  })
                }
              >
                Add to cart
              </Button>
         
          )}

          {isSuccess && (
            <ToastMessage
              bg="info"
              title="Added to cart"
              body={`${product.name} is in your cart`}
            />
          )}
        </Col>
        {/* <div className="line"></div> */}
        <div>
          <h3>Images</h3>
          <div className="images">
            {product?.pictures?.map((image) => {
              return <img src={image.url} alt="" />;
            })}
          </div>
        </div>
      </Row>

      <div className="my-4">
        <h2>Similar Products</h2>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <AliceCarousel
            mouseTracking
            items={similarProducts}
            responsive={responsive}
            controlsStrategy="alternate"
          />
        </div>
      </div>
    </Container>
  );
}

export default ProductPage;
