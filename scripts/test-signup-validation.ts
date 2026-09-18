import assert from "node:assert/strict";
import { getPasswordStrength, validateEmail, validateFullName, validatePassword, validateSignup, validateUsername } from "../src/lib/forms/signup-validation";

assert.equal(validateFullName("Danilo Petraglia"), null);
assert.equal(validateFullName("D'Ávila Júnior"), null);
assert.match(validateFullName("D4nilo") ?? "", /letras/);

for (const username of ["aluno01", "aluno-real", "aluno.real", "aluno_real"]) assert.equal(validateUsername(username), null);
assert.match(validateUsername("ab") ?? "", /3 caracteres/);
assert.match(validateUsername("-aluno") ?? "", /começar/);
assert.match(validateUsername("aluno espaço") ?? "", /apenas/);

assert.equal(validateEmail("aluno@example.com"), null);
assert.match(validateEmail("aluno@") ?? "", /completo/);
assert.match(validatePassword("curta") ?? "", /3 caracteres/);
assert.equal(validatePassword("senha segura"), null);

assert.equal(getPasswordStrength("").score, 0);
assert.equal(getPasswordStrength("abcdefgh").label, "Muito fraca");
assert.equal(getPasswordStrength("SenhaMuitoBoa123!").label, "Muito boa");

assert.deepEqual(validateSignup({ full_name: "", username: "", email: "", password: "" }), {
  full_name: "Informe seu nome completo.",
  username: "Escolha um username.",
  email: "Informe seu e-mail.",
  password: "Crie uma senha.",
});

console.log("Signup: field validation, exact messages and password strength validated.");
