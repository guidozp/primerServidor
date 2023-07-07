import express, { Request, Response} from 'express';
import { AppDataSource } from "./data-source"
import {User} from './entity/User'
import { Item } from './entity/Item';

const userRepository = AppDataSource.getRepository(User)

const router = express.Router();

// Obtener todos los usuarios
router.get('/api/users', async (req: Request, res: Response) => {
  const users = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .getMany()
    const firstUser = users[0] 
    res.json(firstUser);
});

// Obtener un usuario por su ID
router.get('/api/users/:id', async (req: Request, res: Response) => {
  const ide = req.params.id
  const userId = await userRepository.findOneBy({id:parseInt(ide)})
  res.json(userId)
  
});

// Crear un nuevo usuario
router.post('/api/users', async (req: Request, res: Response) => {

  const {
    firstName,
    lastName,
    cpf,
    address
  } = req.body
  const newUser = await AppDataSource
                        .createQueryBuilder()
                        .insert()
                        .into(User)
                        .values({
                          firstName,
                          lastName,
                          cpf,
                          address,
                        }).execute()
console.log(newUser)
  res.status(201).json(newUser);
});

router.put('/api/users', async (req: Request, res: Response) => {
  const data = req.body

  await userRepository.save(data)

  const respuesta = await userRepository.findOneById(data.id)

  res.json(respuesta)
});

// Eliminar un usuario por su ID
router.delete('/api/users/:id', async (req: Request, res: Response) => {
  const ide = req.params.id
  await userRepository.delete(ide)
  res.send("Usuario Eliminado")

});
//crear nuevo item 
router.post('/api/items', async (req: Request, res: Response) => {

  const {
    name,
    price,
  } = req.body
  const newItem = await AppDataSource
                        .createQueryBuilder()
                        .insert()
                        .into(Item)
                        .values([{
                          name,
                          price
                        }]).execute()
console.log(newItem)
  res.status(201).json(newItem);
})

export default router;
