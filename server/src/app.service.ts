import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AppService {
  sendFile(): string {
    return fs.readFileSync(
      path.join(__dirname, '../..', 'client', 'build', 'index.html'),
      'utf-8',
    );
  }
}
