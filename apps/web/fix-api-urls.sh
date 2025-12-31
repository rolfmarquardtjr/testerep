#!/bin/bash

# Lista de arquivos para corrigir
files=(
  "./app/solicitar-servico/page.tsx"
  "./app/explorar/page.tsx"
  "./app/dashboard/profissional/perfil/page.tsx"
  "./app/dashboard/profissional/mensagens/page.tsx"
  "./app/dashboard/profissional/oportunidades/[id]/page.tsx"
  "./app/dashboard/profissional/oportunidades/page.tsx"
  "./app/dashboard/profissional/page.tsx"
  "./app/dashboard/profissional/trabalhos/page.tsx"
  "./app/dashboard/profissional/trabalhos/[id]/page.tsx"
  "./app/dashboard/cliente/pedidos/page.tsx"
  "./app/dashboard/cliente/pedidos/[id]/page.tsx"
  "./app/dashboard/cliente/pedidos/[id]/orcamentos/page.tsx"
  "./app/dashboard/cliente/perfil/page.tsx"
  "./app/dashboard/cliente/mensagens/page.tsx"
  "./app/dashboard/cliente/page.tsx"
  "./app/register/page.tsx"
  "./app/buscar/page.tsx"
  "./app/login/page.tsx"
  "./app/profissional/[id]/page.tsx"
  "./components/layout/DashboardLayout.tsx"
  "./components/shared/ReviewForm.tsx"
  "./hooks/useChat.ts"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Processando $file..."
    
    # Substituir todas as ocorrências de 'http://localhost:3001 por getApiUrl('
    sed -i.bak "s|'http://localhost:3001/api/|getApiUrl('/api/|g" "$file"
    sed -i.bak "s|\`http://localhost:3001/api/|getApiUrl('/api/|g" "$file"
    
    # Verificar se já tem o import
    if ! grep -q "import.*getApiUrl.*from.*@/lib/api" "$file"; then
      # Adicionar import após a última linha de import
      awk '/^import/ {last=NR} last && NR==last+1 {print "import { getApiUrl } from '\''@/lib/api'\''"; last=0} {print}' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    fi
    
    rm -f "$file.bak"
    echo "✓ $file corrigido"
  fi
done

echo "Concluído!"
