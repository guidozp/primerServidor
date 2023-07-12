import express, { Request, Response} from 'express';
import { AppDataSource } from "./data-source"
import {User} from './entity/User'
import { Item } from './entity/Item';
import { Receipt } from './entity/Receipt';

const userRepository = AppDataSource.getRepository(User)
const itemRepository = AppDataSource.getRepository(Item);

const router = express.Router();
//USERS
// Obtener todos los usuarios
router.get('/api/users', async (req: Request, res: Response) => {
  const users = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .getMany() 
    res.json(users);
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


//ITEMS
// Obtener todos los items
router.get('/api/items', async (req: Request, res: Response) => {
  const items = await itemRepository.find();
  res.json(items);
});

// Obtener un item por su ID
router.get('/api/items/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const item = await itemRepository.findOneBy({
    id: parseInt(id)
});
  res.json(item);
});

//crear nuevo item 
router.post('/api/items', async (req: Request, res: Response) => {

  const { name, price} = req.body
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

// Actualizar un item por su ID
router.put('/api/items/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, price } = req.body;
  const item = await itemRepository.findOneBy({
    id: parseInt(id) 
});
  if (item) {
    item.name = name || item.name;
    item.price = price || item.price;
    await itemRepository.save(item);
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item no encontrado' });
  }
});
// Eliminar un item por su ID
router.delete('/api/items/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const item = await itemRepository.findOneBy({
    id: parseInt(id)});
  if (item) {
    await itemRepository.remove(item);
    res.json({ message: 'Item eliminado' });
  } else {
    res.status(404).json({ message: 'Item no encontrado' });
  }
});

//RECEIPTS
//Crear un recibo

interface BodyItem extends Item {
  quantity:number
}

router.post('/api/receipts', async (req: Request, res: Response) => {
  const { userId, items}:{userId: string, items: BodyItem[]} = req.body
  let total = 0

  items.forEach(item=>{
    total = total + item.price * item.quantity
  })

  const newReceipt = await AppDataSource
                        .createQueryBuilder()
                        .insert()
                        .into(Receipt)
                        .values({
                          userId: parseInt(userId),
                          items,
                          total
                        }).execute()
  res.status(201).json(newReceipt);
})


export default router;
