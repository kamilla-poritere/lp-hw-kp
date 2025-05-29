import wikiLogo from "/wiki-logo.svg";
import wikimediaLogo from "./assets/wikimedia.png";
import "./App.css";
import { BirthdayProvider } from "./context/BirthdayContext";
import BirthdayList from "./components/BirthdayList";
import { useEffect } from "react";

const App: React.FC = () => {
  useEffect(() => {
    document.title = "🎉 Happy Birthday!";
    console.log("e2e failed =/");
  }, []);

  return (
    <BirthdayProvider>
      <div className="App">
        <div>
          <a
            href="https://upload.wikimedia.org/wikipedia/commons/7/75/Wikimedia_Community_Logo.svg"
            target="_blank"
          >
            <img src={wikiLogo} className="logo" alt="Wiki logo" />
          </a>
          <a
            href="https://upload.wikimedia.org/wikipedia/commons/8/81/Wikimedia-logo.svg"
            target="_blank"
          >
            <img
              src={wikimediaLogo}
              className="logo second"
              alt="Wikimedia logo"
            />
          </a>
        </div>
        <h1>LevelPath Homework</h1>
        <h2>Today's Birthdays</h2>
        <BirthdayList />
        <br />
        <br />
        <p className="creds">
          Developed by Kamilla Poritere{" "}
          <span>
            {new Date(
              Date.now() -
                Math.random() * (Date.now() - new Date(1900, 0, 1).getTime())
            ).toDateString()}
          </span>
        </p>
      </div>
    </BirthdayProvider>
  );
};

export default App;
