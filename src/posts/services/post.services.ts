import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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

}