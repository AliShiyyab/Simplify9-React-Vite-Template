import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {I18nextProvider} from "react-i18next";
import i18n from "i18next";
import {BrowserRouter} from "react-router-dom";
import {persistor, store} from "./application/store";

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <I18nextProvider i18n={i18n}>
                    </I18nextProvider>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    );
};

export default App;
