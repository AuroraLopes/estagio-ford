const UserName = document.getElementById('registration-form-user-your');
const UserEmail = document.getElementById('registration-form-email-your');
const UserPassword = document.getElementById('registration-form-password-your');
const ButtonFormRegister = document.getElementById('button-register-form');
const UserEmailLogin = document.getElementById('login-form-email-your');
const UserPasswordLogin = document.getElementById('login-form-password-your');
const ButtonFormLogin = document.getElementById('button-login-form');

ButtonFormRegister.addEventListener('click',postUsers);
document.getElementById('login-form-event').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário
    loginUsers(); // Chama a função loginUsers ao enviar o formulário
});

async function postUsers() {

    const response = await fetch('http://localhost:3000/register', {
        headers: {
            "Content-Type" : "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            user: UserName.value,
            email: UserEmail.value,
            password:UserPassword.value,
        })
    });
}

async function loginUsers() {

    email = UserEmailLogin.value;
    password = UserPasswordLogin.value;

    const response = await fetch('http://localhost:3000/login', {
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const data = await response.json();
        alert('Login realizado com sucesso!');
    } else {
        alert('E-mail ou senha inválidos!')
    }
    
}
