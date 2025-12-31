#!/usr/bin/env python3
"""Fix import order - move getApiUrl import before multi-line imports"""
import os
import re
from pathlib import Path

def fix_import_order(content: str) -> str:
    """Move 'import { getApiUrl }' to before any 'import {' that spans multiple lines"""
    lines = content.split('\n')
    result = []
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Check if this is 'import {' followed by 'import { getApiUrl }'
        if (i < len(lines) - 1 and 
            line.strip() == 'import {' and 
            'import { getApiUrl }' in lines[i+1]):
            
            # Swap them
            result.append(lines[i+1])  # First add getApiUrl import
            result.append(line)         # Then the 'import {'
            i += 2
        else:
            result.append(line)
            i += 1
    
    return '\n'.join(result)

def process_file(filepath: Path) -> bool:
    """Process a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            original = f.read()
        
        fixed = fix_import_order(original)
        
        if fixed != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed)
            return True
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    base_dirs = ['./app', './components', './hooks']
    extensions = ['.tsx', '.ts']
    
    count = 0
    for base_dir in base_dirs:
        if not os.path.exists(base_dir):
            continue
        
        for root, dirs, files in os.walk(base_dir):
            if 'node_modules' in dirs:
                dirs.remove('node_modules')
            
            for file in files:
                if any(file.endswith(ext) for ext in extensions):
                    filepath = Path(root) / file
                    if process_file(filepath):
                        print(f"✓ {filepath}")
                        count += 1
    
    print(f"\n{count} files fixed!")

if __name__ == '__main__':
    main()
