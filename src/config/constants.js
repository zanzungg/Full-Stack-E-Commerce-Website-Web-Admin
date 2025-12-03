export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
    // Auth
    LOGIN: '/users/login',
    REGISTER: '/users/register',
    LOGOUT: '/users/logout',
    REFRESH_TOKEN: '/users/refresh-token',
    VERIFY_EMAIL: '/users/verify-email',
    FORGOT_PASSWORD: '/users/forgot-password',
    VERIFY_RESET_CODE: '/users/verify-reset-code',
    RESET_PASSWORD: '/users/reset-password',

    // User Profile
    USER_PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    UPDATE_AVATAR: '/users/avatar',
    CHANGE_PASSWORD: '/users/change-password',
}

export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
    USER_INFO: 'userInfo',
    RESET_TOKEN: 'resetToken',
};