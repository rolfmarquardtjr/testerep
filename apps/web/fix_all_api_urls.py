#!/usr/bin/env python3
"""
Script para substituir todas as URLs hardcoded do localhost
por chamadas à função getApiUrl() do @/lib/api
"""
import os
import re
from pathlib import Path

def should_add_import(content: str) -> bool:
    """Verifica se precisa adicionar o import do getApiUrl"""
    return 'getApiUrl' not in content and "'http://localhost:3001" in content

def add_getapiurl_import(content: str) -> str:
    """Adiciona o import de getApiUrl após os últimos imports"""
    lines = content.split('\n')
    last_import_idx = -1
    
    # Encontrar a última linha de import
    for i, line in enumerate(lines):
        if line.strip().startswith('import '):
            last_import_idx = i
    
    if last_import_idx >= 0:
        # Inserir após o último import
        lines.insert(last_import_idx + 1, "import { getApiUrl } from '@/lib/api'")
    
    return '\n'.join(lines)

def fix_api_urls(content: str) -> str:
    """Substitui URLs hardcoded por getApiUrl()"""
    
    # Padrão 1: URLs simples sem variáveis
    # 'http://localhost:3001/api/auth/login' -> getApiUrl('/api/auth/login')
    content = re.sub(
        r"'http://localhost:3001(/api/[^']+)'",
        r"getApiUrl('\1')",
        content
    )
    
    # Padrão 2: Template strings com variáveis
    # `http://localhost:3001/api/professionals/${id}` -> `${getApiUrl('/api/professionals')}/${id}`
    def replace_template_string(match):
        api_path = match.group(1)
        variable_part = match.group(2)
        return f"`${{getApiUrl('{api_path}')}}/${{variable_part}}`"
    
    content = re.sub(
        r"`http://localhost:3001(/api/[^/\$]+)/\$\{([^}]+)\}([^`]*)`",
        lambda m: f"`${{getApiUrl('{m.group(1)}')}}/{{{m.group(2)}}}{m.group(3)}`",
        content
    )
    
    return content

def process_file(filepath: Path) -> bool:
    """Processa um arquivo e retorna True se foi modificado"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            original_content = f.read()
        
        # Verificar se tem localhost hardcoded
        if "'http://localhost:3001" not in original_content and "`http://localhost:3001" not in original_content:
            return False
        
        content = original_content
        
        # Adicionar import se necessário
        if should_add_import(content):
            content = add_getapiurl_import(content)
        
        # Substituir URLs
        content = fix_api_urls(content)
        
        # Salvar se houve mudanças
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
    except Exception as e:
        print(f"Erro ao processar {filepath}: {e}")
        return False

def main():
    base_dirs = ['./app', './components', './hooks']
    extensions = ['.tsx', '.ts']
    
    modified_count = 0
    
    for base_dir in base_dirs:
        if not os.path.exists(base_dir):
            continue
            
        for root, dirs, files in os.walk(base_dir):
            # Ignorar node_modules
            if 'node_modules' in dirs:
                dirs.remove('node_modules')
            
            for file in files:
                if any(file.endswith(ext) for ext in extensions):
                    filepath = Path(root) / file
                    if process_file(filepath):
                        print(f"✓ {filepath}")
                        modified_count += 1
    
    print(f"\n{modified_count} arquivos modificados!")

if __name__ == '__main__':
    main()
