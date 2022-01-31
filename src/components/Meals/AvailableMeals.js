import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";
import { DATABASE_URL } from "../../config/config";

const AvailableMeals = () => {
  const [mealData, setMealData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${DATABASE_URL}/meals.json`);
        if (!res.ok) throw new Error("Unable to fetch data!");

        const rawData = await res.json();
        if (!rawData) throw new Error("Unable to fetch data!");

        const data = Object.entries(rawData);

        setMealData(data);
      } catch (err) {
        setIsError(err);
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const mealsList = mealData.map((meal) => (
    <MealItem
      key={meal[0]}
      id={meal[0]}
      name={meal[1].name}
      description={meal[1].description}
      price={meal[1].price}
    />
  ));

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading meals...</p>;
    }

    if (isError) {
      return <p>{`Something wrong! ${isError.message}`}</p>;
    }

    if (mealData.length < 1) {
      return <p>No meal available</p>;
    }

    return <ul>{mealsList}</ul>;
  };

  const content = renderContent();

  return (
    <section className={classes.meals}>
      <Card>
        <>{content}</>
      </Card>
    </section>
  );
};

export default AvailableMeals;
