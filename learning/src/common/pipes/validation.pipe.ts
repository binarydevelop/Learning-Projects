import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class logPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata){
        console.log(metadata.data, metadata.metatype, metadata.type)
        return value;
    }
}