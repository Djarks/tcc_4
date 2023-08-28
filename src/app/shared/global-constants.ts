export class GlobalConstants{
    //Message
    public static genericError: string = "Algo deu errado. Por favor, tente novamente mais tarde.";

    //Unauthorized
    public static unauthorized: string = "Você não está autorizado a acessar esta página."

    //Regex
    public static nameRegex: string = "[a-zA-Z0-9 ]*";

    public static emailRegex: string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

    public static contacNumberRegex: string = "^[e0-9]{11,11}$";
    
    //Variable
    public static error: string = "error";
}