const { execSync } = require('child_process');

function getEnv(name, fallback) {
  return process.env[name] || fallback || '(nao definido)';
}

console.log('');
console.log('=== VARIAVEIS DO BANCO ===');
console.log('  DB_HOST: ' + getEnv('DB_HOST'));
console.log('  DB_PORT: ' + getEnv('DB_PORT', '5432'));
console.log('  DB_USER: ' + getEnv('DB_USER'));
console.log('  DB_NAME: ' + getEnv('DB_NAME'));
console.log('  DB_SSL:  ' + getEnv('DB_SSL'));
console.log('');

const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionTimeoutMillis: 10000,
});

client.connect((err) => {
  if (err) {
    console.error('=== ERRO DE CONEXAO PG ===');
    console.error('  Message: ' + (err.message || '(vazio)'));
    console.error('  Code:    ' + (err.code || '(vazio)'));
    console.error('  Detail:  ' + (JSON.stringify(err, Object.getOwnPropertyNames(err))));
    console.error('');
    process.exit(1);
  }

  console.log('=== CONEXAO PG OK ===');
  client.end();

  console.log('=== EXECUTANDO MIGRATIONS ===');
  execSync('npx sequelize db:migrate --env production', { stdio: 'inherit', cwd: process.cwd() });

  console.log('=== INICIANDO SERVIDOR ===');
  execSync('node dist/server.js', { stdio: 'inherit', cwd: process.cwd() });
});
