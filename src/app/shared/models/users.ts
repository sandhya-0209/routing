
export interface Iuser{
    userName : string,
    userId : string,
    userRole : userRole
}

type userRole = 'Candidate' | 'Admin' | 'Super-Admin'