import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promisify } from 'util';
import * as os from 'os';
import * as path from 'path';

@Injectable()
export class StoreService {
  tempFolder = os.tmpdir();

  async save(key, data: any) {
    const fileName = path.join(this.tempFolder, key + '.json');
    await promisify(fs.writeFile)(fileName, JSON.stringify(data));
  }

  async load(key) {
    const fileName = path.join(this.tempFolder, key + '.json');
    try {
      await promisify(fs.stat)(fileName);
    } catch (err) {
      if (err.code === 'ENOENT') {
        return;
      } else {
        throw err;
      }
    }
    const data = await promisify(fs.readFile)(fileName);
    return JSON.parse(data.toString());
  }
}
