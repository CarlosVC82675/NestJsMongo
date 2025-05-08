import { Injectable, HttpException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { user } from "src/schemas/User.schema";
import { createUserDTO } from "./dto/CreateUser.dto";
import { updateUserDTO } from "./dto/UpdateUser.dto";


@Injectable() //marcar a classe como injetavel  e pode ser usada em outros lugares alem de adicionar dependências automaticamente.
export class UsersService { 
    //criando uma classe de serviço onde vai ficar a logica do meu usuario
    //injetando o modelo que sera usado
    // metodo construtor da classe
    constructor
    (  
        @InjectModel(user.name) private userModel: Model<user>

        //injeta o modelo mongoose da coleção de usuarios
        //o argumento desse decorador é o nome do modelo(schma) e da propriedade criada no users.module
        // como o modelo foi ceiado no users.module o nestjs ja sabe qual schema usa

        //private userModel: é a instancia do modelo que representa a coleção no banco do mongo
        //pode ser usado como: this.usermodel.find(), create(),fundbyid() e etc
        //private defini que a propriedade so pode ser usada dentro da classe

        //o tipo Model<users> vem do Mongoose, para trabalhar com documentos que seguem a interface/classe user
        //registra o formato da classe user no typescript que ajuda na edição e verificação de erros e etc
    )
    {}

    //metodos que vao interagir com o banco
    //dto = objeto de transferencia
   async createUser(UserDTO: createUserDTO){
        //Quando esse metodo for chamado a validação provavelmente ja vai ter sido feita la no controller.
        //criando o documento de usuario
        //criando uma nova instância do seu modelo mongoose
        try{
            const newUser = new this.userModel(UserDTO);
            await newUser.save();
            return newUser;
        }
        catch(error){ //lidando com erro de duplicidade e outros
            if(error.code === 11000){
                throw new HttpException('E-mail ou apelido já cadastrado', 400);
            }else{
                console.error(error); //log de desenvolvedor
                throw new HttpException(' Erro ao criar Usuario', 500)
            }
                
        }
    
    }

    //metodo para chamar todos os usuarios
    getsUsers(){
        return this.userModel.find();
    }

     //metodo para chamar usuario pelo id
    getUserById(id: string){
        return this.userModel.findById(id);
    }

    updateUser(id:string, updateuser:updateUserDTO){
        return this.userModel.findByIdAndUpdate(id,updateuser,{new: true});
        //na teoria deveriamos indicar quais elementos iram atualizar:
        //this.userModel.findByIdAndUpdate(id,{nomeUsuario:updateuser});
        //porem, como fizemos n DTO, filtramos e adicionamos esses elementos como opcionais,
        // criando um objeto parcil(basicamente e um objeto que nao precisa de todas as propriedades(uma parte do objeto completo)
        // entao quando passamos isso para o moongose 
        // ele vai receber o objeto so com os elementos que foram passado e so vai atualizar aquilo que foi passado.



        //updateone assume que voce ja sabe qual documento é
        //findoneAndUpdate faz a procura por um paramentro e atualizar o dado achado
        //updateMany atulizar todos os documentos ou varios
        //findbyidandupdate: faz a procura pelo id e atualizar o achado
        // new true: retorna o objeto ja feito update
    }

    deleteUser(id:string){
        return this.userModel.findByIdAndDelete(id); 
        //mesmo padrao do update
    }
}