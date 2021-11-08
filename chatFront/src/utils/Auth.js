export const TOKEN_KEY = "@SecretToken"

export const isAuthenticated = () => {
    return sessionStorage.getItem(TOKEN_KEY) !== null
}

export const login = token => {
    sessionStorage.setItem(TOKEN_KEY, token)
}

export const logout = () => {
    window.localStorage.removeItem("user")
    sessionStorage.removeItem(TOKEN_KEY)
}