# Deploy na Vercel

## Opção 1: Deploy Rápido (Recomendado)

Clique no botão abaixo para fazer deploy direto:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyvgcunha%2Fycunha&project-name=personal-hub&repository-name=ycunha&demo-title=Personal%20HUB&demo-description=Personal%20hub%20for%20productivity%20and%20life%20management&demo-url=https%3A%2F%2Fpersonal-hub.vercel.app&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_DEFAULT_USER_ID,SUPABASE_SERVICE_ROLE_KEY&envDescription=Supabase%20credentials%20needed%20for%20database%20integration&envLink=https%3A%2F%2Fsupabase.com)

---

## Opção 2: Deploy Manual

### Pré-requisitos
- Conta GitHub (você já tem)
- Conta Vercel (criar em https://vercel.com)

### Passos

1. **Vá para Vercel:**
   ```
   https://vercel.com/new
   ```

2. **Importe o repositório:**
   - Clique em "Continue with GitHub"
   - Selecione `yvgcunha/ycunha`

3. **Configure o projeto:**
   - Framework: **Next.js**
   - Root Directory: `personal-hub`
   - Build Command: Vercel preencherá automaticamente

4. **Adicione variáveis de ambiente:**

   Clique em "Environment Variables" e adicione:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://qrdxwcdexidwyssxrjzw.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyZHh3Y2RleGlkd3lzc3hyanp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTI5OTgsImV4cCI6MjA4ODg4ODk5OH0.SstV7llHPb23XMDqJj5x09jbYWQMzEug5eP8JCwSNYU
   NEXT_PUBLIC_DEFAULT_USER_ID=default-user
   SUPABASE_SERVICE_ROLE_KEY=[sua chave de serviço]
   ```

   **⚠️ SUPABASE_SERVICE_ROLE_KEY:**
   - Acesse: https://app.supabase.com
   - Seu projeto → Settings → API → Service Role Secret (copie)

5. **Clique em "Deploy"**
   - Aguarde 2-3 minutos
   - Você receberá uma URL: `seu-projeto.vercel.app`

### Após o Deploy

1. **Adicione o domínio ao Supabase:**
   - Supabase → Authentication → URL Configuration
   - Authorized redirect URLs → Adicione sua URL Vercel

2. **Pronto!** 🎉

---

## Troubleshooting

**Erro de build?**
```
Verifique em Vercel → Deployments → Build Logs
```

**Erro de banco de dados?**
```
- Confirme SUPABASE_SERVICE_ROLE_KEY está correto
- Verifique se as tabelas existem no Supabase
```

**Erro de autenticação?**
```
- Adicione a URL do Vercel em Supabase → Auth → Redirect URLs
```
