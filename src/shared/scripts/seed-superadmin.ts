import 'reflect-metadata';
import { CompanyModel } from '@/database/models/Company';
import { UsuarioModel } from '@/database/models/Usuario';
import { ModuloModel } from '@/database/models/Modulo';
import bcrypt from 'bcrypt';

async function seed() {
  try {
    console.log('Iniciando o seeding do banco de dados...');

    // 1. Create or Find control company
    let [company] = await CompanyModel.findOrCreate({
      where: { cnpj: '00000000000000' },
      defaults: {
        nome: 'SaaS Control',
        cnpj: '00000000000000',
        active: true
      }
    });
    console.log(`Empresa SaaS Control: ID = ${company.id}`);

    // 2. Create or Find Super Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    let [user, created] = await UsuarioModel.findOrCreate({
      where: { email: 'superadmin@saas.com' },
      defaults: {
        company_id: company.id,
        nome: 'Super Administrador',
        email: 'superadmin@saas.com',
        senha: hashedPassword,
        role: 'SUPERADMIN',
        active: true
      }
    });

    if (created) {
      console.log('Usuário SUPERADMIN cadastrado com sucesso!');
    } else {
      // Update password just to be sure
      user.senha = hashedPassword;
      user.role = 'SUPERADMIN';
      await user.save();
      console.log('Usuário SUPERADMIN já existia. Credenciais atualizadas.');
    }

    // 3. Optional: Seed some default modules so you can toggle them in the panel
    const defaultModules = [
      { nome: 'Boletos & PDFs', descricao: 'Processamento de boletos e envio para o ERP Cigam', icone: 'FileText' },
      { nome: 'Oportunidades', descricao: 'Geração e sincronização de oportunidades comerciais', icone: 'Briefcase' }
    ];

    for (const m of defaultModules) {
      await ModuloModel.findOrCreate({
        where: { nome: m.nome },
        defaults: {
          nome: m.nome,
          descricao: m.descricao,
          icone: m.icone,
          active: true
        }
      });
    }
    console.log('Módulos padrão semeados.');

    console.log('\n--- CREDENCIAIS DO SUPERADMIN ---');
    console.log('E-mail: superadmin@saas.com');
    console.log('Senha: admin123');
    console.log('---------------------------------\n');

    process.exit(0);
  } catch (error: any) {
    console.error('Erro durante o seeding:', error.message);
    process.exit(1);
  }
}

seed();
