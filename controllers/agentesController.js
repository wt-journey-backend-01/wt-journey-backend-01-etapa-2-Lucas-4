const agentesRepository = require("../repositories/agentesRepository");

// GET /agentes (com bônus de filtro e ordenação)
function getAllAgentes(req, res) {
    let agentes = agentesRepository.findAll();

    // Bônus: Filtrar por cargo
    if (req.query.cargo) {
        agentes = agentes.filter(
            (agente) =>
                agente.cargo.toLowerCase() === req.query.cargo.toLowerCase()
        );
    }

    // Bônus: Ordenar por data de incorporação
    if (req.query.sort === "dataDeIncorporacao") {
        agentes.sort(
            (a, b) =>
                new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao)
        );
    } else if (req.query.sort === "-dataDeIncorporacao") {
        agentes.sort(
            (a, b) =>
                new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao)
        );
    }

    res.json(agentes);
}

// GET /agentes/:id
function getAgenteById(req, res) {
    const agente = agentesRepository.findById(req.params.id);
    if (!agente) {
        return res.status(404).json({ message: "Agente não encontrado" });
    }
    res.json(agente);
}

// POST /agentes
function createAgente(req, res) {
    const { nome, dataDeIncorporacao, cargo } = req.body;

    // Validação simples
    if (!nome || !dataDeIncorporacao || !cargo) {
        return res.status(400).json({
            message:
                "Dados inválidos. Campos obrigatórios: nome, dataDeIncorporacao, cargo.",
        });
    }

    const newAgente = agentesRepository.create({
        nome,
        dataDeIncorporacao,
        cargo,
    });
    res.status(201).json(newAgente);
}

// PUT /agentes/:id
function updateAgente(req, res) {
    const updatedAgente = agentesRepository.update(req.params.id, req.body);
    if (!updatedAgente) {
        return res.status(404).json({ message: "Agente não encontrado" });
    }
    res.json(updatedAgente);
}

// PATCH /agentes/:id (funciona igual ao PUT nesta implementação simples)
function patchAgente(req, res) {
    const updatedAgente = agentesRepository.update(req.params.id, req.body);
    if (!updatedAgente) {
        return res.status(404).json({ message: "Agente não encontrado" });
    }
    res.json(updatedAgente);
}

// DELETE /agentes/:id
function deleteAgente(req, res) {
    const success = agentesRepository.remove(req.params.id);
    if (!success) {
        return res.status(404).json({ message: "Agente não encontrado" });
    }
    res.status(204).send(); // 204 No Content
}

module.exports = {
    getAllAgentes,
    getAgenteById,
    createAgente,
    updateAgente,
    patchAgente,
    deleteAgente,
};
