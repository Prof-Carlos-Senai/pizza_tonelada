import Pizza from "./models/Pizza.js"
import Receita from "./models/Receita.js"
import Custo from "./models/Custo.js"

// 1. usuário define o tamanho da pizza
const tamanho = new Pizza(35, 0.5)
const pesoPizza = tamanho.getPesoUnitario()

// 2. verificando produção
const receita = new Receita() 
const qtdeIngredientes = receita.calcularQtdeIngredientes()
const qtdePizza = receita.calcularQtdePizza(pesoPizza)

console.log(`A quantidade de pizza M é: ${qtdePizza}`)
console.log('--- Quantidade de Ingredientes ---')
console.table(qtdeIngredientes)

// 3. Calculando custos
const custo = new Custo()
const precosIngredientes = custo.calcularCusto(qtdeIngredientes)

console.log('--- Custo dos Ingredientes (R$) ---')
console.table(precosIngredientes)

console.log(`O custo total de produção é: R$ ${custo.totalCusto}`)
console.log(`O custo de massa por pizza é: R$ ${(custo.totalCusto / qtdePizza).toFixed(2)}`)
