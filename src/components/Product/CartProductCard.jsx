import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { IndianRupee, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";

const CartProductCard = ({ product, onRemove, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(product.quantity || 1);

  const imageUrl = useMemo(() => {
    const images = product.productImages || [];
    if (images.length > 0 && images[0].data) {
      return `data:image/png;base64,${images[0].data}`;
    }
    if (images.length > 0 && images[0].url) {
      return images[0].url;
    }
    return "/images/placeholder-image.png";
  }, [product.productImages]);

  const roundedDiscount = useMemo(
    () => Math.round(product.discount || 0),
    [product.discount]
  );
  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (onUpdateQuantity) onUpdateQuantity(product._id, newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (onUpdateQuantity) onUpdateQuantity(product._id, newQuantity);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-4">
        <div className="flex flex-wrap justify-between gap-4">
          {/* Product Image */}
          <div className="w-28 h-28">
            <Image
              src={imageUrl}
              alt={product.productName || "Product Image"}
              className="w-full h-full object-cover rounded-md"
              width={200}
              height={200}
              loading="lazy"
            />
          </div>
          {/* Product Details */}
          <div className="flex-1">
            <h1 className="text-lg font-semibold capitalize tracking-tighter">
              {product.productName || "Product Name"}
            </h1>
            <div className="flex gap-1 items-center">
              <p className="text-lg font-bold flex items-center">
                <IndianRupee size="15" strokeWidth={3} />
                {product.sellingPrice || 0}
              </p>
              <div className="flex gap-3">
                {product.productPrice > 0 && (
                  <p className="text-gray-500 text-sm font-semibold line-through flex items-center">
                    <IndianRupee size="13" strokeWidth={3} />
                    {product.productPrice}
                  </p>
                )}
                {roundedDiscount > 0 && (
                  <Badge className="text-xs">{roundedDiscount}% OFF</Badge>
                )}
              </div>
            </div>
            <p
              className={`text-sm font-semibold tracking-tighter ${
                product.outOfStocks ? "text-red-500" : "text-green-500"
              }`}
            >
              {product.outOfStocks ? "Currently Unavailable" : "In Stock"}
            </p>
          </div>

          {/* Quantity Control and Remove Button */}
          <div className="text-right space-y-4">
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                className="rounded-full"
                variant="outline"
                aria-label="Increase Quantity"
                onClick={handleIncrease}
              >
                <Plus />
              </Button>
              <span className="text-lg font-semibold">{quantity}</span>
              <Button
                size="icon"
                className="rounded-full"
                variant="outline"
                aria-label="Decrease Quantity"
                onClick={handleDecrease}
                disabled={quantity === 1}
              >
                <Minus />
              </Button>
            </div>
            <Button
              variant="destructive"
              className="text-sm w-full"
              onClick={() => onRemove(product._id)}
            >
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

CartProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    productImages: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    productName: PropTypes.string,
    sellingPrice: PropTypes.number,
    productPrice: PropTypes.number,
    discount: PropTypes.number,
    outOfStocks: PropTypes.bool,
    quantity: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
};

export default CartProductCard;
