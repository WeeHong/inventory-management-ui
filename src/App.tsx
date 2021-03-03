import React from "react";
import styled from "styled-components";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import services from "./services";
import store from "./data/store";
import Routes from "./Routes";

function App() {
  return (
    <Container>
      <Provider store={store(services)}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
