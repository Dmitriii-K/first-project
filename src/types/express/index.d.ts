import * as express from 'express'

declare global {
    namespace Express {
    export interface Request {
        userGlobal: {
            email: string
            login: string
            userId:string}
    }
    }
}

// declare global {
//     namespace Express {
//         export interface Request {
//             user: WithId<UserDBModel> 
//         }
//     }
// }