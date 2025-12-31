# Dockerfile Fix - Correct Location

## O Problema
Render estava usando `rootDir: apps/api`, então esperava o Dockerfile dentro de `apps/api/`, não na raiz!

## A Solução
✅ Movido Dockerfile para `apps/api/Dockerfile`
✅ Ajustado paths no Dockerfile para usar `../..` (subir 2 pastas até a raiz)
✅ Atualizado `render.yaml` com `rootDir: apps/api` e `dockerfilePath: ./Dockerfile`

## O que muda agora

**Antes:**
```
/Dockerfile (na raiz) ❌
rootDir: apps/api
```

**Depois:**
```
apps/api/Dockerfile ✅
rootDir: apps/api
```

## Build Context

Quando Render faz o build:
1. Entra na pasta `apps/api` (rootDir)
2. Procura por `./Dockerfile` (encontra em `apps/api/Dockerfile`)
3. Dockerfile usa `COPY ../.. .` para acessar a raiz (monorepo)
4. Copia `apps`, `packages`, `.npmrc`, `package.json`, etc.
5. Build acontece com contexto correto

## No Próximo Redeploy

O Render vai:
1. ✅ Encontrar o Dockerfile em `apps/api/`
2. ✅ Executar com contexto correto
3. ✅ Copiar todos os arquivos necessários
4. ✅ Build e deploy com sucesso

## Próximo Passo

**Clique em Redeploy no Render!**

Desta vez deve funcionar porque:
- Dockerfile está no lugar certo
- Paths estão corretos
- Render vai encontrar e usar o Dockerfile

🚀
