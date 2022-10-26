import React from 'react';
import { Navigate } from 'react-router-dom';
import useIsLogin from '../../context/hook/useIsLogin';

function PrivateRoute({ component: Component }) {
    const { isLogin } = useIsLogin();

    return (
        isLogin ? Component : <Navigate to='/' {...alert("로그인이 필요합니다.")} />
    )
}

export default PrivateRoute;