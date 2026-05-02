// Substitua pela sua chave da OpenWeatherMap para funcionar o clima real
const API_KEY = "SUA_CHAVE_AQUI"; 

let currentStep = 1;
const totalSteps = 8;
let userData = {
    tutorName: '',
    petName: '',
    type: '',
    sex: '',
    age: '',
    city: '',
    photo: ''
};

// 1. Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('petcare_pro_data');
    if (saved) {
        userData = JSON.parse(saved);
        showApp();
    }
});

// 2. Navegação Onboarding
function nextStep() {
    if (currentStep === 1) {
        userData.tutorName = document.getElementById('input-tutor-name').value;
        if (!userData.tutorName) return alert("Como te chamamos?");
    }
    if (currentStep === 2) {
        userData.petName = document.getElementById('input-pet-name').value;
        if (!userData.petName) return alert("Qual o nome do pet?");
        updateDynamicNames();
    }
    if (currentStep === 5) userData.age = document.getElementById('input-pet-age').value;
    if (currentStep === 6) {
        userData.city = document.getElementById('input-city').value;
        if (!userData.city) return alert("Sua cidade é importante para as dicas!");
    }

    if (currentStep < totalSteps) {
        currentStep++;
        updateStepUI();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepUI();
    }
}

function updateStepUI() {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function selectOption(field, value, btn) {
    userData[field] = value;
    btn.parentElement.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    setTimeout(nextStep, 400);
}

function updateDynamicNames() {
    document.querySelectorAll('.dynamic-pet-name').forEach(el => el.innerText = userData.petName);
}

// 3. Foto Upload
document.getElementById('pet-photo-input').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function() {
        userData.photo = reader.result;
        document.getElementById('photo-preview').innerHTML = `<img src="${reader.result}">`;
    }
    reader.readAsDataURL(e.target.files[0]);
});

// 4. Clima e Dicas Inteligentes
async function fetchWeather(city) {
    if (!API_KEY || API_KEY === "SUA_CHAVE_AQUI") return null;
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${API_KEY}`);
        return await res.json();
    } catch (e) { return null; }
}

function generateTip(weather) {
    const tipEl = document.getElementById('dynamic-pet-tip');
    if (!weather || weather.cod !== 200) {
        tipEl.innerText = `Lembre-se de conferir a água do(a) ${userData.petName} hoje!`;
        return;
    }

    const temp = Math.round(weather.main.temp);
    document.getElementById('weather-temp').innerText = `${temp}°C`;
    document.getElementById('weather-city').innerText = weather.name;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
    document.getElementById('weather-icon').style.display = 'block';

    if (temp > 28) tipEl.innerText = `Está calor em ${weather.name}! Evite passeios longos com o(a) ${userData.petName} agora. ☀️`;
    else if (temp < 15) tipEl.innerText = `Clima frio em ${weather.name}. Garanta que o(a) ${userData.petName} esteja aquecido. ❄️`;
    else tipEl.innerText = `Clima ótimo em ${weather.name}! Que tal um passeio com o(a) ${userData.petName}? 🐾`;
}

// 5. Finalização
function finishOnboarding() {
    localStorage.setItem('petcare_pro_data', JSON.stringify(userData));
    showApp();
}

function showApp() {
    document.getElementById('onboarding-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'block';
    document.getElementById('display-user-name').innerText = userData.tutorName;
    document.getElementById('display-pet-name').innerText = userData.petName;
    if (userData.photo) document.getElementById('display-pet-photo').src = userData.photo;
    
    updateDynamicNames();
    fetchWeather(userData.city).then(generateTip);
    lucide.createIcons();
}

// 6. Funções de Módulos
function openModule(title) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('module-modal').style.display = 'flex';
}
function closeModal() { document.getElementById('module-modal').style.display = 'none'; }
function resetApp() { localStorage.clear(); location.reload(); }
