// Arquivo de testes para o sistema de validação
import { validateAnswer, debugValidation } from './quiz-validator.js';
import { quizConfig } from './quiz-config.js';

// Testes para Praça de Iracema
const config = quizConfig.praca_iracema;
console.log('=== TESTES - Praça de Iracema ===\n');

const testCases = [
    { input: 'Água da Bica', expected: true, description: 'Resposta correta com maiúsculas' },
    { input: 'agua da bica', expected: true, description: 'Resposta em minúsculas' },
    { input: 'ÁGUA DA BICA!', expected: true, description: 'Com pontuação' },
    { input: 'agua', expected: true, description: 'Apenas "agua"' },
    { input: 'Bica', expected: true, description: 'Apenas "Bica"' },
    { input: 'A água da bica é legal', expected: true, description: 'Com palavras extras' },
    { input: 'água,,,bica!!!', expected: true, description: 'Com muita pontuação' },
    { input: 'fonte de agua', expected: true, description: 'Com "fonte" e "agua"' },
    { input: 'o sol', expected: false, description: 'Resposta completamente errada' },
    { input: 'bic', expected: false, description: 'Palavra incompleta' },
    { input: '   água   bica   ', expected: true, description: 'Com espaços extras' },
];

testCases.forEach((testCase, index) => {
    const result = validateAnswer(testCase.input, config.answerKeywords);
    const status = result === testCase.expected ? '✓' : '✗';
    console.log(`${status} Teste ${index + 1}: ${testCase.description}`);
    console.log(`   Input: "${testCase.input}"`);
    console.log(`   Esperado: ${testCase.expected}, Obtido: ${result}`);
    if (result !== testCase.expected) {
        console.log(`   ⚠️ FALHOU!`);
        debugValidation(testCase.input, config.answerKeywords);
    }
    console.log('');
});

console.log('=== FIM DOS TESTES ===');
