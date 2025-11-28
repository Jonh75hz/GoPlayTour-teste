// Função para normalizar strings (minúsculas, sem acentos, sem pontuação)
function normalizeString(str) {
  if (typeof str !== 'string') return '';
  
  // 1. Converter para minúsculas
  let normalized = str.toLowerCase();
  
  // 2. Remover acentos e diacríticos
  normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  // 3. Remover pontuação comum
  normalized = normalized.replace(/[.,!?;:]/g, '');
  
  // 4. Limpar espaços (trim e reduzir múltiplos a um)
  normalized = normalized.trim().replace(/\s+/g, ' ');
  
  return normalized;
}

// Função para verificar se todas as palavras de um conjunto estão na resposta
function checkKeywordSet(normalizedResponse, keywordSet) {
  return keywordSet.every(keyword => normalizedResponse.includes(keyword));
}

// Função principal de validação
export function validateAnswer(userAnswer, answerKeywords) {
  if (!userAnswer || !answerKeywords || answerKeywords.length === 0) {
    return false;
  }
  
  const normalizedResponse = normalizeString(userAnswer);
  
  // Verificar se a resposta atende a QUALQUER um dos conjuntos de palavras-chave (OR logic)
  return answerKeywords.some(keywordSet => checkKeywordSet(normalizedResponse, keywordSet));
}

// Função auxiliar para debug (opcional)
export function debugValidation(userAnswer, answerKeywords) {
  const normalizedResponse = normalizeString(userAnswer);
  console.log('Resposta original:', userAnswer);
  console.log('Resposta normalizada:', normalizedResponse);
  console.log('Conjuntos de palavras-chave:', answerKeywords);
  
  answerKeywords.forEach((keywordSet, index) => {
    const matches = keywordSet.map(keyword => ({
      keyword,
      found: normalizedResponse.includes(keyword)
    }));
    console.log(`Conjunto ${index}:`, matches, '→ Resultado:', checkKeywordSet(normalizedResponse, keywordSet));
  });
}
