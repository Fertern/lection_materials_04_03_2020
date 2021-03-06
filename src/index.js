import React, { useState } from "react";
import ReactDOM from "react-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "./index.css";
import ProfilePageFunc from "./components/Function";
import ProfilePageClass from "./components/DefaultClass";
import ProfilePageRender from "./components/ClassOnlyRender";
import {
  FormControl,
  Card,
  CardContent,
  CircularProgress,
  Button
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ComboLifeCycles from "./examples/ComboLifeCycles";
import ComboLifeCyclesClass from "./examples/classic/ComboLifeCycles";
import BuildIcon from "@material-ui/icons/Build";

const App = () => {
  const [user, setUser] = useState("Tachanka");
  const [isSecretMode, setSecretMode] = useState(false);
  const [isTestMode, setTestMode] = useState(false);
  const [isFetching, setFetching] = useState(false);

  return (
    <Card style={{ width: "500px", margin: "0 auto" }}>
      <CardContent>
        <FormControl>
          <h1 style={{ fontSize: "30px" }}>Choose profile to view:</h1>
          <Select
            value={user}
            onChange={event => setUser(event.target.value)}
            style={{ width: "450px" }}
          >
            <MenuItem value="Tachanka">Tachanka</MenuItem>
            <MenuItem value="Nancy">Nancy</MenuItem>
            <MenuItem value="Demogorgon">Demogorgon</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
      <CardContent>
        <h1>Welcome to {user}’s profile!</h1>
        {isFetching && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        )}
        <p>
          <Button variant="contained">
            <ProfilePageFunc user={user} callback={setFetching} />
          </Button>
          <span>With function component</span>
        </p>
        <p>
          <Button variant="contained">
            <ProfilePageClass user={user} callback={setFetching} />
          </Button>
          <span>With class component</span>
        </p>
        {isSecretMode ? (
          <p>
            <Button variant="contained">
              <ProfilePageRender user={user} callback={setFetching} />
            </Button>
            <span>With special class component</span>
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <Button
              style={{ margin: "0 auto" }}
              startIcon={<VisibilityIcon />}
              onClick={() => setSecretMode(true)}
              variant="outlined"
            >
              Show secret
            </Button>
            {!isTestMode && (
              <Button
                style={{ margin: "0 auto" }}
                startIcon={<BuildIcon />}
                onClick={() => setTestMode(true)}
                variant="outlined"
              >
                Show test field
              </Button>
            )}
          </div>
        )}
      </CardContent>
      {isTestMode && !isSecretMode && (
        <article
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <h3>Function component</h3>
          <Button variant="outlined">
            <ComboLifeCycles />
          </Button>
          <h3>Class component</h3>
          <Button variant="outlined">
            <ComboLifeCyclesClass />
            {/* someProp='Пропсы прокидываются без конструктора!' */}
          </Button>
        </article>
      )}
    </Card>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
