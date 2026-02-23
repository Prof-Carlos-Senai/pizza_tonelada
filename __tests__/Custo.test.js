import Custo from '../models/Custo.js'

describe('Testes da Regra de Negócio: Classe Financeira (Custo)', () => {

    test('Deve iniciar com os preços padrão corretamente', () => {
        // 1. PREPARAR E AGIR
        const custoPadrao = new Custo()

        // 2. VALIDAR
        expect(custoPadrao.farinha).toBe(5.5)
        expect(custoPadrao.ovo).toBe(0.50)
    })

    test('Deve calcular o custo dos ingredientes (conversão de g/ml para Kg/L)', () => {
        // 1. PREPARAR: 
        const custo = new Custo()
        
        // Criando um "Mock" (Objeto simulado) com valores redondos para facilitar a matemática
        // Ex: 100.000g = 100kg. Como a farinha custa 5.50, tem que dar R$ 550.00
        const ingredientesMock = {
            farinha: 100000, // 100 kg
            agua: 50000,     // 50 Litros
            azeite: 2000,    // 2 Litros
            sal: 1000,       // 1 kg
            fermento: 500,   // 0.5 kg (Meio quilo)
            acucar: 2000,    // 2 kg
            ovo: 100         // 100 unidades
        }

        // 2. AGIR: Mandando a classe calcular usando o objeto falso
        const precosCalculados = custo.calcularCusto(ingredientesMock)

        // 3. VALIDAR: Verificando se as multiplicações e conversões bateram
        expect(precosCalculados.farinha).toBe(550)      // 100kg * 5.5
        expect(precosCalculados.agua).toBe(0.5)         // 50L * 0.01
        expect(precosCalculados.azeite).toBe(63)        // 2L * 31.5
        expect(precosCalculados.sal).toBe(1.99)         // 1kg * 1.99
        expect(precosCalculados.fermento).toBe(12.75)   // 0.5kg * 25.5
        expect(precosCalculados.acucar).toBe(9.78)      // 2kg * 4.89
        expect(precosCalculados.ovo).toBe(50)           // 100 * 0.50
    })

    test('Deve somar o custo total da produção', () => {
        // 1. PREPARAR
        const custo = new Custo()
        const ingredientesMock = {
            farinha: 100000, agua: 50000, azeite: 2000, 
            sal: 1000, fermento: 500, acucar: 2000, ovo: 100
        }

        // 2. AGIR
        custo.calcularCusto(ingredientesMock) // O total é somado lá dentro!

        // 3. VALIDAR
        // A soma exata deve ser: 550 + 0.5 + 63 + 1.99 + 12.75 + 9.78 + 50 = 688.02
        expect(custo.totalCusto).toBe(688.02)
    })

    test('Deve permitir calcular custos com preços dinâmicos (Inflação)', () => {
        // PREPARAR: O mercado subiu! Nova farinha a R$ 10.00 e o ovo a R$ 1.00
        // Parâmetros do construtor: farinha, agua, azeite, sal, fermento, acucar, ovo
        const custoInflacao = new Custo(10, 0.01, 31.5, 1.99, 25.5, 4.89, 1.00)
        
        const ingredientesMock = {
            farinha: 100000, // 100kg
            agua: 0, azeite: 0, sal: 0, fermento: 0, acucar: 0, // zerando o resto para testar
            ovo: 100 // 100 unidades
        }

        // AGIR
        const precos = custoInflacao.calcularCusto(ingredientesMock)

        // VALIDAR
        expect(precos.farinha).toBe(1000) // 100kg * R$ 10,00 = 1000
        expect(precos.ovo).toBe(100)      // 100 unidades * R$ 1,00 = 100
        expect(custoInflacao.totalCusto).toBe(1100) // 1000 + 100
    })

})