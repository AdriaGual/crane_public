import { NativeBaseProvider } from "native-base";
import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "./Navigation";
import store from "./src/redux/Store";
import { colorModeManager } from "./src/utils/ColorModeManager";
global.Buffer = global.Buffer || require("buffer").Buffer;

export default function () {
  let persistor = persistStore(store);

  return (
    <NativeBaseProvider colorModeManager={colorModeManager}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation></Navigation>
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}
