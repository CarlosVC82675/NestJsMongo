import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { PostServices } from "../services/post.services";
import { createPostDto } from "../dto/CreatePosts.dto";




@Controller('posts')
export class PostsController {

constructor(private postService: PostServices){}


    @Post()
    createPost(@Body() createPost: createPostDto) {
       return this.postService.createPost(createPost);
    }

    @Patch(':idPost')
    async likePost(@Param('idPost')idPost:string, @Body('authorid') idauthor:string){
        return this.postService.liked(idPost,idauthor);

    }

}