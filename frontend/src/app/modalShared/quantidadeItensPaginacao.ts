export class QuantidadeItensPaginacao{
    
    constructor(quantidade: number){
        this.quantidade = quantidade;
    }
    
    quantidade: number = 10;

    static listaQuantidades = [
        new QuantidadeItensPaginacao(5),
        new QuantidadeItensPaginacao(10),
        new QuantidadeItensPaginacao(20),
        new QuantidadeItensPaginacao(30),
        new QuantidadeItensPaginacao(40),
        new QuantidadeItensPaginacao(50),
        new QuantidadeItensPaginacao(100),
        new QuantidadeItensPaginacao(200),
        new QuantidadeItensPaginacao(400),
        new QuantidadeItensPaginacao(500),
        new QuantidadeItensPaginacao(1000)
    ]
}