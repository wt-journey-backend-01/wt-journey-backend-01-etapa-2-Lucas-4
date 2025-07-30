const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const agentesRouter = require("./routes/agentesRoutes");
const casosRouter = require("./routes/casosRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API do Departamento de Polícia",
            version: "1.0.0",
            description: "Uma API para gerenciar casos e agentes policiais.",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas da aplicação
app.use(agentesRouter);
app.use(casosRouter);

// Rota raiz simples
app.get("/", (req, res) => {
    res.send(
        '<h1>API do Departamento de Polícia</h1><p>Acesse <a href="/docs">/docs</a> para ver a documentação da API.</p>'
    );
});

app.listen(PORT, () => {
    console.log(
        `Servidor do Departamento de Polícia rodando em http://localhost:${PORT}`
    );
});
