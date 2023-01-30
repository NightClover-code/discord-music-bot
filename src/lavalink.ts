import got from 'got';
import fs from 'fs';
import { execSync } from 'child_process';
const path = '../Lavalink.jar';

const start = () => {
  if (fs.existsSync(path))
    execSync('java -jar Lavalink.jar', { stdio: 'inherit' });
  else console.log('\x1b[31m%s\x1b[0m', 'Lavalink.jar not found!');
  console.log('\x1b[34m%s\x1b[0m', 'I will try to download one for you.');
  console.log(
    '\x1b[34m%s\x1b[0m',
    'If for whatever reason it says that the Jar file is corrupt, you can delete the jar file and try running this again.'
  );
  got
    .stream('https://cdn.darrennathanael.com/jars/Lavalink.jar')
    .pipe(fs.createWriteStream(path))
    .on('finish', () => {
      console.log('\x1b[32m%s\x1b[0m', 'Lavalink.jar downloaded!');
      execSync('java -jar Lavalink.jar', { stdio: 'inherit' });
    });
};

start();
