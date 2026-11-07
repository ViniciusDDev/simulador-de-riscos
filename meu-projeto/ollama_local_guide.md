# 🖥️ Guia de Execução 100% Local com Ollama (Sem Custos e Sem Tokens)

Este guia prático ensina como migrar a arquitetura que você testou no Google AI Studio diretamente para a sua máquina, rodando de forma offline e gratuita.

---

### 1. Baixar e Instalar o Ollama
- Acesse [ollama.com](https://ollama.com) e baixe o instalador para o seu sistema operacional.

---

### 2. Baixar o Modelo Open-Source Recomendado
Abra seu terminal ou PowerShell e execute:

```bash
# Recomendado para computadores com 8GB a 16GB de RAM (focado em código, SQL e raciocínio):
ollama run qwen2.5-coder:7b
```

---

### 3. Script Python de Conexão Rápida (`entrevistador_local.py`)

Instale o conector Python:
```bash
pip install ollama
```

Crie o arquivo `entrevistador_local.py`:

```python
import ollama

SYSTEM_PROMPT = """
Você é o Agente Entrevistador e Avaliador de Riscos Financeiros da vaga Data Scientist I.
Faça perguntas sobre SQL de safras, Regressão Logística, Odds Ratio e métricas KS/AUC-ROC.
Avalie com rigor e critérios de auditoria bancária (BACEN).
"""

def conversar_com_entrevistador(mensagem_usuario):
    resposta = ollama.chat(
        model='qwen2.5-coder:7b',
        messages=[
            {'role': 'system', 'content': SYSTEM_PROMPT},
            {'role': 'user', 'content': mensagem_usuario}
        ]
    )
    return resposta['message']['content']

print("=== SIMULADOR DE ENTREVISTAS DE RISCO (LOCAL & OFFLINE) ===")
while True:
    usuario = input("\nVocê: ")
    if usuario.lower() in ('sair', 'exit'):
        break
    feedback = conversar_com_entrevistador(usuario)
    print(f"\nEntrevistador: {feedback}")
```
