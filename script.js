const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");


const matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

function validarTexto(texto) {
    const regex = /^[a-z\s]+$/;
    if (!regex.test(texto)) {
        return "El texto debe contener solo letras minúsculas sin acentos, números ni caracteres especiales.";
    }
    
}

function encriptar(texto, matriz) {
    for (let i = 0; i < matriz.length; i++) {
        if (texto.includes(matriz[i][0])) {
            texto = texto.replaceAll(matriz[i][0], matriz[i][1]);
        }
    }
    return texto;
}

function desencriptar(texto, matriz) {
    
    for (let i = 0; i < matriz.length; i++) {
        if (texto.includes(matriz[i][1])) {
            texto = texto.replaceAll(matriz[i][1], matriz[i][0]);
        }
    }
    return texto;
}

function btnEncriptar() {
    const texto = textArea.value.trim();
    const error = validarTexto(texto);
    if (error) {
        mensaje.value = error;
        mensaje.style.backgroundImage = "none";
        return;
    }
    const textoEncriptado = encriptar(texto, matrizCodigo);
    mensaje.value = textoEncriptado;
    textArea.value = "";
    mensaje.style.backgroundImage = "none"; 
}

function btnDesencriptar() {
    const texto = textArea.value.trim();
    const error = validarTexto(texto);
    if (error) {
        mensaje.value = error;
        mensaje.style.backgroundImage = "none";
        return;
    }
    const textoDesencriptado = desencriptar(texto, matrizCodigo);
    mensaje.value = textoDesencriptado;
    textArea.value = "";
}

function btnCopiar() {
    const textToCopy = mensaje.value;
    navigator.clipboard.writeText(textToCopy).then(() => {
        mensaje.value = "El mensaje fue copiado exitosamente.";
    });
}

mensaje.addEventListener('input', () => {
    if (mensaje.value === "") {
        mensaje.style.backgroundImage = "url('asset/secreto.png')";
    }
});
