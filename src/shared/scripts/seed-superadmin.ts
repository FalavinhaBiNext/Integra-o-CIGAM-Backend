import 'reflect-metadata';
import 'module-alias/register';
import { CompanyModel } from '@/database/models/Company';
import { UsuarioModel } from '@/database/models/Usuario';
import { ModuloModel } from '@/database/models/Modulo';
import bcrypt from 'bcrypt';

async function seed() {
  try {
    console.log('Iniciando o seeding do banco de dados...');

    // 1. Create or Find control company
    let [company] = await CompanyModel.findOrCreate({
      where: { cnpj: '19175829000153' },
      defaults: {
        nome: 'FALAVINHA NEXT CONSULTORIA EM INTELIGENCIA DE NEGOCIOS',
        cnpj: '19175829000153',
        active: true
      }
    });
    console.log(`Empresa SaaS Control: ID = ${company.id}`);

    // 2. Create or Find Super Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    let [user, created] = await UsuarioModel.findOrCreate({
      where: { email: 'desenvolvimento@admin.com' },
      defaults: {
        company_id: company.id,
        nome: 'Desenvolvimento',
        email: 'desenvolvimento@admin.com',
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
    console.log('E-mail: desenvolvimento@admin.com');
    console.log('Senha: admin123');
    console.log('---------------------------------\n');

    console.log('=== SEED FINALIZADO ===');
  } catch (error: any) {
    console.error('Erro durante o seeding:', error.message);
  }
}

seed();
