import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/DashBoard';
import SignUp from './components/SingUp';
import Login from './components/Login';


function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route

						path="/dashboard"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<Navigate to="/login" />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
