export default class Pizza{
    constructor(diametro,espessura){
        this.raio = diametro / 2
        this.altura = espessura
        this.densidade = 0.85 // densidade da massa em g/cm³
    }
    calcularAreaBase(){
        let area = Math.PI * this.raio * this.raio
        return area
    }
    calcularVolume(){
        let volume = this.altura * this.calcularAreaBase()
        return volume
    }

    // relacionamento entre volume e a densidade da massa, independente do tamanho
    // regra de negócio da densidade constante da massa em 0,85 g/cm³
    getPesoUnitario(){
        return this.calcularVolume() * this.densidade
    }
}
