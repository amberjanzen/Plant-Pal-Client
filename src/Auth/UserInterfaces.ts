// export interface UserCreateProps {
//     user: User,
//     sessionToken: string,
//     message: string
// }

export interface UserCreateState {
    firstName : string,
    lastName: string,
    email : string,
    password : string,
    admin: boolean,
    token: string,
    errors : {
       firstName : string,
       lastName : string
       email : string,
       password : string
    }
}

// export interface ItemData {
//     id: number,
//     itemName: string,
//     price: number,
//     quantity: number,
//     sellerId: number,
//     itemImage: string,
//     itemDescription: string
// }