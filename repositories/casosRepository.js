const { v4: uuidv4 } = require("uuid");

// Dados iniciais (note que o agente_id corresponde a um agente existente)
let casos = [
    {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "Homicídio no Bairro União",
        descricao:
            "Disparos foram reportados às 22:33 do dia 10/07/2007, resultando na morte da vítima.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
    },
    {
        id: "c8e7f9a1-5b2d-4c6f-8a9b-3d1e7f5a2b9c",
        titulo: "Furto de Veículo",
        descricao:
            "Veículo furtado na noite de ontem. O caso está sob investigação.",
        status: "solucionado",
        agente_id: "a2b7e6c9-1d3f-4a8e-9b5c-8f6d7e9a1b3c",
    },
];

function findAll() {
    return casos;
}

function findById(id) {
    return casos.find((caso) => caso.id === id);
}

function create(caso) {
    const newCaso = { id: uuidv4(), ...caso };
    casos.push(newCaso);
    return newCaso;
}

function update(id, data) {
    const casoIndex = casos.findIndex((caso) => caso.id === id);
    if (casoIndex === -1) {
        return null;
    }
    casos[casoIndex] = { ...casos[casoIndex], ...data };
    return casos[casoIndex];
}

function remove(id) {
    const casoIndex = casos.findIndex((caso) => caso.id === id);
    if (casoIndex === -1) {
        return false;
    }
    casos.splice(casoIndex, 1);
    return true;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
