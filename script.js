// Configurações Iniciais e Persistência Simples
const config = {
    userName: localStorage.getItem('petcare_user') || 'Ana Martins',
    petName: localStorage.getItem('petcare_pet') || 'Thor'
};

// Inicialização da Interface
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});

function updateUI() {
    document.getElementById('user-name').innerText = config.userName;
    document.getElementById('pet-name').innerText = config.petName;
}

// Lógica do Modal Placeholder
function openModule(moduleName) {
    const modal = document.getElementById('module-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    modalTitle.innerText = moduleName;
    
    // Customização de descrição baseada no módulo
    const descriptions = {
        'Viagem com Pet': 'Prepare as malas! Este módulo ajudará com passaportes, vacinas internacionais e checklists.',
        'Emergência': 'Acesso imediato a veterinários 24h e guia de primeiros socorros rápido.',
        'Financeiro': 'Controle todos os gastos com ração, consultas e mimos em um só lugar.',
        'Adestre seu Pet': 'Transforme o comportamento do seu melhor amigo com trilhas de treinamento.'
    };

    modalDesc.innerText = descriptions[moduleName] || `O módulo "${moduleName}" está sendo preparado para a próxima atualização premium.`;
    
    modal.style.display = 'flex';
    
    // Feedback tátil simples (console)
    console.log(`Log: Tentativa de acesso ao módulo [ID: ${moduleName.toLowerCase().replace(/\s/g, '_')}]`);
}

function closeModal() {
    const modal = document.getElementById('module-modal');
    modal.style.display = 'none';
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('module-modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Exemplo de como salvar dados (Pode ser chamado via console ou futura tela de perfil)
function saveUserData(newName, newPet) {
    localStorage.setItem('petcare_user', newName);
    localStorage.setItem('petcare_pet', newPet);
    location.reload();
}