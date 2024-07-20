export interface Register{
    firstName:string;
    lastName:string;
    number:string;
    date:DOB;
    file:File | null;
    email:string;
    cpassword:string;
}
interface DOB{
    dateB:string;
    attachemnet:File | null;
}