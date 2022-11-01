import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 1, required: true})
    id: string;
    @ApiProperty({example: 'john'})
    name: string;
    @ApiProperty({example: 'doe'})
    surname: string;
    @ApiProperty({required: false, example: 17, examples: [0,1,2]})
    age: number;
}
