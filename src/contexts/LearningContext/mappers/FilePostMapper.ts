import { FilePostDTO } from "../domain/dtos/FilePostDTO";
import { FilePost } from "../domain/entities/FilePost";

const FilePostMapper = {
  dtoToDomain(filePostDto: FilePostDTO): FilePost {
    return FilePost.createFromPrimitive(filePostDto, filePostDto.id);
  },

  domainToDto(filePost: FilePost): FilePostDTO {
    return {
      id: filePost.id.toString(),
      url: filePost.url.value,
      creationDate: filePost.creationDate,
    };
  },
};

export default FilePostMapper;
