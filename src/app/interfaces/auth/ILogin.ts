export interface ILogin
{
    email:string;
    password:string;
}
export interface ILoginResponse {
    id: number;
    verificationCodeExpiration: string;
    token: string;
}
