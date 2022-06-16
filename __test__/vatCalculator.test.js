
const vatCalculator = require('../src/utils/vatCalculator')

describe("VAT calculator", ()=>{
    test("Should return correct VAT exluded amount for 20% VAT",() => {
        // arrange and act
const result = vatCalculator.calculateVAT(16.67)
//assert
expect(result).toBe(3.33)
    })



    test("Should return correct gross amount of 20% VAT", () => {
    //arrange and act
        const result = vatCalculator.calculateGrossAmount(16.67)
    //assert
        expect(result).toBe(20)
    })


    test("Should return correct net amount for 20% VAT", ()=>{
        //arrange and act
        const result = vatCalculator.calculateNetAmount(20)

        //assert
        expect(result).toBe(16.67)
    
    
    })



})
/*
describe("VAT calculaor", ()=>{
    test("Should return the correct VAT excluded amount for 20% VAT")
    //arrange and act
    const result = vatCalculator.calculateVAT(3.33)
    //assert
    expect(result.toBe(3.33))
})
test("Should return correct gross amount of 20% VAT", () => {
    
    const result = vatCalculator.calculateGrossAmount(16.67)

    expect(result).toBe(20)
})





*/