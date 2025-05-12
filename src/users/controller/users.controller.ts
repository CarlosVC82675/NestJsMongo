// servir de endpoints para nossos clientes
//basicamente lidar com  as requisições HTTP extraindo os dados para o service(camada de negocio)

import { Body, Controller, Post, Get, Param, HttpException, Patch, Delete } from "@nestjs/common";
import { UsersService } from "../services/users.services";
import { createUserDTO } from "../dto/CreateUser.dto";
import mongoose from "mongoose";
import { updateUserDTO } from "../dto/UpdateUser.dto";

@Controller('user')
export class UserController{

    //injetando a classe de serviço
    constructor(private Userservice: UsersService){}


    @Post() //decorador de rota
   async createUser(@Body() createUser: createUserDTO){
        console.log(createUser);
    //@Body extrai os dados da requisição
    //Post(quando alguem fizer essa rota esse metodo sera executado)
    // createUser: createUserDTO garante que os dados seguem a estrutura esperada (com validação se configurada).
    //Passa o dto para o service que finalizar o cadastro

    try{
        const newUser = await this.Userservice.createUser(createUser);
        if(!newUser) throw new HttpException("Houve algum problema no cadastro",201);
        return{
            message: "Usuario Criado com sucesso"
        };
    } catch(error){
        throw error;
    }
    
 }

    @Get()
    getUsers(){
        return this.Userservice.getsUsers();
    }

    @Get(':id') //requisição get que recebera em sua url um Id
    async getUsersById(@Param('id') id:string){ //usamos async ja que estamos esperando pela resposta do metodo
        //@Param e um decorador que indica para o nest que queremos uma propriedade vinda da rota
        // devemos informar o parametro e sua propriedade

        //verifico se o id passado é um objeto valido
        const isValid = mongoose.Types.ObjectId.isValid(id); // melhor em um middleware
        if(!isValid) throw new HttpException('usuario invalido', 404);

        //chamando o metodo e guardando numa variavel
        const findUser = await this.Userservice.getUserById(id);
        if(!findUser) throw new HttpException('usuario nao achado', 404);
        return findUser;
    }


    // @Put indicar uma função que modificar o documento inteiro
    @Patch(':id') // idicar uma função que modificar o documento parcialmente
    async updateUser(@Param('id') id:string, @Body() updateDto :updateUserDTO ){

        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException('usuario invalido', 400); 

        const updatedUser = await this.Userservice.updateUser(id,updateDto);   
        console.log(updatedUser);
        if(!updatedUser) throw new HttpException('Usuario nao encontrado',404);
        return updatedUser;
    }

    @Delete(':id')
    async deleteuser(@Param('id')id:string){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException('usuario invalido', 400); 

        const deleteUser = await this.Userservice.deleteUser(id);
        console.log(deleteUser);
        if(!deleteUser) throw new HttpException('usuario nao encontrado', 404);
        return{
            message: "usuario deletado com sucesso"
        };
    }
  
}