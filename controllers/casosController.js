const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository"); // Para o endpoint bônus

// GET /casos (com bônus de filtro e busca)
function getAllCasos(req, res) {
    let casos = casosRepository.findAll();

    // Bônus: Filtrar por agente_id
    if (req.query.agente_id) {
        casos = casos.filter((caso) => caso.agente_id === req.query.agente_id);
    }

    // Bônus: Filtrar por status
    if (req.query.status) {
        casos = casos.filter(
            (caso) =>
                caso.status.toLowerCase() === req.query.status.toLowerCase()
        );
    }

    // Bônus: Busca por termo (full-text search simples)
    if (req.query.q) {
        const query = req.query.q.toLowerCase();
        casos = casos.filter(
            (caso) =>
                caso.titulo.toLowerCase().includes(query) ||
                caso.descricao.toLowerCase().includes(query)
        );
    }

    res.json(casos);
}

// GET /casos/:id
function getCasoById(req, res) {
    const caso = casosRepository.findById(req.params.id);
    if (!caso) {
        return res.status(404).json({ message: "Caso não encontrado" });
    }
    res.json(caso);
}

// POST /casos
function createCaso(req, res) {
    const { titulo, descricao, status, agente_id } = req.body;

    // Validações
    if (!titulo || !descricao || !status || !agente_id) {
        return res.status(400).json({
            message:
                "Dados inválidos. Campos obrigatórios: titulo, descricao, status, agente_id.",
        });
    }
    if (status !== "aberto" && status !== "solucionado") {
        return res.status(400).json({
            message:
                "O campo 'status' pode ser somente 'aberto' ou 'solucionado'.",
        });
    }
    if (!agentesRepository.findById(agente_id)) {
        return res.status(400).json({
            message:
                "O 'agente_id' fornecido não corresponde a um agente existente.",
        });
    }

    const newCaso = casosRepository.create({
        titulo,
        descricao,
        status,
        agente_id,
    });
    res.status(201).json(newCaso);
}

// PUT /casos/:id
function updateCaso(req, res) {
    const updatedCaso = casosRepository.update(req.params.id, req.body);
    if (!updatedCaso) {
        return res.status(404).json({ message: "Caso não encontrado" });
    }
    res.json(updatedCaso);
}

// PATCH /casos/:id
function patchCaso(req, res) {
    const updatedCaso = casosRepository.update(req.params.id, req.body);
    if (!updatedCaso) {
        return res.status(404).json({ message: "Caso não encontrado" });
    }
    res.json(updatedCaso);
}

// DELETE /casos/:id
function deleteCaso(req, res) {
    const success = casosRepository.remove(req.params.id);
    if (!success) {
        return res.status(404).json({ message: "Caso não encontrado" });
    }
    res.status(204).send();
}

// Bônus: GET /casos/:caso_id/agente
function getAgenteByCasoId(req, res) {
    const caso = casosRepository.findById(req.params.caso_id);
    if (!caso) {
        return res.status(404).json({ message: "Caso não encontrado" });
    }

    const agente = agentesRepository.findById(caso.agente_id);
    if (!agente) {
        // Isso indica uma inconsistência de dados, mas 404 é apropriado
        return res.status(404).json({
            message: "Agente responsável pelo caso não foi encontrado",
        });
    }

    res.json(agente);
}

module.exports = {
    getAllCasos,
    getCasoById,
    createCaso,
    updateCaso,
    patchCaso,
    deleteCaso,
    getAgenteByCasoId,
};
