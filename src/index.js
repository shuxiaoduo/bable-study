
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');
const generate = require('@babel/generator').default;
const file = require('fs');
const path = require('path');

const sourceCode = file.readFileSync(path.resolve(__dirname, './files/sourceCode.js'), 'utf8');

// 将sourceCode解析为AST
const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['jsx']
});


traverse(ast, {
    CallExpression(path, state) {
        if(types.isMemberExpression(path.node.callee) &&
            path.node.callee.object.name === "console" &&
            ["log", "info", "error"].includes(path.node.callee.property.name)) 
        {
            const {line, column} = path.node.loc.start
            path.node.arguments.unshift(types.stringLiteral(`filename line:${line}, column:${column}`));
        }
    }
})


file.writeFileSync(path.resolve(__dirname, './files/sourceCode.js'), generate(ast).code, 'utf8')