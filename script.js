let currentStep = 1;
const totalSteps = 7;
const userData = {
    tutorName: '',
    petName: '',
    type: '',
    sex: '',
    age: '',
    photo: ''
};

// Verifica se já existe dados ao carregar
document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('petCare_data');
    if (savedData) {
        showApp(JSON.parse(savedData));
    }
});

function nextStep() {
    if (currentStep === 1) {
        userData.tutorName = document.getElementById('input-tutor-name').value;
        if(!userData.tutorName) return alert("Como podemos te chamar?");
    }
    
    if (currentStep === 2) {
        userData.petName = document.getElementById('input-pet-name').value;
        if(!userData.petName) return alert("Qual o nome do seu pet?");
        updateDynamicNames();
    }

    if (currentStep === 5) {
        userData.age = document.getElementById('input-pet-age').value;
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
    // Esconde todos os passos
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    // Mostra o passo atual
    document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
    // Atualiza barra de progresso
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function selectOption(field, value, element) {
    userData[field] = value;
    
    // UI Feedback
    const parent = element.parentElement;
    parent.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');

    // Auto-advance em seleções de botão
    setTimeout(nextStep, 300);
}

function updateDynamicNames() {
    document.querySelectorAll('.dynamic-pet-name').forEach(el => {
        el.innerText = userData.petName;
    });
}

// Handle Photo Upload
document.getElementById('pet-photo-input').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function() {
        userData.photo = reader.result;
        const preview = document.getElementById('photo-preview');
        preview.innerHTML = `<img src="${reader.result}">`;
    }
    reader.readAsDataURL(e.target.files[0]);
});

function finishOnboarding() {
    localStorage.setItem('petCare_data', JSON.stringify(userData));
    showApp(userData);
}

function showApp(data) {
    document.getElementById('onboarding-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'block';
    
    // Atualiza o Hub com dados reais
    document.getElementById('display-user-name').innerText = data.tutorName;
    document.getElementById('display-pet-name').innerText = data.petName;
    
    const petImg = document.getElementById('display-pet-photo');
    if(data.photo) {
        petImg.src = data.photo;
    } else {
        petImg.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=100&h=100&auto=format&fit=crop';
    }
    
    updateDynamicNames();
    lucide.createIcons();
}

// Funções do Hub (Modal)
function openModule(name) {
    document.getElementById('modal-title').innerText = name;
    document.getElementById('module-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('module-modal').style.display = 'none';
}

// Função de Reset (Para testes)
function resetApp() {
    localStorage.clear();
    location.reload();
}
