import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { simplifyNumber } from "../../utils/utils";

interface RatingRestaurantProps {
  rating: number;
  userRatingCount: number;
}

const RatingRestaurant: React.FC<RatingRestaurantProps> = ({
  rating,
  userRatingCount,
}) => {
  return (
    <>
      {rating < 2 ? (
        <BsStar className="inline text-amber-400" />
      ) : rating < 4 ? (
        <BsStarHalf className="inline text-amber-400" />
      ) : (
        <BsStarFill className="inline text-amber-400" />
      )}
      {"  "}
      {rating}
      {"  "}
      <span className="text-sm italic">
        ({simplifyNumber(userRatingCount)})
      </span>
    </>
  );
};

export default RatingRestaurant;
