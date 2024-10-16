import React, { useEffect, useState } from "react";

import HabitCard from "components/HabitCard";
import Header from "components/Header";
import Footer from "components/Footer";

function Container({ getAllHabits }) {
  const [cards, setCards] = useState([]);

  const habits = getAllHabits();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await habits;
      const cards = fetchedData.map((item) => <HabitCard key={item.habitId} data={item} />);
      setCards(cards);
    };

    fetchData();
  }, [habits]);

  return <div id="container">{cards}</div>;
}

export default function History({ controllers }) {
  return (
    <>
      <Header />
      <main>
        <Container {...controllers} />
      </main>
      <Footer />
    </>
  );
}
