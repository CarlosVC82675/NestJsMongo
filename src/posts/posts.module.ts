import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "src/schemas/Post.schema";
import { PostsController } from "./controller/post.controller";
import { PostServices } from "./services/post.services";
import { User, UserSchema } from "src/schemas/User.schema";

@Module({

    imports: [
        MongooseModule.forFeature([{
            name: Post.name,
            schema: PostSchema,

        },{ //adicionei esse parte de usuarios porque eu vou utilizar desse esquema, e melhor fazer assim
            //porque dessa maneira eu garanto que so vou usar oque preciso
             name: User.name, 
             schema: UserSchema,
        }
           
        
    ])
    ],
    controllers: [PostsController],
    providers: [PostServices],

})
export class PostsModule {}