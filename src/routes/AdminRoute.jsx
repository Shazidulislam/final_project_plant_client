import { Navigate, useLocation } from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useRole from '../hooks/useRole'

const AdminRoute = ({ children }) => {
  const [role , isRoleLoading] = useRole()
  const location = useLocation()

  if (isRoleLoading) return <LoadingSpinner />
  if (role === "admin") return children
  return <Navigate to='/' state={{ from: location }} replace='true' />
}

export default AdminRoute
