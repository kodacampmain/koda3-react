import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

/**
 * @param {Object} props
 * @param {string} props.redirectTo
 * @param {JSX.Element} props.children
 * @returns
 */
export function PrivateElement({ redirectTo, children }) {
  const count = localStorage.getItem("koda3:count");
  // jika kondisi tidak terpenuhi, maka redirect
  if (count % 2 !== 0) {
    return <Navigate to={redirectTo} replace />;
  }
  // jika kondisi terpenuhi, maka boleh navigasi
  return children;
}

/**
 * @param {Object} props
 * @param {string} props.redirectTo
 * @param {JSX.Element} props.children
 * @returns
 */
export function PrivateRoute({ redirectTo, children }) {
  const navigate = useNavigate();
  // jika kondisi tidak terpenuhi, maka redirect
  useEffect(() => {
    const count = localStorage.getItem("koda3:count");
    if (count % 2 !== 0) {
      console.log("redirect");
      navigate(redirectTo, { replace: true });
    }
  }, []);
  // jika kondisi terpenuhi, maka boleh navigasi
  return children;
}
