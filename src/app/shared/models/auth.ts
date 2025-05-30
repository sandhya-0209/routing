
export interface IRegisterUser{
    email : string,
    password : string,
    userRole : 'admin' | 'buyer' | 'superAdmin'
}

export interface ILogInUser{
    email : string,
    password : string,
}