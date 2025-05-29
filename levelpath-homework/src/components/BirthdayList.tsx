import React from "react";
import styled from "styled-components";
import { useBirthdays } from "../context/BirthdayContext";

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  max-height: 280px;
  overflow: scroll;
  flex-direction: column;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.5);
  border-radius: 5%;
  border: 1px solid white;
`;

const ListItem = styled.li<{ $even: boolean }>`
  padding: 8px;
  font-size: 1rem;

  &::before {
    content: "${(props) => (props.$even ? "🎾" : "🏈")} ";
    margin-right: 8px;
  }
`;

const BirthdayList: React.FC = () => {
  const { birthdays, loading, error, fetchBirthdays } = useBirthdays();

  return (
    <div>
      <button onClick={fetchBirthdays}>
        {birthdays.length ? "reload!" : loading ? "pending..." : "Load"}
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <List data-testid="birthday-list">
        {birthdays.map((person, index) => (
          <ListItem key={index} $even={index % 2 === 1}>
            {person.year}: {person.text}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default BirthdayList;
