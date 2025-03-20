async function buscarDados() {
    const cep = document.getElementById("cep").value;
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;

    if (cep.length === 8) {
        await buscarEndereco(cep);
    } else {
        alert("Digite um CEP válido com 8 dígitos.");
    }

    if (latitude && longitude) {
        await buscarPrevisao(latitude, longitude);
    } else {
        alert("Digite valores válidos para latitude e longitude.");
    }
}

async function buscarEndereco(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (data.erro) {
            alert("CEP não encontrado.");
            return;
        }

        document.getElementById("rua").textContent = data.logradouro || "Não disponível";
        document.getElementById("bairro").textContent = data.bairro || "Não disponível";
        document.getElementById("cidade").textContent = `${data.localidade} - ${data.uf}` || "Não disponível";
    } catch (error) {
        alert("Erro ao buscar o endereço. Verifique o CEP digitado.");
    }
}

async function buscarPrevisao(latitude, longitude) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const data = await response.json();
        
        if (data.current_weather) {
            document.getElementById("temperatura").textContent = `${data.current_weather.temperature}°C`;
        } else {
            alert("Não foi possível obter a previsão do tempo.");
        }
    } catch (error) {
        alert("Erro ao buscar a previsão do tempo. Verifique as coordenadas digitadas.");
    }
}
