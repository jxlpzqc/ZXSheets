import { FormulaTreeNode, parseFormula } from '../src/core/formula/parser'

test("parser", () => {
    const w1:FormulaTreeNode = (parseFormula("5*(1+2)")) as FormulaTreeNode;
    expect(w1.functionName).toBe("*");
    
    const w2:FormulaTreeNode = (parseFormula("(4.6*3+8e10*8)^5")) as FormulaTreeNode;
    expect(w2.functionName).toBe("^");


    const w3:FormulaTreeNode = (parseFormula("((3+2%)%)%")) as FormulaTreeNode;
    expect(w3.functionName).toBe("%");

    const w4:FormulaTreeNode = (parseFormula("sum(A1:A10,{1,2,3})")) as FormulaTreeNode;
    expect(w4.functionName).toBe("sum");

    const w5:FormulaTreeNode = (parseFormula("5 + avg(sheet2!A1:$AF$120,sum(B2:B3),{1,2.324453,4e23}) * (10e5^2+150) & if(A1<20,'测试''文本&#&^@&#&^@#&$#@!@',\"Typical Example To Solve A Problem.A1:B2\")")) as FormulaTreeNode;
    expect(w5.functionName).toBe("&");
});