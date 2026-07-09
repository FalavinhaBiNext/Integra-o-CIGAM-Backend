const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const s = new Sequelize({ dialect: 'sqlite', storage: 'dev.sqlite', logging: false });

const UPLOADS_DIR = path.resolve(__dirname, 'uploads', 'pdfs');

(async () => {
  const [boletos] = await s.query('SELECT id, company_id, nome_arquivo FROM boletos');

  for (const b of boletos) {
    // Lookup company name
    const [companies] = await s.query('SELECT nome FROM companies WHERE id = ?', { replacements: [b.company_id] });
    const company = companies[0];

    // Try new path: "Nome (id)/arquivo"
    const folderNew = company ? `${company.nome} (${b.company_id})` : b.company_id;
    const newPath = path.join(UPLOADS_DIR, folderNew, b.nome_arquivo);

    // Try old path: "id/arquivo"
    const oldPath = path.join(UPLOADS_DIR, b.company_id, b.nome_arquivo);

    const newExists = fs.existsSync(newPath);
    const oldExists = fs.existsSync(oldPath);

    const status = newExists ? 'OK (new)' : oldExists ? 'OK (old)' : 'MISSING';
    console.log(`${b.id} | ${b.nome_arquivo} | ${status}`);
    if (!newExists && !oldExists) {
      console.log(`  Company: ${company?.nome} (${b.company_id})`);
      console.log(`  Tried new: ${newPath}`);
      console.log(`  Tried old: ${oldPath}`);
    }
  }

  s.close();
})();
