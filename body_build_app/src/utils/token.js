export const setToken = (token) =>{
    return localStorage.setItem('token',token)
}

export const getToken = () =>{
    return localStorage.getItem('token')
}

// 清除本地存储token
export const removeToken = ()=>{
    localStorage.removeItem('token')
}