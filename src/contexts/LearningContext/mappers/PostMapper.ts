import { PostDTO } from "../domain/dtos/PostDTO";
import { Post } from "../domain/entities/Posts";

const PostMapper = {
  dtoToDomain(postDto: PostDTO): Post {
    return Post.createFromPrimitive(postDto, postDto.id);
  },

  domainToDto(post: Post): PostDTO {
    const postDto: PostDTO = {
      id: post.id.toString(),
      title: post.title.value,
      creationDate: post.creationDate,
    };
    if (post.description) {
      postDto.description = post.description.value;
    }

    if (post.url) {
      postDto.url = post.url.value;
    }
    return postDto;
  },
};

export default PostMapper;
