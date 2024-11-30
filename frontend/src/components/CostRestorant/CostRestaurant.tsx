import { useRef } from "react";

import { RiMoneyEuroCircleFill, RiMoneyEuroCircleLine } from "react-icons/ri";
import { OverlayPanel } from "primereact/overlaypanel";

interface RestaurantPriceProps {
  priceLevel: string;
}

const CostRestaurant: React.FC<RestaurantPriceProps> = ({ priceLevel }) => {
  const priceLevelRef = useRef<OverlayPanel>(null);

  return (
    <>
      <span
        className="cursor-pointer"
        onClick={(e) => priceLevelRef.current?.toggle(e)}
        onMouseLeave={(e) => priceLevelRef.current?.hide()}
      >
        {priceLevel === "PRICE_LEVEL_INEXPENSIVE" ? (
          <>
            <RiMoneyEuroCircleFill className="inline" />
            <RiMoneyEuroCircleLine className="inline" />
            <RiMoneyEuroCircleLine className="inline" />
          </>
        ) : priceLevel === "PRICE_LEVEL_MODERATE" ? (
          <>
            <RiMoneyEuroCircleFill className="inline" />
            <RiMoneyEuroCircleFill className="inline" />
            <RiMoneyEuroCircleLine className="inline" />
          </>
        ) : (
          priceLevel === "PRICE_LEVEL_EXPENSIVE" && (
            <>
              <RiMoneyEuroCircleFill className="inline" />
              <RiMoneyEuroCircleFill className="inline" />
              <RiMoneyEuroCircleFill className="inline" />
            </>
          )
        )}
      </span>
      <OverlayPanel ref={priceLevelRef} appendTo={document.body}>
        <div className="p-4 bg-white border border-gray-200 rounded-md shadow-md">
          <p>
            {priceLevel === "PRICE_LEVEL_INEXPENSIVE"
              ? "Inexpensive"
              : priceLevel === "PRICE_LEVEL_MODERATE"
              ? "Moderate"
              : priceLevel === "PRICE_LEVEL_EXPENSIVE" && "Expensive"}
          </p>
        </div>
      </OverlayPanel>
    </>
  );
};

export default CostRestaurant;
