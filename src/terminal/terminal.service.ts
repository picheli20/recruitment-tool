import { spawn, SpawnOptions } from 'child_process';
import { existsSync, rmdirSync, mkdirSync, readdirSync, lstatSync, unlinkSync } from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TerminalService {
  run(command: string, args: string[], options?: SpawnOptions) {
    const process = spawn(command, args, options);
    return new Promise((resolve, reject) => {
      let out = '';

      process.stdout.on('data', data => out += data.toString());
      process.on('error', reject);
      process.on('close', (code) => resolve({ code, out }));
    });
  }

  rmdir(dir: string) {
    if (this.exists(dir)) {
      this.deleteFolderRecursive(dir);
      return true;
    }
    return false;
  }

  mkdir(dir: string) {
    if (!this.exists(dir)){
      mkdirSync(dir);
      return true;
    }

    return false;
  }

  exists(dir: string): boolean {
    return existsSync(dir);
  }

  private deleteFolderRecursive(path: string) {
    if (existsSync(path)) {
      readdirSync(path).forEach((file, index) => {
        const curPath = `${path}/${file}`;
        lstatSync(curPath).isDirectory() ?
          this.deleteFolderRecursive(curPath) : // recurse
          unlinkSync(curPath); // delete file
      });

      rmdirSync(path);
    }
  }
}
