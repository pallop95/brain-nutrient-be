import { ApiProperty } from '@nestjs/swagger';

export class AccessToken {
  @ApiProperty({ example: 'Uvuvuvuvu-uvumvum-Ossas' })
  access_token: string;
}
