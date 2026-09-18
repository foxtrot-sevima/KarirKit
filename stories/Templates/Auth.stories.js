export default {
  title: "Templates/Auth",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Halaman utuh dari `templates/*.html`, ditampilkan lewat `<iframe>` (bukan disalin ulang di sini) supaya yang terlihat di Storybook selalu sama persis dengan file aslinya, termasuk JS-nya sendiri (toggle password, dst). Edit langsung file `templates/*.html`-nya, bukan story ini.",
      },
    },
  },
};

function pageFrame(src, title) {
  return `<iframe src="${src}" title="${title}" style="width: 100%; height: 100vh; border: 0; display: block;"></iframe>`;
}

export const Login = {
  name: "Login",
  render: () => pageFrame("/templates/login.html", "Login"),
};

export const Register = {
  name: "Register",
  render: () => pageFrame("/templates/register.html", "Register"),
};

export const LoginFancy = {
  name: "Login (Fancy)",
  render: () => pageFrame("/templates/login-fancy.html", "Login (Fancy)"),
};

export const RegisterFancy = {
  name: "Register (Fancy)",
  render: () => pageFrame("/templates/register-fancy.html", "Register (Fancy)"),
};
