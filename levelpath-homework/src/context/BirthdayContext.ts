import { createContext, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";

export interface Birthday {
  year: string;
  text: string;
}

export interface BirthdayContextType {
  birthdays: Birthday[];
  loading: boolean;
  error: string;
  fetchBirthdays: () => void;
}

const BirthdayContext = createContext<BirthdayContextType | undefined>(
  undefined
);

interface BirthdayProviderProps {
  children: ReactNode;
}

export const BirthdayProvider = ({ children }: BirthdayProviderProps) => {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBirthdays = () => {
    setLoading(true);
    setError("");

    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const apiUrl = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`;

    axios
      .get(apiUrl, {
        headers: {
          "User-Agent": "YourAppName/1.0",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setBirthdays(response.data.births || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching birthday data");
        setLoading(false);
      });
  };

  return (
    <BirthdayContext.Provider
      value={{ birthdays, loading, error, fetchBirthdays }}
    >
      {children}
    </BirthdayContext.Provider>
  );
};

export default BirthdayContext;
