document.addEventListener('DOMContentLoaded', (event) =>{
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const outputSectionA = document.getElementById('outputA');
    const outputSectionB = document.getElementById('outputB');
    const encriptarButton = document.getElementById('encriptar');
    const desencriptarButton = document.getElementById('desencriptar');
    const copiarButton = document.getElementById('copiar');

    const originalHeight = inputText.style.height;

    const encriptar = (text) =>{
        const encriptarMap = {
            'e': 'enter',
            'i': 'imes',
            'a': 'ai',
            'o': 'ober',
            'u': 'ufat'
        };

        return text.split('').map(char => encriptarMap[char] || char).join('');
    }

    const desencriptar = (text) => {
        const desencriptarMap = {
            'enter': 'e',
            'imes': 'i',
            'ai': 'a',
            'ober': 'o',
            'ufat': 'u'
        };

        let desencriptedText = text;
        for (let key in desencriptarMap) {
            const regex = new RegExp(key, 'g');
            desencriptedText = desencriptedText.replace(regex, desencriptarMap[key]);
        }
        return desencriptedText;
    };

    const showOutputSectionB = (text) => {
        outputText.textContent = text;
        outputSectionA.style.display = 'none';
        outputSectionB.style.display = 'flex';
    };

    const showOutputSectionA = () => {
        outputSectionA.style.display = 'flex';
        outputSectionB.style.display = 'none';
    };

    encriptarButton.addEventListener('click', () => {
        const text = inputText.value;
        if (text) {
            const encriptedText = encriptar(text);
            showOutputSectionB(encriptedText);
        }
    });

    desencriptarButton.addEventListener('click', () => {
        const text = inputText.value;
        if (text) {
            const desencriptedText = desencriptar(text);
            showOutputSectionB(desencriptedText);
        }
    });

    copiarButton.addEventListener('click', () => {
        navigator.clipboard.writeText(outputText.textContent)
            .then(() => {
                alert('Texto copiado al portapapeles');
            })
            .catch(err => {
                console.error('Error al copiar el texto: ', err);
            });
    });

    const adjustTextareaHeight = () => {
        if (window.innerWidth <= 768) {
            inputText.style.height = 'auto';
            inputText.style.height = `${inputText.scrollHeight}px`;
        }
    };

    inputText.addEventListener('input', adjustTextareaHeight);

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            inputText.style.height = originalHeight;
        } else {
            adjustTextareaHeight();
        }
    });

    adjustTextareaHeight();


});