import { useRef } from "react";
import { FaDoorOpen, FaToilet, FaWheelchair } from "react-icons/fa";
import { PiArmchairFill } from "react-icons/pi";
import { OverlayPanel } from "primereact/overlaypanel";

interface RestaurantAccessibilityProps {
  accessibilityOptions: {
    wheelchairAccessibleEntrance: boolean;
    wheelchairAccessibleSeating: boolean;
    wheelchairAccessibleRestroom: boolean;
  };
}

const AccessibilityRestaurant: React.FC<RestaurantAccessibilityProps> = ({
  accessibilityOptions,
}) => {
  const accessibilityRef = useRef<OverlayPanel>(null);

  return (
    <>
      <span
        className="cursor-pointer"
        onClick={(e) => accessibilityRef.current?.toggle(e)}
        onMouseLeave={(e) => accessibilityRef.current?.hide()}
      >
        <span className="text-sm italic">
          Accessibility
          {"  "}
          <FaWheelchair className="inline" />
          {"  "}:
        </span>
        {"  "}
        <FaDoorOpen
          className={`inline ${
            accessibilityOptions.wheelchairAccessibleEntrance
              ? "text-green-900"
              : "text-red-900"
          }`}
        />
        {"  "}
        <PiArmchairFill
          className={`inline ${
            accessibilityOptions.wheelchairAccessibleSeating
              ? "text-green-900"
              : "text-red-900"
          }`}
        />
        {"  "}
        <FaToilet
          className={`inline ${
            accessibilityOptions.wheelchairAccessibleRestroom
              ? "text-green-900"
              : "text-red-900"
          }`}
        />
      </span>
      <OverlayPanel ref={accessibilityRef} appendTo={document.body}>
        <div className="p-4 bg-white border border-gray-200 rounded-md shadow-md">
          <p>
            {accessibilityOptions.wheelchairAccessibleEntrance
              ? "Wheelchair accessible entrance"
              : "No wheelchair accessible entrance"}
          </p>
          <p>
            {accessibilityOptions.wheelchairAccessibleSeating
              ? "Wheelchair accessible seating"
              : "No wheelchair accessible seating"}
          </p>
          <p>
            {accessibilityOptions.wheelchairAccessibleRestroom
              ? "Wheelchair accessible restroom"
              : "No wheelchair accessible restroom"}
          </p>
        </div>
      </OverlayPanel>
    </>
  );
};

export default AccessibilityRestaurant;
