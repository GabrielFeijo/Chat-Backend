import { IsNotEmpty } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  action: string;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  sender: string;

  @IsNotEmpty()
  createdAt: Date;
}
