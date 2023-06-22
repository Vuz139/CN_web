import "./App.css";
import "./assets/CSS/user.css";
import "./assets/CSS/order.css";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./redux/index";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
