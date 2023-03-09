import { Component, HostListener, OnInit } from "@angular/core";
import { Coordenadas } from "src/app/model/coordenadas";

@Component({
    selector: "grilla",
    templateUrl: "grilla.html",
    styleUrls: [ "./grilla.css" ]
})
export class Grilla implements OnInit {
    
    grilla : number[][] = []

    numerosRestantes : number[]

    coordenadasSeleccionadas : Coordenadas | undefined

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) { 
        let teclasValidas = "123456789"

        if (!teclasValidas.includes(event.key))
            return

          
        if (!this.coordenadasSeleccionadas || this.grilla[this.coordenadasSeleccionadas.fila][this.coordenadasSeleccionadas.col] !== 0)
            return

        let numeroAColocar : number = Number.parseInt(event.key) 

        if (this.isValid(numeroAColocar, this.coordenadasSeleccionadas)) {
            this.numerosRestantes[numeroAColocar - 1]--;
            this.grilla[this.coordenadasSeleccionadas.fila][this.coordenadasSeleccionadas.col] = numeroAColocar
        }
    }

    ngOnInit(): void {
        this.grilla = [
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        ]

        this.numerosRestantes = [ 9, 9, 9 ,9, 9, 9, 9, 9, 9 ]
    }

    getFilaClass(index) : string {

        let className = "fila "

        let indexDeBordeGrueso = [ 2, 5 ]
        
        if (indexDeBordeGrueso.includes(index))
            className += "bordeGruesoFila"

        return className
    }


    getCeldaClass(index) : string {

        let className = "celda "

        let indexDeBordeGrueso = [ 2, 5 ]
        
        if (indexDeBordeGrueso.includes(index))
            className += "bordeGruesoCol"

        return className
    }

    celdaClick(fila : number, col : number) {
        this.coordenadasSeleccionadas = {
            fila : fila, 
            col : col
        }
    }

    clickNumeroRestante(index) {
        this.numerosRestantes[index]--;

        if (this.isValid(index + 1, this.coordenadasSeleccionadas))
            this.grilla[this.coordenadasSeleccionadas.fila][this.coordenadasSeleccionadas.col] = index + 1
    }

    isValid(numeroAColocar: number, coord: Coordenadas) {
       
        if (this.numerosRestantes[numeroAColocar - 1] === 0) {
            alert("No te quedan " + numeroAColocar + " restantes")
            return false
        }

        for (let i = 0 ; i < 9; i++)
            if (this.grilla[i][coord.col] == numeroAColocar) {
                alert("Ya existe en esa columna")
                return false
            }

        for (let j = 0 ; j < 9; j++)
            if (this.grilla[coord.fila][j] == numeroAColocar) {
                alert("Ya existe en esa fila")
                return false
            }

        if (!this.isValidForCuadrado(coord, numeroAColocar)) {
            alert("Ya existe en este cuadrado")
            return false
        }

        return true
    }


    isValidForCuadrado(coord: Coordenadas, numeroAColocar: number) {
        let coorCol, coorFila = 0

        if (coord.col <= 2) coorCol = 0
        else if (coord.col >= 6) coorCol = 6
        else  coorCol = 3

        if (coord.fila <= 2) coorFila = 0
        else if (coord.fila >= 6) coorFila = 6
        else  coorFila = 3

        for (let i = coorFila; i < coorFila + 3; i++)
            for (let j = coorCol; j < coorCol + 3; j++)
                if (this.grilla[i][j] == numeroAColocar)
                    return false
        
        return true
    }
}