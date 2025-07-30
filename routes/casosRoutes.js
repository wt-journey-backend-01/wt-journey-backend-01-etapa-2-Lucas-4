const express = require("express");
const router = express.Router();
const casosController = require("../controllers/casosController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Caso:
 *       type: object
 *       required:
 *         - titulo
 *         - descricao
 *         - status
 *         - agente_id
 *       properties:
 *         id:
 *           type: string
 *           description: ID auto-gerado do caso
 *         titulo:
 *           type: string
 *           description: Título do caso
 *         descricao:
 *           type: string
 *           description: Descrição detalhada do caso
 *         status:
 *           type: string
 *           description: Status do caso (aberto ou solucionado)
 *         agente_id:
 *           type: string
 *           description: ID do agente responsável pelo caso
 *       example:
 *         id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46"
 *         titulo: "Homicídio no Bairro União"
 *         descricao: "Disparos foram reportados às 22:33..."
 *         status: "aberto"
 *         agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
 */

/**
 * @swagger
 * tags:
 *   name: Casos
 *   description: API para gerenciamento de casos policiais
 */

/**
 * @swagger
 * /casos:
 *   get:
 *     summary: Lista todos os casos
 *     tags: [Casos]
 *     parameters:
 *       - in: query
 *         name: agente_id
 *         schema:
 *           type: string
 *         description: Filtra casos por ID do agente
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filtra casos por status (aberto ou solucionado)
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Busca por palavra-chave no título ou descrição
 *     responses:
 *       200:
 *         description: Lista de casos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Caso'
 */
router.get("/casos", casosController.getAllCasos);

/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Obtém um caso pelo ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Detalhes do caso
 *       404:
 *         description: Caso não encontrado
 */
router.get("/casos/:id", casosController.getCasoById);

/**
 * @swagger
 * /casos:
 *   post:
 *     summary: Cria um novo caso
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       201:
 *         description: Caso criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/casos", casosController.createCaso);

/**
 * @swagger
 * /casos/{id}:
 *   put:
 *     summary: Atualiza um caso por completo
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       200:
 *         description: Caso atualizado
 *       404:
 *         description: Caso não encontrado
 */
router.put("/casos/:id", casosController.updateCaso);

/**
 * @swagger
 * /casos/{id}:
 *   patch:
 *     summary: Atualiza um caso parcialmente
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       200:
 *         description: Caso atualizado
 *       404:
 *         description: Caso não encontrado
 */
router.patch("/casos/:id", casosController.patchCaso);

/**
 * @swagger
 * /casos/{id}:
 *   delete:
 *     summary: Remove um caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       204:
 *         description: Caso removido com sucesso
 *       404:
 *         description: Caso não encontrado
 */
router.delete("/casos/:id", casosController.deleteCaso);

/**
 * @swagger
 * /casos/{caso_id}/agente:
 *   get:
 *     summary: Retorna os dados do agente responsável por um caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: caso_id
 *         required: true
 *         description: O ID do caso
 *     responses:
 *       200:
 *         description: Dados do agente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *       404:
 *         description: Caso ou agente não encontrado
 */
router.get("/casos/:caso_id/agente", casosController.getAgenteByCasoId);

module.exports = router;
