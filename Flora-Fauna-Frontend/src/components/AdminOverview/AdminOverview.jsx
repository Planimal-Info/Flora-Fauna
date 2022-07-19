import "./AdminOverview.css";
import { useAuthContext } from "../../contexts/auth";

export default function AdminOverview(props) {
  const { user } = useAuthContext();

  return (
    <div className="admin-overview">
      <h2>Admin Panel</h2>
      <div className="admin-navbar">
        <h4 className="admin-navbar-link">Flagged Posts</h4>
        <h4 className="admin-navbar-link">Flagged Users</h4>
      </div>
    </div>
  )
}

//Implement when backend authentication is connected to frontend.

//use this to return all the flagged posts.
export function AdminFlaggedPosts() {


  return (
    <div>Flagged Posts</div>
  )
}

//use this to return all flagged users
export function AdminFlaggedUsers() {


  return (
    <div>Flagged Users</div>
  )
}
