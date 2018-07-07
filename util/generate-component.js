const { exec } = require('child_process');
const args = process.argv.slice(2);

exec(`cd ./src/components && vgc ${args[0]} && mv ./${args[0]}/index.vue ./${args[0]}/${args[0]}.vue`
  , (err, stdout, stderr) => {
    if (err) {
      console.log('Failed to generate component. Ex: \'npm run gc ComponentName\'');
      console.log(`${stderr}`);
      return;
    }
    console.log(`${stdout}`);
  });
