import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import useAuthContext from '../hooks/userAuthContext'
const Navbar = () => {
    const {logout} = useLogout()
    const { user } = useAuthContext()


    return (
        <header>
            <div className="container">
                <Link to='/'>
                    <h1>Workout Homepage</h1>
                </Link>
                <nav>
                    {user && 
                    <div>
                        <span>{user.email}</span>
                        <button onClick={logout}>Log Out</button>
                    </div>}
                    {!user &&
                    <div>
                        <Link to='/login'>Log In</Link>
                        <Link to='/signup'>Sign Up</Link>
                    </div>}
                </nav>
            </div>
        </header>
    );
}
 
export default Navbar;