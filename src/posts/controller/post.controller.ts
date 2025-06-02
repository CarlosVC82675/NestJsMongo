import { Body, Controller, Post } from "@nestjs/common";
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

}