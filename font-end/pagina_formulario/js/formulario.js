// Formatacao de nome
const nomeInput = document.getElementById('nome');

nomeInput.addEventListener('input', function (e) {
  let palavras = e.target.value.toLowerCase().split(' ');

  // Capitaliza a primeira letra de cada palavra
  palavras = palavras.map(palavra => {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1);
  });

  e.target.value = palavras.join(' ');
});


// Formatacao de sobrenome
const sobrenomeInput = document.getElementById('sobrenome');

const excecoes = ['da', 'de', 'do', 'das', 'dos', 'e'];

sobrenomeInput.addEventListener('input', function (e) {
  let palavras = e.target.value.toLowerCase().split(' ');

  palavras = palavras.map((palavra, index) => {
    if (excecoes.includes(palavra) && index !== 0) {
      return palavra; // mantém minúscula se não for a primeira
    }
    return palavra.charAt(0).toUpperCase() + palavra.slice(1);
  });

  e.target.value = palavras.join(' ');
});


// Formatacao de cpf
const cpfInput = document.getElementById('cpf');

cpfInput.addEventListener('input', function (e) {
  let value = e.target.value;

  // Remove tudo que não for número
  value = value.replace(/\D/g, '');

  // Aplica a formatação xxx.xxx.xxx-xx
  if (value.length > 3 && value.length <= 6) {
    value = value.replace(/^(\d{3})(\d+)/, '$1.$2');
  } else if (value.length > 6 && value.length <= 9) {
    value = value.replace(/^(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
  } else if (value.length > 9) {
    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
  }

  e.target.value = value;
});


// Formatacao de telefone
const telefoneInput = document.getElementById('telefone');

telefoneInput.addEventListener('input', function (e) {
  let value = e.target.value;

  // Remove tudo que não for número
  value = value.replace(/\D/g, '');

  // Aplica a formatação (xx) xxxx-xxxx
  if (value.length > 2 && value.length <= 6) {
    value = value.replace(/^(\d{2})(\d+)/, '($1) $2');
  } else if (value.length > 6) {
    value = value.replace(/^(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
  }

  e.target.value = value;
});