import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import { promises as fsPromises } from 'node:fs';
import * as path from 'node:path';

@Injectable()
export class LoggerService extends ConsoleLogger {
  async logToFile(entry: string) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/Chicago',
    }).format(new Date())}\t${entry}\n`;

    const dirPath = path.join(__dirname, '..', '..', 'log');
    try {
      if (!fs.existsSync(dirPath)) {
        await fsPromises.mkdir(dirPath);
      }

      await fsPromises.appendFile(
        path.join(dirPath, `${new Date().toString()}.txt`),
        formattedEntry,
      );
    } catch (e) {
      console.error(e);
    }
  }

  log(message: any, context?: string) {
    const entry = `${message}\t${context}`;
    this.logToFile(entry);
    super.log(message, context);
  }

  error(message: any, stackOrContext?: string) {
    const entry = `${message}\t${stackOrContext}`;
    this.logToFile(entry);
    super.error(message, stackOrContext);
  }
}
