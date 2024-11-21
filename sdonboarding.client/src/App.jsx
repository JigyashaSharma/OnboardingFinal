import './App.css';
import { NavMenu } from './components/navmenu/NavMenu.jsx';
import { ComponentRoutes } from './components/navmenu/ComponentRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="app-layout bg-white min-h-screen flex flex-col" >

            <NavMenu />
            <div className="main-content flex-grow">
                <ComponentRoutes />
            </div>

        </div>
    );
}

export default App;