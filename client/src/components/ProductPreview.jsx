import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function ProductPreview({
  _id,
  category,
  name,
  price,
  age,
  location,
  discountPrice,
  discountPercentage,
  pictures,
  description,
  brand
}) {
  return (
    <LinkContainer
    className="card"
      to={`/product/${_id}`}
      style={{ cursor: "pointer", width: "", margin: "10px" }}
    >
      <Card style={{ width: "", margin: "" }}>
        <Card.Img
        className="img"
        style={{objectFit:'contain',width:'100%',background:'whitesmoke', height:'150px'}}
          variant="top"
          src={pictures[0].url}
        />
        <Card.Body className="card-body">
          <Card.Title>{name}</Card.Title>
          <div style={{ display: "flex", gap: "2rem" }}>
            {" "}
            <p
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {" "}
              <span> ksh{discountPrice}</span> 
              <span className="price">
                {discountPercentage > 0 && <div className="last-price"></div>}
                ksh{price} 
                {" "}
              </span>{" "}
              
              {""}
            </p>
            <p>{discountPercentage}%</p>
            
          </div>
          {discountPercentage>0 && (
          <span className="offer" style={{marginBottom:'5rem',color:'red'}}>Offer Offer !!</span>

          )}

          <div style={{width:'100%', display: "flex", gap: "1rem" }}>
            <p> {age} months </p>
            <p> location :  {location}</p>
          </div>
          {/* <p>{description} ....</p> */}
          {/* <Badge bg="warning" text="dark"> */}
            {/* {category} */}
          {/* </Badge> */}
          <Badge bg="warning" text="dark">
   {brand}
 </Badge>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default ProductPreview;
