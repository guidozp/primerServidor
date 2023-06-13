import express, { Request, Response } from 'express';
import { AppDataSource } from "./data-source"
import router from './router';
import "reflect-metadata"


const app = express();
const port = 3000;
app.use(express.json())
app.use(router)

app.listen(port, async () => {

  AppDataSource.initialize().then(()=>{
    console.log("database conected")
  }).catch(error => console.log(error))

  console.log(`Servidor escuchando en el puerto ${port}`);
});


