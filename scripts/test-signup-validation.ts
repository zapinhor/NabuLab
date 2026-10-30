import assert from "node:assert/strict";
import { ageOn, getPasswordStrength, normalizeUsername, validateBirthDate, validateEmail, validateFullName, validatePassword, validateSignup, validateUsername } from "../src/lib/forms/signup-validation";

assert.equal(validateFullName("Danilo Petraglia"), null);
assert.equal(validateFullName("D'Ávila Júnior"), null);
assert.match(validateFullName("D4nilo") ?? "", /letras/);

for (const username of ["aluno01", "aluno_real", "@Maria_2008", "abc"]) assert.equal(validateUsername(username), null, username);
assert.equal(normalizeUsername("  @Maria_2008 "), "maria_2008");
assert.match(validateUsername("ab") ?? "", /3 caracteres/);
assert.match(validateUsername("1aluno") ?? "", /começar com uma letra/);
assert.match(validateUsername("aluno espaço") ?? "", /espaços/);
assert.match(validateUsername("joão") ?? "", /acentos/);
assert.match(validateUsername("aluno.real") ?? "", /Pontos, hífens/);
assert.match(validateUsername("aluno-real") ?? "", /Pontos, hífens/);
assert.match(validateUsername("a".repeat(25)) ?? "", /24 caracteres/);

const today = new Date(2026, 9, 31);
assert.equal(validateBirthDate("2008-05-20", today), null);
assert.match(validateBirthDate("", today) ?? "", /Informe/);
assert.match(validateBirthDate("2027-01-01", today) ?? "", /futuro/);
assert.match(validateBirthDate("2010-02-30", today) ?? "", /não existe/);
assert.equal(ageOn("2014-10-31", today), 12);
assert.equal(ageOn("2014-11-01", today), 11);

assert.equal(validateEmail("aluno@example.com"), null);
assert.match(validateEmail("aluno@") ?? "", /completo/);
assert.match(validatePassword("curta") ?? "", /3 caracteres/);
assert.equal(validatePassword("senha segura"), null);

assert.equal(getPasswordStrength("").score, 0);
assert.equal(getPasswordStrength("abcdefgh").label, "Muito fraca");
assert.equal(getPasswordStrength("SenhaMuitoBoa123!").label, "Muito boa");

assert.deepEqual(validateSignup({ username: "", birth_date: "", email: "", password: "" }), {
  username: "Escolha um @username.",
  birth_date: "Informe sua data de nascimento.",
  email: "Informe seu e-mail.",
  password: "Crie uma senha.",
});

console.log("Signup: field validation, exact messages and password strength validated.");

// Faixas etárias do painel admin (somente agregado).
import { ageBand, summarizeAges } from "../src/lib/admin/age-bands";
assert.equal(ageBand(11), "Menos de 12");
assert.equal(ageBand(12), "12 a 14");
assert.equal(ageBand(17), "15 a 17");
assert.equal(ageBand(18), "18 a 24");
assert.equal(ageBand(45), "45 ou mais");
const ageSummary = summarizeAges(["2010-06-01", "2000-01-01", "invalid"], 5, new Date(2026, 9, 30));
assert.equal(ageSummary.informed, 2);
assert.equal(ageSummary.notInformed, 3);
assert.equal(ageSummary.median, (16 + 26) / 2);
