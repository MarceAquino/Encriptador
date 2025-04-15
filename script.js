// encriptador.js

// ✅ Clase para validar el texto
class ValidadorTexto {
    static validar(texto) {
        const regex = /^[a-z\s]+$/;
        if (!regex.test(texto)) {
            return "El texto debe contener solo letras minúsculas sin acentos, números ni caracteres especiales.";
        }
        return null;
    }
}

// ✅ Clase para manejar la lógica de encriptar/desencriptar
class Encriptador {
    constructor(matriz) {
        this.matriz = matriz;
    }

    encriptar(texto) {
        for (const [letra, codigo] of this.matriz) {
            texto = texto.replaceAll(letra, codigo);
        }
        return texto;
    }

    desencriptar(texto) {
        for (const [letra, codigo] of this.matriz) {
            texto = texto.replaceAll(codigo, letra);
        }
        return texto;
    }
}

// ✅ Clase para manejar la interacción con el DOM
class ControladorTexto {
    constructor(textAreaSelector, mensajeSelector, encriptador) {
        this.textArea = document.querySelector(textAreaSelector);
        this.mensaje = document.querySelector(mensajeSelector);
        this.encriptador = encriptador;

        this.mensaje.addEventListener('input', () => {
            if (this.mensaje.value === "") {
                this.mensaje.style.backgroundImage = "url('asset/secreto.png')";
            }
        });
    }

    encriptarTexto() {
        const texto = this.textArea.value.trim();
        const error = ValidadorTexto.validar(texto);
        if (error) {
            this.mensaje.value = error;
            this.mensaje.style.backgroundImage = "none";
            return;
        }

        const textoEncriptado = this.encriptador.encriptar(texto);
        this.mensaje.value = textoEncriptado;
        this.textArea.value = "";
        this.mensaje.style.backgroundImage = "none";
    }

    desencriptarTexto() {
        const texto = this.textArea.value.trim();
        const error = ValidadorTexto.validar(texto);
        if (error) {
            this.mensaje.value = error;
            this.mensaje.style.backgroundImage = "none";
            return;
        }

        const textoDesencriptado = this.encriptador.desencriptar(texto);
        this.mensaje.value = textoDesencriptado;
        this.textArea.value = "";
    }

    copiarTexto() {
        const textToCopy = this.mensaje.value;
        navigator.clipboard.writeText(textToCopy).then(() => {
            this.mensaje.value = "El mensaje fue copiado exitosamente.";
        });
    }
}

// ✅ Inicialización
document.addEventListener("DOMContentLoaded", () => {
    const matrizCodigo = [
        ["e", "enter"],
        ["i", "imes"],
        ["a", "ai"],
        ["o", "ober"],
        ["u", "ufat"]
    ];

    const encriptador = new Encriptador(matrizCodigo);
    const controlador = new ControladorTexto(".text-area", ".mensaje", encriptador);

    // Asociamos los botones
    document.querySelector(".btn-encriptar").addEventListener("click", () => controlador.encriptarTexto());
    document.querySelector(".btn-desencriptar").addEventListener("click", () => controlador.desencriptarTexto());
    document.querySelector(".btn-copiar").addEventListener("click", () => controlador.copiarTexto());
});
