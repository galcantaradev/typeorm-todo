"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const typeorm_config_1 = __importDefault(require("../typeorm.config"));
const entities_1 = require("./entities");
const app = express_1.default();
const PORT = 3000;
const HOST = 'localhost';
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection(typeorm_config_1.default);
    app.use(express_1.default.json());
    app.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        const todos = yield entities_1.Todo.find();
        return res.status(200).send(todos);
    }));
    app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = req;
        if (!body.description) {
            return res.send({ error: true, message: 'description is required' });
        }
        const todo = yield entities_1.Todo.create({
            description: body.description,
            isDone: body.isDone
        });
        yield todo.save();
        return res.status(201).send(todo);
    }));
    app.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const todo = yield entities_1.Todo.findOne(id);
        if (!todo) {
            return res.status(404).send({ error: true, message: 'todo not found' });
        }
        return res.status(200).send(todo);
    }));
    app.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { description, isDone } = req.body;
        const todo = yield entities_1.Todo.findOne(id);
        if (!todo) {
            return res.status(404).send({ error: true, message: 'todo not found' });
        }
        if (!description) {
            return res.send({ error: true, message: 'description is required' });
        }
        todo.description = description;
        todo.isDone = isDone;
        yield todo.save();
        return res.status(200).send(todo);
    }));
    app.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const todo = yield entities_1.Todo.findOne(id);
        if (!todo) {
            return res.status(404).send({ error: true, message: 'todo not found' });
        }
        yield entities_1.Todo.delete(todo);
        return res.send({ error: false, message: 'deleted' });
    }));
    app.listen(PORT, () => console.log(`Server running on ${HOST}:${PORT}`));
});
main().catch(error => console.error(error));
//# sourceMappingURL=index.js.map