export class Creditos {
    usuario:string;
    credito:number;
    codigo:string;

  
    constructor(pUsuario:string, pCredito:number, pCodigo:string){
        this.usuario = pUsuario;
        this.credito = pCredito;
        this.codigo = pCodigo;
    }
 }