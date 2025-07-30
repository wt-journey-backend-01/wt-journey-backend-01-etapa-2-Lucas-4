const { v4: uuidv4 } = require("uuid");

// Dados iniciais em memória
let agentes = [
    {
        id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
        nome: "Rommel Carneiro",
        dataDeIncorporacao: "1992-10-04",
        cargo: "delegado",
    },
    {
        id: "a2b7e6c9-1d3f-4a8e-9b5c-8f6d7e9a1b3c",
        nome: "Ana Pereira",
        dataDeIncorporacao: "2015-03-12",
        cargo: "inspetor",
    },
];

function findAll() {
    return agentes;
}

function findById(id) {
    return agentes.find((agente) => agente.id === id);
}

function create(agente) {
    const newAgente = { id: uuidv4(), ...agente };
    agentes.push(newAgente);
    return newAgente;
}

// Para PUT e PATCH, uma função de update é suficiente
function update(id, data) {
    const agenteIndex = agentes.findIndex((agente) => agente.id === id);
    if (agenteIndex === -1) {
        return null;
    }
    // Mantém o ID original, mas atualiza o resto
    agentes[agenteIndex] = { ...agentes[agenteIndex], ...data };
    return agentes[agenteIndex];
}

function remove(id) {
    const agenteIndex = agentes.findIndex((agente) => agente.id === id);
    if (agenteIndex === -1) {
        return false; // Não encontrou
    }
    agentes.splice(agenteIndex, 1);
    return true; // Encontrou e removeu
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
