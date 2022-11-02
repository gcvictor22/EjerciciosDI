import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CustomPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const newValue = Number(value)
    if (isNaN(newValue)) {
      throw new BadRequestException('El id del usuario debe ser un número')
    }
    return newValue;
  }
}
