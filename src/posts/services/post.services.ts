import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId, Types } from "mongoose";
import { Post } from "src/schemas/Post.schema";
import { createPostDto } from "../dto/CreatePosts.dto";
import { User } from "src/schemas/User.schema";



@Injectable()
export class PostServices {

constructor
(
    @InjectModel(Post.name) private PostModel : Model<Post>,
    @InjectModel(User.name) private UserModel : Model<User>,   
){}

async createPost(createPost: createPostDto){
    const findUser = await this.UserModel.findById(createPost.author);
    if(!findUser) throw new HttpException('User not found',404);
    const newPost = new this.PostModel(createPost);
    const savedPost = await newPost.save();
    await findUser.updateOne({$push: {
        posts: savedPost._id,

        },
    });
    return savedPost;
 }

 findPostById(){

 }

 async liked(idPost: string,idauthor: string){
    const User = await this.UserModel.findById(idauthor);
    if(!User) throw new HttpException('invalido',404);

    const Post = await this.PostModel.findById(idPost);
    if(!Post) throw new HttpException('invalido',404);

    //verificar se o post ja recebeu like daquele usuario
    //includes() verificar o array de ObjectIds, pra isso funciona o elemento que procurado precisa ser do mesmo tipo para a comparação
    //por isso usamos o new Types.ObjectId() para trasformar a string "idauthor em tipo object id do mongo"
    const postLiked = Post.likes?.includes(new Types.ObjectId(idauthor));

    //tira o like que o usuario deu no post, e do registro de usuarios
    if(postLiked){
        await this.PostModel.updateOne(
            { _id: idPost },
            {$pull: {likes: idauthor}}
        );        
        await this.UserModel.updateOne(
            {_id: idauthor},
            {$pull: {likedPost: idPost}}
        )

        return { message: 'like retirado'};
    }
    else{
        //addtoset: Adiciona somente se o valor ainda não estiver presente no array.
        //$push: 	Adiciona o valor ao array — mesmo que ele já exista.
        await this.PostModel.updateOne(
            {_id: idPost},
            {$addToSet: { likes: idauthor}}
        );
        await this.UserModel.updateOne(
            {_id: idauthor},
            {$addToSet: {likedPost: idPost}}
        );

         // Retorne o novo total de likes e o estado do botão(quando tiver front end)
        // const updatedPost = await this.PostModel.findById(postId);
        // return {
        // liked: !hasLiked,
        // totalLikes: updatedPost?.likes.length || 0,
        // };

        return { message: 'like colocado'};
    }



 }

}