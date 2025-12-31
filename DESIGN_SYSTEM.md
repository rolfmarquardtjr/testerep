# 🎨 REPFY - SISTEMA DE DESIGN

## Paleta de Cores

### Cores Principais
- **Azul Marinho (Navy)**: `#1A2B4A` - `navy-500`
  - Uso: Títulos principais, texto importante, fundos escuros
  - Variações: navy-50 até navy-900

- **Amarelo Mostarda (Mustard)**: `#D4A017` - `mustard-500`
  - Uso: CTAs, botões primários, destaques, hover states
  - Variações: mustard-50 até mustard-900

### Cores Secundárias
- **Cinza**: Para textos secundários, bordas, backgrounds neutros
- **Branco**: Background principal das páginas
- **Verde**: Sucesso, confirmações (usar com moderação)
- **Vermelho**: Erros, alertas (usar com moderação)

---

## Hierarquia Tipográfica

### Títulos
- **H1**: `text-4xl md:text-5xl lg:text-6xl` - `font-bold` - `text-navy-600`
- **H2**: `text-3xl md:text-4xl` - `font-bold` - `text-navy-600`
- **H3**: `text-xl md:text-2xl` - `font-semibold` - `text-navy-600`
- **H4**: `text-lg` - `font-semibold` - `text-navy-600`

### Textos
- **Body**: `text-base` - `text-gray-600` ou `text-gray-700`
- **Small**: `text-sm` - `text-gray-600`
- **Tiny**: `text-xs` - `text-gray-500`

### Labels
- `text-sm` - `font-medium` - `text-navy-900`

---

## Componentes

### Botões

#### Primário
```tsx
<Button className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
  Texto do Botão
</Button>
```

#### Secundário
```tsx
<Button variant="outline" className="border-navy-300 text-navy-600 hover:bg-navy-50">
  Texto do Botão
</Button>
```

#### Outline Mustard
```tsx
<Button variant="outline" className="border-mustard-500 text-mustard-600 hover:bg-mustard-50">
  Texto do Botão
</Button>
```

### Inputs

```tsx
<Input
  className="border-gray-300 focus:border-mustard-500 focus:ring-mustard-500"
/>
```

### Cards

#### Padrão
```tsx
<div className="p-6 border border-gray-200 rounded-xl hover:border-mustard-500 hover:shadow-lg transition-all">
  {/* Conteúdo */}
</div>
```

#### Com Background
```tsx
<div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
  {/* Conteúdo */}
</div>
```

### Links

```tsx
<Link className="text-navy-600 hover:text-mustard-600 transition-colors">
  Texto do Link
</Link>
```

---

## Ícones

### ⚠️ REGRA IMPORTANTE: NUNCA USE EMOJIS

✅ **CORRETO**: Sempre use ícones do `lucide-react`
```tsx
import { Check, Star, Shield } from 'lucide-react'

<Check className="w-5 h-5 text-mustard-500" />
```

❌ **ERRADO**: Nunca use emojis no código
```tsx
// NÃO FAÇA ISSO!
<span>✅</span>
<div>🎯</div>
```

### Cores para Ícones
- **Navy-500**: Ícones principais, neutros
- **Mustard-500**: Ícones de destaque, hover states
- **Green-600**: Sucesso, checkmarks
- **Red-600**: Erros, avisos

### Tamanhos Comuns
- Pequeno: `w-4 h-4`
- Médio: `w-5 h-5`
- Grande: `w-6 h-6`
- Extra Grande: `w-8 h-8`

---

## Estados Interativos

### Hover
- Botões: `hover:bg-mustard-600`
- Links: `hover:text-mustard-600`
- Cards: `hover:border-mustard-500`
- Ícones: `hover:text-mustard-600`

### Focus
- Inputs: `focus:border-mustard-500 focus:ring-mustard-500`
- Checkboxes: `focus:ring-mustard-500`

### Active/Selected
- Background: `bg-mustard-50`
- Border: `border-mustard-500`
- Check: `bg-mustard-500`

---

## Espaçamento

### Padding
- Pequeno: `p-4`
- Médio: `p-6`
- Grande: `p-8`

### Gap
- Cards Grid: `gap-6` ou `gap-8`
- Flex Items: `gap-2`, `gap-3`, `gap-4`

### Margins
- Seções: `mb-8`, `mb-12`, `mb-16`
- Entre elementos: `mb-2`, `mb-4`, `mb-6`

---

## Bordas e Sombras

### Border Radius
- Pequeno: `rounded-lg`
- Médio: `rounded-xl`
- Grande: `rounded-2xl`
- Círculo: `rounded-full`

### Borders
- Padrão: `border border-gray-200`
- Destaque: `border-2 border-mustard-500`
- Hover: `hover:border-mustard-500`

### Sombras
- Padrão: `shadow-sm`
- Hover: `hover:shadow-lg`

---

## Transições

Sempre adicione transições suaves:
```tsx
className="transition-all duration-200"
className="transition-colors"
```

---

## Backgrounds de Seções

### Alternância
```tsx
// Seção branca
<section className="py-24 px-6 lg:px-8 bg-white">

// Seção cinza clara
<section className="py-24 px-6 lg:px-8 bg-gray-50">

// Seção navy (destaque)
<section className="py-24 px-6 lg:px-8 bg-navy-600 text-white">
```

---

## Responsividade

### Breakpoints
- Mobile: padrão
- Tablet: `md:` (768px)
- Desktop: `lg:` (1024px)

### Grid
```tsx
// 1 col mobile, 2 tablet, 3 desktop
className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"

// 1 col mobile, 2 desktop
className="grid md:grid-cols-2 gap-8"
```

---

## Checklist de Qualidade

Antes de criar qualquer componente, verifique:

- [ ] Usa cores navy e mustard corretamente
- [ ] Ícones são do lucide-react (NUNCA emojis)
- [ ] Tem estados hover/focus definidos
- [ ] É responsivo (mobile-first)
- [ ] Tem transições suaves
- [ ] Segue hierarquia tipográfica
- [ ] Espaçamento consistente
- [ ] Border radius apropriado

---

## Exemplos Práticos

### Card de Serviço
```tsx
<div className="group p-6 border border-gray-200 rounded-xl hover:border-mustard-500 hover:shadow-lg transition-all cursor-pointer">
  <Wrench className="w-12 h-12 text-navy-500 mb-4 group-hover:text-mustard-600 transition-colors" />
  <h3 className="text-lg font-semibold text-navy-600 mb-2">Nome do Serviço</h3>
  <p className="text-gray-600 mb-4">Descrição</p>
  <div className="flex items-center text-sm font-medium text-mustard-600 opacity-0 group-hover:opacity-100 transition-opacity">
    Ver detalhes <ArrowRight className="w-4 h-4 ml-1" />
  </div>
</div>
```

### Botão de Ação Principal
```tsx
<Button size="lg" className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 h-14 text-base font-semibold">
  <Search className="w-5 h-5 mr-2" />
  Buscar Profissionais
</Button>
```

### Input com Label
```tsx
<div className="space-y-2">
  <Label htmlFor="name" className="text-sm font-medium text-navy-900">
    Nome completo
  </Label>
  <Input
    id="name"
    type="text"
    placeholder="João Silva"
    className="h-12 text-base border-gray-300 focus:border-mustard-500 focus:ring-mustard-500"
  />
</div>
```

---

**Última atualização**: 2025-12-30
**Versão**: 1.0
