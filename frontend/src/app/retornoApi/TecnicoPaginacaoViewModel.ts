import { Tecnico } from "../models/tecnico";

export class TecnicoPaginacaoViewModel {

    content: Tecnico[];
    size: number;
    totalElements: number;
    number: number;
    totalPages: number;
    numberOfElements: number;
    last: boolean;

}