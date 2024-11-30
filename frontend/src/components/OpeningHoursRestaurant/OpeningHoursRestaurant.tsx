import { Period } from "../../types/Restaurants";
import { Accordion, AccordionTab } from "primereact/accordion";

const days_name = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const formatOpeningHours = (periods: Period[]) => {
  const hours = [];
  for (let i = 0; i < periods.length; i++) {
    const period = periods[i];
    const tmpOpeningHours = `${period.open.hour
      .toString()
      .padStart(2, "0")}:${period.open.minute
      .toString()
      .padStart(2, "0")} - ${period.close.hour
      .toString()
      .padStart(2, "0")}:${period.close.minute.toString().padStart(2, "0")}`;
    while (hours.length < period.open.day) {
      hours.push([]);
    }
    if (hours.length === period.open.day + 1) {
      hours[period.open.day] = [...hours[period.open.day], tmpOpeningHours];
    } else {
      hours.push([tmpOpeningHours]);
    }
  }
  return hours;
};

const OpeningHoursRestaurant: React.FC<{ periods: Period[] }> = ({
  periods,
}) => {
  return (
    <Accordion>
      <AccordionTab header="Regular Opening Hours" className="text-sm">
        <table className="table-auto text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2">Day</th>
              <th className="px-4 py-2">Opening Time</th>
            </tr>
          </thead>
          <tbody>
            {formatOpeningHours(periods).map((hours, index) => (
              <tr key={index}>
                <td className="border px-4 py-1">{days_name[index]}</td>
                <td className="border px-4 py-1">
                  {hours.length === 0 ? "Closed" : hours.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AccordionTab>
    </Accordion>
  );
};

export default OpeningHoursRestaurant;
