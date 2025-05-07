const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

function adicionarLog(nomeAluno) {
    const idUnico = uuidv4();
    const dataHora = new Date().toLocaleString("pt-BR");
    const mensagem = `${idUnico}, ${dataHora}, ${nomeAluno}\n`;
    console.log(`Tentando adicionar o log: ${mensagem}`);

    fs.appendFile('logs.txt', mensagem, 'utf8', (err) => {
        if (err) {
            console.error('Erro ao escrever no arquivo', err);
        } else {
            console.log('Log adicionado com sucesso');
        }
    });
}

app.post('/logs', (req, res) => {
    const { nomeAluno } = req.body;

    if (!nomeAluno) {
        return res.status(400).json({ mensagem: "Nome do aluno é obrigatório" });
    }

    adicionarLog(nomeAluno);

    res.status(201).json({
        mensagem: "Log registrado com sucesso",
        nomeAluno,
    });
});

app.get('/logs/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile('logs.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ mensagem: "Erro ao ler o arquivo de log" });
        }

        const logs = data.split('\n');
        const log = logs.find(line => line.startsWith(id));

        if (log) {
            return res.status(200).json({ log });
        } else {
            return res.status(404).json({ mensagem: "Log não encontrado" });
        }
    });
});
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});