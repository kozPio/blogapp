import '../stylesheets/Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {

  return (<div className="sidebar">
     <Link to="/"> 
        <img className="sidebar-logo" src="https://www.pikpng.com/pngl/m/2-24867_random-logo-png-transparent-random-brand-logos-png.png" alt="" />
      </Link>
    <p>Recent Post</p>
    <p>Hot Posts</p>
    <p>Old Posts</p>
    <p>Featured Posts</p>

  </div>)
}

export default Sidebar;